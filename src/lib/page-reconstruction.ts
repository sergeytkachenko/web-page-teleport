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

export async function documentUnpack(toElement: Element, elements: ViewEl[]): Promise<void> {
	const offset = {x: 0, y : 0, w: 0, h: 0};
	let css = '';
	elements.forEach((el, index) => {
		const id = `id-${index}-gen`;
		const domEl = document.createElement('div');
		domEl.setAttribute('id', id);
		// domEl.innerText = el.tag;
		toElement.appendChild(domEl);
		let localCss = ` #${id} {`
		localCss += `position: fixed;`
		localCss += `top: ${el.box.y + offset.y}px;`
		localCss += `left: ${el.box.x + offset.x}px;`
		localCss += `width: ${el.box.width + offset.w}px;`
		localCss += `height: ${el.box.height + offset.h}px;`
		localCss += `z-index: 999999;`
		localCss += `} `
		localCss += `#${id}:hover {background: rgba(237, 113, 202, 0.3);}`
		css += localCss;
	});
	const oldStylesheet = document.querySelector('#fake-styles');
	if (oldStylesheet) {
		document.removeChild(oldStylesheet);
	}
	const style = document.createElement('style');
	style.setAttribute('id', 'fake-styles');
	style.appendChild(document.createTextNode(css));
	document.getElementsByTagName('head')[0].appendChild(style);
}
