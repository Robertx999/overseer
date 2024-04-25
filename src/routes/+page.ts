export async function load({
	fetch,
	url
}: {
	fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>;
	url: URL;
}) {
	// if (!import.meta.env.DEV) {
	let json: Record<string, string> = {};
	const res = await fetch('/getimglist?newest=true');
	await res
		.json()
		.then((result) => {
			json = result;
		})
		.catch((error) => console.error(error));
	return {
		imgDirs: json
	};
	// } else {
	// 	return {
	// 		imgDirs: {
	// 			'94B97EF9EA50': '1713718023947.jpg'
	// 		}
	// 	};
	// }
}
