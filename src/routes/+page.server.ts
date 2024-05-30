import { type ImageViewRecordModel } from '$lib';
import type { PageServerLoad } from './$types';
import type PocketBase from 'pocketbase';

export const load: PageServerLoad = async ({ locals }) => {
	return {
		images: await (locals as { pb: PocketBase }).pb
			.collection('images_view')
			.getFullList({
				sort: '-unix_timestamp'
			})
			.then((res) => {
				return res as ImageViewRecordModel[];
			})
			.catch((error) => {
				console.log(error);
				return [] as ImageViewRecordModel[];
			})
	};
};
