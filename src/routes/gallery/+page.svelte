<script lang="ts">
	import { onMount } from 'svelte';
	import { type Writable, writable } from 'svelte/store';

	import Card from '$lib/Card.svelte';
	import GalleryFilter from '$lib/GalleryFilter.svelte';

	import { mobileFilterOpen, camAliases } from '$lib';

	export let data;

	let camChecked = writable('');
	let selectedDate: Writable<string> = writable();
	let filter = writable({ camChecked: $camChecked, selectedDate: $selectedDate });

	let filtered: Writable<{ mac: string; timestamp: string }[]> = writable([]);

	onMount(() => {
		camChecked.subscribe((cam) => {
			filter.update((value) => Object({ camChecked: cam, selectedDate: value.selectedDate }));
		});
		selectedDate.subscribe((date) => {
			filter.update((value) => Object({ camChecked: value.camChecked, selectedDate: date }));
		});
		if (document.cookie.includes('cam_checked')) {
			camChecked.set(
				document.cookie
					.split('; ')
					.filter((value) => value.split('=')[0] == 'cam_checked')[0]
					.split('=')[1]
			);
		}
		if (document.cookie.includes('selected_date')) {
			selectedDate.set(
				document.cookie
					.split('; ')
					.filter((value) => value.split('=')[0] == 'selected_date')[0]
					.split('=')[1]
			);
		}
		filter.subscribe((filter) => {
			document.cookie = `cam_checked=${filter.camChecked}`;
			document.cookie = `selected_date=${filter.selectedDate}`;
			let a: { mac: string; timestamp: string }[] = [];
			Object.entries(data.imgDirs).forEach(([mac, imgs]) => {
				imgs.forEach((img) => {
					a.push({ mac: mac, timestamp: img.split('.')[0] });
				});
			});
			filtered.set(
				a.filter(
					(value) =>
						value.mac == filter.camChecked &&
						new Date(parseInt(value.timestamp)).toDateString() ==
							new Date(filter.selectedDate).toDateString()
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
		<GalleryFilter cams={data.camList} bind:selectedDate bind:camChecked />
	</div>
{/if}

<div class="w-full flex-col overflow-y-auto">
	<div class="md:round bg-[color:var(--md-sys-color-surface-container)]">
		<div class="flex flex-col p-6 text-xl">
			<div>
				{$camAliases.get($camChecked) ? $camAliases.get($camChecked) : $camChecked}
			</div>
			{#if $selectedDate}
				<div class="text-sm text-[color:var(--md-sys-color-outline)]">{$selectedDate}</div>
			{/if}
		</div>
	</div>
	<div
		class="flex min-w-full basis-1/4 flex-row flex-wrap content-start items-start justify-start gap-6 p-6"
	>
		{#if filtered}
			{#each $filtered as cam}
				<Card
					title={new Date(parseInt(cam.timestamp)).toLocaleTimeString()}
					src={cam.mac + '/' + cam.timestamp + '.jpg'}
				></Card>
			{/each}
		{/if}
		<!-- {#if data.imgDirs}
			{#each Object.entries(data.imgDirs) as [mac, imgs]}
				{#each imgs as img}
					<Card
						title={new Date(parseInt(img.split('.')[0])).toLocaleTimeString()}
						src={mac + '/' + img}
					></Card>
				{/each}
			{/each}
		{/if} -->
	</div>
</div>
