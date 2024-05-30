export async function load({
	fetch,
	url
}: {
	fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>;
	url: URL;
}) {
	// if (!import.meta.env.DEV) {
	let imgJson: Record<string, string[]> = {};
	let camJson: string[] = [];

	// const imgRes = await fetch('/getimglist');
	// await imgRes
	// 	.json()
	// 	.then((result) => {
	// 		imgJson = result;
	// 	})
	// 	.catch(() => console.error('fetch failed'));

	// const camRes = await fetch('/getcamlist');
	// await camRes
	// 	.json()
	// 	.then((result) => {
	// 		camJson = result;
	// 	})
	// 	.catch(() => console.error('fetch failed'));

	return {
		imgDirs: imgJson || {},
		camList: camJson || []
	};
	// } else {
	// 	return {
	// 		imgDirs: {
	// 			'94B97EF9EA50': [
	// 				'1713718023947.jpg',
	// 				'1713718028958.jpg',
	// 				'1713718032990.jpg',
	// 				'1713718038018.jpg',
	// 				'1713718043037.jpg',
	// 				'1713718048067.jpg',
	// 				'1713718053156.jpg',
	// 				'1713718058161.jpg',
	// 				'1713718063185.jpg',
	// 				'1713718068227.jpg',
	// 				'1713718073235.jpg',
	// 				'1713718078258.jpg',
	// 				'1713718083305.jpg',
	// 				'1713718088335.jpg',
	// 				'1713718112248.jpg',
	// 				'1713718117271.jpg',
	// 				'1713718361186.jpg',
	// 				'1713718366216.jpg',
	// 				'1713718371243.jpg',
	// 				'1713718376269.jpg',
	// 				'1713718380308.jpg',
	// 				'1713718385333.jpg',
	// 				'1713718445409.jpg',
	// 				'1713718450434.jpg',
	// 				'1713718455471.jpg',
	// 				'1713718459514.jpg',
	// 				'1713718464528.jpg',
	// 				'1713718469555.jpg',
	// 				'1713718474581.jpg',
	// 				'1713718501638.jpg',
	// 				'1713718506666.jpg',
	// 				'1713718510687.jpg',
	// 				'1713718515724.jpg',
	// 				'1713718520752.jpg',
	// 				'1713718525778.jpg',
	// 				'1713718554866.jpg',
	// 				'1713718719006.jpg',
	// 				'1713718724033.jpg',
	// 				'1713718729058.jpg',
	// 				'1713718734086.jpg',
	// 				'1713718760138.jpg',
	// 				'1713718765179.jpg',
	// 				'1713718770198.jpg',
	// 				'1713718774225.jpg',
	// 				'1713718779254.jpg',
	// 				'1713718784293.jpg',
	// 				'1713718789315.jpg',
	// 				'1713718794343.jpg',
	// 				'1713718799366.jpg',
	// 				'1713718804402.jpg',
	// 				'1713718809428.jpg',
	// 				'1713718814509.jpg',
	// 				'1713718819535.jpg',
	// 				'1713718824564.jpg',
	// 				'1713718829611.jpg',
	// 				'1713718834643.jpg',
	// 				'1713718839670.jpg',
	// 				'1713718844693.jpg',
	// 				'1713718849719.jpg',
	// 				'1713718854741.jpg',
	// 				'1713718859764.jpg',
	// 				'1713718864788.jpg',
	// 				'1713718985895.jpg',
	// 				'1713718990915.jpg'
	// 			]
	// 		},
	// 		camList: ['94B97EF9EA50']
	// 	};
	// }
}
