import { type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, fetch }) => {
	const res = await fetch(
		new URL(
			`/api/files/${params.collection}/${params.id}/${params.image}`,
			import.meta.env.WEB_POCKETBASE_URL
		)
	).then((res) => {
		return res.blob();
	});

	return new Response(res);
};
