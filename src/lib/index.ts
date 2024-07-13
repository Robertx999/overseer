// place files you want to import through the `$lib` alias in this folder.

export const turn = (node: Element, { delay = 0, duration = 100 }) => {
	const o = +getComputedStyle(node).opacity;

	return {
		delay,
		duration,
		css: (t: number, u: number) => `transform: rotateY(${u * 90}deg); opacity: ${t * o}`
	};
};
