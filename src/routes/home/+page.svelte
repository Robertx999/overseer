<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { AspectRatio } from '$lib/components/ui/aspect-ratio/index.js';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import CameraCard from '$lib/components/CameraCard.svelte';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { linear } from 'svelte/easing';
	let scrollable: HTMLDivElement,
		scroll = tweened(0, { duration: 100, easing: linear });
	onMount(() => {
		scroll.subscribe((value) => {
			scrollable.scrollLeft = value;
		});
	});
</script>

<div
	class="flex w-full grow items-center overflow-x-scroll"
	bind:this={scrollable}
	on:wheel={(event) => {
		scroll.update((value) =>
			Math.max(
				Math.min(value + event.deltaY * 1.2, scrollable.scrollWidth - scrollable.clientWidth),
				0
			)
		);
	}}
>
	<div class="flex h-min min-w-fit flex-row flex-nowrap gap-8 before:p-px after:p-px">
		<CameraCard />
		<CameraCard />
		<CameraCard />
		<CameraCard skeleton={true} />
		<CameraCard skeleton={true} />
	</div>
</div>

<style lang="postcss">
	::-webkit-scrollbar {
		@apply hidden;
	}
</style>
