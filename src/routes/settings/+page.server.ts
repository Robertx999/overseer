import type { CamerasRecordModel } from '$lib';
import type { PageServerLoad } from '../$types';
import type PocketBase from 'pocketbase';

export const load: PageServerLoad = async ({ locals }) => {
	// let json: { status: string; paths: [] };
	// if (!import.meta.env.DEV) {
	// let json: string[] = [];

	// const res = await fetch('/getcamlist');
	// await res
	// 	.json()
	// 	.then((result) => {
	// 		json = result;
	// 	})
	// 	.catch(() => console.error('fetch failed'));

	return {
		cameras:
			((await (locals as { pb: PocketBase }).pb
				.collection('cameras')
				.getFullList()) as CamerasRecordModel[]) || []
	};
	// } else {
	// 	return {
	// 		cams: ['94B97EF9EA50']
	// 	};
	// }
};
