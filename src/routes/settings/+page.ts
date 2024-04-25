export async function load({
	fetch,
	url
}: {
	fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>;
	url: URL;
}) {
	// let json: { status: string; paths: [] };
	// if (!import.meta.env.DEV) {
	const res = await fetch('/getcamlist');
	let json: string[] = [];
	await res
		.json()
		.then((result) => {
			json = result;
		})
		.catch((error) => console.error(error));

	return {
		cams: json || []
	};
	// } else {
	// 	return {
	// 		cams: ['94B97EF9EA50']
	// 	};
	// }
}
