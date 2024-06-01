import type { PageLoad } from '../$types';

export const load: PageLoad = async ({ fetch }) => {
	const { items } = await (await fetch(`/api/collections/cameras/records?perPage=500`))
		.json()
		.then((res) => res);
	return {
		cameras: items
	};
};
