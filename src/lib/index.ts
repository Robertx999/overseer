// place files you want to import through the `$lib` alias in this folder.

import { writable, type Writable } from 'svelte/store';
import type PocketBase from 'pocketbase';
import type { ListResult, RecordModel, RecordSubscription } from 'pocketbase';

export let darkMode: Writable<boolean> = writable(false);
export let mobileFilterOpen: Writable<boolean> = writable(false);
export let camAliases: Writable<Map<string, string>> = writable(new Map());

type HexDigit =
	`${'0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F'}`;
type TwoHexDigits = `${HexDigit}${HexDigit}`;
type Mac =
	`${TwoHexDigits}:${TwoHexDigits}:${TwoHexDigits}:${TwoHexDigits}:${TwoHexDigits}:${TwoHexDigits}`;

export interface ImageViewRecordModel extends RecordModel {
	camera_mac: Mac;
	unix_timestamp: number;
	image: any;
}

export interface CamerasRecordModel extends RecordModel {
	mac: Mac;
	alias: undefined | string;
	online: boolean;
}
