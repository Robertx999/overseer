export const ssr = false;

export async function load({ url }: { url: URL }) {
	return {
		url: url.pathname
	};
}
