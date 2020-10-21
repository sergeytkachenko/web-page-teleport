interface ElBox {
	x: number;
	y: number;
	width: number;
	height: number;
}
interface ViewEl {
	tag: string;
	box: ElBox;
	zIndex: number;
	fakeId: string;
}
interface Rect {
	x: number;
	y: number;
	w: number;
	h: number;
	z: number;
}
interface DocumentInfo {
	toElement: HTMLElement;
	viewElements: ViewEl[];
	screenshotSrc: string;
	width: number;
	height: number;
}
export interface TeleportCanvasEvent {
	fakeId?: string;
	originEvent: MouseEvent;
}
type Handler = (e: TeleportCanvasEvent) => void;
export class CanvasEvents {
	public readonly leftClickFns: Handler[] = [];
	public readonly rightClickFns: Handler[] = [];

	onLeftClick(fn: Handler): CanvasEvents {
		this.leftClickFns.push(fn);
		return this;
	}

	onRightClick(fn: Handler): CanvasEvents {
		this.rightClickFns.push(fn);
		return this;
	}
}

function draw(ctx: any, screenshot: any, viewElements: ViewEl[]): Rect[] {
	ctx.clearRect(0, 0, 1920, 1080);
	ctx.drawImage(screenshot, 0, 0, 1920, 1080);
	ctx.fillStyle = "rgba(255, 0, 255, 0.01)";
	const offset = {x: 0, y : 0, w: 0, h: 0};
	const rects = viewElements.map((x, i) => {
		const top = x.box.y + offset.y;
		const left = x.box.x + offset.x;
		const width = x.box.width + offset.w;
		const height = x.box.height + offset.h;
		return  {x: left, y: top, w: width, h: height, z: i}
	}).sort(x => x.z).reverse();
	rects.forEach((x) => {
		ctx.fillRect(x.x, x.y, x.w, x.h);
	});
	return rects;
}
function findRect(rects: Rect[], ctx: any, e: MouseEvent): Rect | undefined {
	return rects.find(x => {
		ctx.beginPath();
		ctx.rect(x.x, x.y, x.w, x.h);
		return ctx.isPointInPath(e.offsetX, e.offsetY);
	});
}
function findViewElement(rects: Rect[], ctx: any, e: MouseEvent, viewElements: ViewEl[]): ViewEl | undefined {
	const f = findRect(rects, ctx, e) || {} as any;
	return viewElements.find((x: ViewEl) => {
		const box = x.box;
		return box.x === f.x
			&& box.y === f.y
			&& box.width === f.w
			&& box.height === f.h;
	});
}

export function documentPack(): ViewEl[] {
	function makeId(length= 14) {
		let result = '';
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result.toLowerCase();
	}
	const elements: Element[] = Array
		.from(document.querySelectorAll('body *'))
		.filter(x => x.tagName.toLowerCase() !== 'script')
		.filter(x => x.tagName.toLowerCase() !== 'code')
		.filter(x => x.tagName.toLowerCase() !== 'noscript');
	return elements.map(el => {
		const box = el.getBoundingClientRect();
		const styles = getComputedStyle(el);
		const fakeId = makeId();
		el.setAttribute('fake-id',fakeId);
		return {
			tag: el.tagName.toLowerCase(),
			box: {
				x: box.x,
				y: box.y,
				width: box.width,
				height: box.height,
			},
			zIndex: isNaN(parseInt(styles.zIndex)) ? 0 : parseInt(styles.zIndex),
			fakeId: fakeId,
		} as ViewEl;
	}).filter(x => x.box.height > 0 && x.box.width > 0);
}
export async function documentUnpack(config: DocumentInfo): Promise<CanvasEvents> {
	const canvasEvents = new CanvasEvents();
	const canvas = document.createElement('canvas');
	canvas.width = config.width;
	canvas.height = config.height;
	config.toElement.innerHTML = '';
	config.toElement.appendChild(canvas);
	const ctx = canvas.getContext("2d");
	if (!ctx) {
		return canvasEvents;
	}
	const screenshot = new Image();
	screenshot.onload = function () {
		draw(ctx, screenshot, config.viewElements);
		let rects: Rect[];
		canvas.onmousemove = function(e) {
			rects = draw(ctx, screenshot, config.viewElements);
			const found = findRect(rects, ctx, e);
			if (!found) {
				return;
			}
			ctx.beginPath();
			ctx.rect(found.x, found.y, found.w, found.h);
			ctx.fillStyle = "rgba(0, 255, 255, 0.2)";
			ctx.fill();
		};
		canvas.addEventListener('click', (e: MouseEvent) => {
			const foundViewElement = findViewElement(rects, ctx, e, config.viewElements) || {} as any;
			canvasEvents.leftClickFns.forEach(fn => fn({
				originEvent: e,
				fakeId: foundViewElement.fakeId,
			}));
		});
		canvas.addEventListener('contextmenu', (e: MouseEvent) => {
			const foundViewElement = findViewElement(rects, ctx, e, config.viewElements) || {} as any;
			canvasEvents.rightClickFns.forEach(fn => fn({
				originEvent: e,
				fakeId: foundViewElement.fakeId,
			}));
		});
	};
	screenshot.src = config.screenshotSrc;
	return canvasEvents;
}
