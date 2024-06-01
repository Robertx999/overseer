import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const { items } = await (
		await fetch(`/api/collections/newest_images/records?sort=-unix_timestamp&perPage=500`)
	)
		.json()
		.then((res) => res);
	return {
		images: items
	};
};
