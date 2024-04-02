export const actions = {
	take: async ({ cookies, request }) => {
		const data = await request.formData();
		cookies.set('date', data.get('date'), { path: '/' });

		return { success: true };
	},
};
