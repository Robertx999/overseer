import { error, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, locals, params, fetch }) => {
	const collection = params.collection;
	if (!collection) return error(400, { message: 'collection undefined' });

	const res = await fetch(new URL(url.pathname + url.search, process.env.POCKETBASE_URL));

	return res;
};
