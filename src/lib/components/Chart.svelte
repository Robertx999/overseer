<script lang="ts">
	import { derived, writable } from 'svelte/store';
	import AspectRatio from './ui/aspect-ratio/aspect-ratio.svelte';
	import { Separator } from './ui/separator';
	import { onMount } from 'svelte';

	export let data: number[];

	const offset = 50;

	let mousePosX = writable(0),
		mousePosY = writable(0),
		tooltipPosX = derived(mousePosX, () => {}, 0),
		tooltipPosY = derived(mousePosY, () => {}, 0),
		tooltip: HTMLDivElement,
		wrapper: HTMLDivElement,
		visibility = 'hidden';
	$: max = Math.max(...data);

	onMount(() => {
		tooltipPosX = derived(
			mousePosX,
			($mousePosX, set) => {
				if (wrapper.offsetLeft != undefined) {
					if ($mousePosX < wrapper.offsetLeft) {
						set($mousePosX + offset);
					} else {
						set($mousePosX - offset);
					}
				} else {
					set(0);
				}
			},
			0
		);
		tooltipPosY = derived(
			mousePosY,
			($mousePosY, set) => {
				if (wrapper.offsetTop != undefined) {
					if ($mousePosY < wrapper.offsetTop) {
						set($mousePosY + offset);
					} else {
						set($mousePosY - offset);
					}
				} else {
					set(0);
				}
			},
			0
		);
	});
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	on:mousemove={({ clientX, clientY }) => {
		mousePosX.set(clientX - wrapper.offsetLeft);
		mousePosY.set(clientY - wrapper.offsetTop);
	}}
	on:mouseenter={() => {
		visibility = 'visible';
	}}
	on:mouseleave={() => {
		visibility = 'hidden';
	}}
	bind:this={wrapper}
>
	<AspectRatio ratio={3 / 2} class="relative grid">
		<div
			bind:this={tooltip}
			class="absolute h-12 w-24 bg-white"
			style:visibility
			style:left={$tooltipPosX + 'px'}
			style:top={$tooltipPosY + 'px'}
		></div>
		<div class="col-start-1 row-start-1 flex flex-col flex-nowrap justify-between">
			<Separator class="bg-[hsl(var(--border)/.5)]" />
			<Separator class="bg-[hsl(var(--border)/.5)]" />
			<Separator class="bg-[hsl(var(--border)/.5)]" />
			<Separator class="bg-[hsl(var(--border)/.5)]" />
			<Separator class="bg-[hsl(var(--border)/.5)]" />
			<Separator class="bg-[hsl(var(--border)/.5)]" />
		</div>
		<div class="col-start-1 row-start-1 flex h-full flex-row-reverse flex-nowrap items-end">
			{#each data as value}
				<div class="flex h-full w-full items-end justify-center px-1 hover:bg-[hsl(var(--muted))]">
					<div
						class="w-full rounded-[3px] bg-blue-700 transition-[height]"
						style:height="{max > 0 ? (value / max) * 90 : 0}%"
					></div>
				</div>
			{/each}
		</div>
	</AspectRatio>
</div>
