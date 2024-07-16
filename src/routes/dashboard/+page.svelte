<script lang="ts">
	import CameraCard from '$lib/components/CameraCard.svelte';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';

	let scrollable: HTMLDivElement,
		scroll = spring(0),
		wrapper: HTMLDivElement,
		cardPositions: number[],
		snapTimer: number,
		pageWidth = writable(0);

	const getCardPositions = () =>
		[...wrapper.children].map(
			(child) =>
				(child as HTMLDivElement).offsetLeft - (wrapper.children[0] as HTMLDivElement).offsetLeft
		);

	onMount(() => {
		cardPositions = getCardPositions();
		scroll.subscribe((value) => {
			scrollable.scrollLeft = value;
		});
	});
</script>

<svelte:window
	on:resize={() => {
		cardPositions = getCardPositions();
		scroll.subscribe((value) => {
			scrollable.scrollLeft = value;
		});
	}}
	bind:innerWidth={$pageWidth}
/>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="flex w-full grow items-center overflow-x-scroll max-md:scroll-smooth"
	bind:this={scrollable}
	on:scroll={() => {
		if (snapTimer != undefined) {
			clearTimeout(snapTimer);
		}
		snapTimer = setTimeout(() => {
			let temp = cardPositions.map((pos) => Math.abs(pos - scrollable.scrollLeft));
			if ($pageWidth > 768) {
				scroll.set(cardPositions[temp.indexOf(Math.min(...temp))]);
			} else {
				scrollable.scrollLeft = cardPositions[temp.indexOf(Math.min(...temp))];
			}
		}, 300);
	}}
	on:wheel={(event) => {
		if ($pageWidth > 768) {
			scroll.update(
				(value) =>
					Math.max(
						Math.min(value + event.deltaY * 1.2, scrollable.scrollWidth - scrollable.clientWidth),
						0
					),
				{ soft: 0 }
			);
		}
	}}
>
	<div
		class="-mx-[2px] flex h-min min-w-fit flex-row flex-nowrap gap-7 before:p-px after:p-px"
		bind:this={wrapper}
	>
		<CameraCard cameraId="9eb1eb91313r" />
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
