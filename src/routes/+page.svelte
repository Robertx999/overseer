<script lang="ts">
	import Card from '$lib/Card.svelte';
	import { camAliases, type ImageViewRecordModel } from '$lib';
	import { onDestroy, onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import PocketBase from 'pocketbase';
	// import { source } from 'sveltekit-sse';

	export let data;

	let images: Writable<ImageViewRecordModel[]> = writable(data.images);

	const pb_url = 'http://10.1.1.38:9000';
	const pb = new PocketBase(pb_url);

	// const database_event = source('/pb-event').select('message');

	onMount(() => {
		pb.collection('images').subscribe('*', async () => {
			let list: ImageViewRecordModel[] = await pb
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
				});
			images.update(() => list);
		});
		// images.subscribe((value) => {
		// 	console.log(value);
		// });
		// database_event.subscribe((value) => {
		// 	let parsed_value;
		// 	try {
		// 		parsed_value = JSON.parse(value);
		// 	} catch {
		// 		return;
		// 	}
		// 	images.update(() => parsed_value);
		// 	console.log($images);
		// });
	});

	onDestroy(() => {
		pb.collection('images').unsubscribe();
	});
</script>

<div
	class="flex h-fit min-w-full basis-1/4 flex-row flex-wrap content-stretch items-stretch justify-stretch gap-6 p-6"
>
	{#if $images}
		{#each $images as { id, camera_mac, unix_timestamp, image }}
			<Card
				title={$camAliases.has(camera_mac) ? $camAliases.get(camera_mac) : camera_mac}
				src={pb_url + '/api/files/images/' + id + '/' + image}
			>
				{new Date(unix_timestamp).toLocaleString()}
			</Card>
		{/each}
	{/if}
</div>
