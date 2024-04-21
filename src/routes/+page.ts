export async function load({
	fetch
}: {
	fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>;
}) {
	let json: {};
	// if (!import.meta.env.DEV) {
	const res = await fetch('/getimglist');
	json = {};
	await res
		.json()
		.then((result) => {
			json = result;
		})
		.catch((error) => console.error(error));

	return {
		paths: json
	};
	// } else {
	// 	return {
	// 		paths: ['uploads/1713031695-cam4', 'uploads/1713084324-cam3']
	// 	};
	// }
}
