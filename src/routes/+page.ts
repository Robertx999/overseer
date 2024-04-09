export async function load({
	fetch
}: {
	fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>;
}) {
	const res = await fetch('/getimglist.php');
	let json: { status: string; paths?: [] } = { status: '' };
	await res
		.json()
		.then((result) => {
			json = result;
		})
		.catch((error) => console.error(error));

	return {
		paths: json.paths
	};
}
