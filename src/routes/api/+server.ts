import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, locals }) => {
	const collection = url.searchParams.get('collection');
	return new Response();
};
