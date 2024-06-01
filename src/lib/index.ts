// place files you want to import through the `$lib` alias in this folder.

import { writable, type Writable } from 'svelte/store';
import type PocketBase from 'pocketbase';
import type { ListResult, RecordModel, RecordSubscription } from 'pocketbase';

export let darkMode: Writable<boolean> = writable(false);
export let mobileFilterOpen: Writable<boolean> = writable(false);
export let camAliases: Writable<Map<string, string>> = writable(new Map());

export interface ImageViewRecordModel extends RecordModel {
	camera_mac: string;
	unix_timestamp: number;
	image: any;
}

export interface CamerasRecordModel extends RecordModel {
	mac: string;
	online: boolean;
}
