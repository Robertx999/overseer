// place files you want to import through the `$lib` alias in this folder.

import { onMount } from 'svelte';
import { writable, type Writable } from 'svelte/store';

export let darkMode: Writable<boolean> = writable(false);
export let mobileFilterOpen: Writable<boolean> = writable(false);
export let camAliases: Writable<Map<string, string>> = writable(new Map());
