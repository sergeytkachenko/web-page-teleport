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
}

export function documentPack(): ViewEl[] {
	const elements: Element[] = Array
		.from(document.querySelectorAll('body *'))
		.filter(x => x.tagName.toLowerCase() !== 'script')
		.filter(x => x.tagName.toLowerCase() !== 'code')
		.filter(x => x.tagName.toLowerCase() !== 'noscript');
	return elements.map(el => {
		const box = el.getBoundingClientRect();
		const styles = getComputedStyle(el);
		return {
			tag: el.tagName.toLowerCase(),
			box: {
				x: box.x,
				y: box.y,
				width: box.width,
				height: box.height,
			},
			zIndex: isNaN(parseInt(styles.zIndex)) ? 0 : parseInt(styles.zIndex),
		} as ViewEl;
	}).filter(x => x.box.height > 0 && x.box.width > 0);
}

interface DocumentInfo {
	toElement: HTMLElement;
	viewElements: ViewEl[];
	screenshotSrc: string;
	width: number;
	height: number;
}

export async function documentUnpack(config: DocumentInfo): Promise<void> {
	const canvas = document.createElement('canvas');
	canvas.width = config.width;
	canvas.height = config.height;
	config.toElement.innerHTML = '';
	config.toElement.appendChild(canvas);
	const ctx = canvas.getContext("2d");
	if (!ctx) {
		return;
	}
	function draw(ctx: any, screenshot: any) {
		ctx.clearRect(0, 0, 1920, 1080);
		ctx.drawImage(screenshot, 0, 0, 1920, 1080);
		ctx.fillStyle = "rgba(255, 0, 255, 0.01)";
		const offset = {x: 0, y : 0, w: 0, h: 0};
		const rects = config.viewElements.map((x, i) => {
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
	const screenshot = new Image();
	screenshot.onload = function () {
		draw(ctx, screenshot);
		canvas.onmousemove = function(e) {
			const rects = draw(ctx, screenshot);
			const find = rects.find(x => {
				ctx.beginPath();
				ctx.rect(x.x, x.y, x.w, x.h);
				return ctx.isPointInPath(e.offsetX, e.offsetY)
			});
			if (!find) {
				return;
			}
			ctx.beginPath();
			ctx.rect(find.x, find.y, find.w, find.h);
			ctx.fillStyle = "rgba(0, 255, 255, 0.2)";
			ctx.fill();
		};
	};
	screenshot.src = config.screenshotSrc;
}
