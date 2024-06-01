<script lang="ts">
	import Card from '$lib/Card.svelte';
	import { camAliases, type ImageViewRecordModel } from '$lib';
	import { writable, type Writable } from 'svelte/store';

	export let data;

	let images: Writable<ImageViewRecordModel[]> = writable(data.images);
</script>

<div
	class="flex h-fit min-w-full basis-1/4 flex-row flex-wrap content-stretch items-stretch justify-stretch gap-6 p-6"
>
	{#if $images && typeof $images[Symbol.iterator] === 'function'}
		{#each $images as { id, camera_mac, unix_timestamp, image } (id)}
			<Card
				title={$camAliases.has(camera_mac) ? $camAliases.get(camera_mac) : camera_mac}
				{id}
				{image}
				collection="newest_images"
			>
				{new Date(unix_timestamp).toLocaleString()}
			</Card>
		{/each}
	{/if}
</div>
