<script lang="ts">
	import { onMount } from 'svelte';
	import { type Writable, writable } from 'svelte/store';

	import Card from '$lib/Card.svelte';
	import GalleryFilter from '$lib/GalleryFilter.svelte';

	import { mobileFilterOpen, camAliases } from '$lib';

	export let data;

	let camChecked = writable(0);
	let selectedDate: Writable<string> = writable();
	let filter = writable({ camChecked: $camChecked, selectedDate: $selectedDate });

	function dataFromPathName(path: string) {
		return {
			getDate: () => {
				return new Date(parseInt(path.split('/').at(-1) as string) * 1000);
			},
			getTimestamp: () => {
				return parseInt(path.split('/').at(-1) as string) * 1000;
			},
			getCamNum: () => {
				return parseInt(path.slice(path.indexOf('-cam') + 4));
			}
		};
	}

	let parsed_paths = data.paths
		.map((el) => ({
			cam_num: dataFromPathName(el).getCamNum(),
			timestamp: dataFromPathName(el).getTimestamp(),
			date: dataFromPathName(el).getDate(),
			path: el
		}))
		.sort((a, b) => a.timestamp - b.timestamp);

	let cam_nums: number[] = [];

	parsed_paths.forEach((el) => {
		if (!cam_nums.includes(el.cam_num)) {
			cam_nums.push(el.cam_num);
		}
	});

	let query_response: Writable<{ cam_num: number; timestamp: number; date: Date; path: string }[]> =
		writable([]);

	onMount(() => {
		camChecked.subscribe((cam) => {
			filter.update((value) => Object({ camChecked: cam, selectedDate: value.selectedDate }));
		});
		selectedDate.subscribe((date) => {
			filter.update((value) => Object({ camChecked: value.camChecked, selectedDate: date }));
		});
		if (document.cookie.includes('cam_checked')) {
			camChecked.set(
				parseInt(
					document.cookie
						.split('; ')
						.filter((el) => el.split('=')[0] == 'cam_checked')[0]
						.split('=')[1]
				)
			);
		}
		if (document.cookie.includes('selected_date')) {
			selectedDate.set(
				document.cookie
					.split('; ')
					.filter((el) => el.split('=')[0] == 'selected_date')[0]
					.split('=')[1]
			);
		}
		filter.subscribe((filter) => {
			document.cookie = `cam_checked=${filter.camChecked}`;
			document.cookie = `selected_date=${filter.selectedDate}`;
			query_response.set(
				parsed_paths.filter(
					(el) =>
						el.cam_num == filter.camChecked &&
						el.date.toDateString() == new Date(filter.selectedDate).toDateString()
				)
			);
		});
	});

	let innerWidth: number;
</script>

<svelte:window bind:innerWidth />

{#if $mobileFilterOpen || innerWidth >= 768}
	<div
		class="z-30 max-md:absolute max-md:left-1/2 max-md:top-1/2 max-md:-translate-x-1/2 max-md:-translate-y-1/2"
	>
		<GalleryFilter camNums={cam_nums} bind:selectedDate bind:camChecked />
	</div>
{/if}

<div class="w-full flex-col overflow-y-auto">
	<div class="md:round bg-[color:var(--md-sys-color-surface-container)]">
		<div class="flex flex-col p-6 text-xl">
			<div>
				{$camAliases.get($camChecked) ? $camAliases.get($camChecked) : 'Camera ' + $camChecked}
			</div>
			{#if $selectedDate}
				<div class="text-sm text-[color:var(--md-sys-color-outline)]">{$selectedDate}</div>
			{/if}
		</div>
	</div>
	<div
		class="flex min-w-full basis-1/4 flex-row flex-wrap content-start items-start justify-start gap-6 p-6"
	>
		{#if query_response}
			{#each $query_response as cam}
				<Card title={cam.date.toLocaleTimeString()} src={cam.path}></Card>
			{/each}
		{/if}
	</div>
</div>
