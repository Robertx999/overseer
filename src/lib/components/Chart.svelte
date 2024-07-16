<script lang="ts">
	import { derived, writable, type Writable } from 'svelte/store';
	import AspectRatio from './ui/aspect-ratio/aspect-ratio.svelte';
	import { Separator } from './ui/separator';
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';

	export let data: { value: number; date: Date }[];

	const offset = 10;

	let mousePos = writable({ x: 0, y: 0 }),
		tooltipPos = spring({ x: 0, y: 0 }),
		tooltip: HTMLDivElement,
		tooltipValue: Writable<{ value: number; date: Date }> = writable({
			value: 0,
			date: new Date(0)
		}),
		wrapper: HTMLDivElement,
		visibility = 'hidden';
	$: max = Math.max(...data.map((el) => el.value));

	onMount(() => {
		mousePos.subscribe((value) => {
			tooltipPos.set(
				{
					x:
						value.x < wrapper.offsetWidth - (tooltip.offsetWidth + offset)
							? value.x + offset
							: value.x - (tooltip.offsetWidth + offset),
					y:
						value.y < wrapper.offsetHeight - (tooltip.offsetHeight + offset)
							? value.y + offset
							: value.y - (tooltip.offsetHeight + offset)
				},
				{ soft: 0 }
			);
		});
	});
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	on:mousemove={({ clientX, clientY }) => {
		mousePos.set({ x: clientX - wrapper.offsetLeft, y: clientY - wrapper.offsetTop });
	}}
	on:mouseenter={() => {
		visibility = 'visible';
	}}
	on:mouseleave={() => {
		visibility = 'hidden';
	}}
	bind:this={wrapper}
>
	<AspectRatio ratio={3 / 2} class="relative grid {$$restProps.class}">
		<div
			bind:this={tooltip}
			class="pointer-events-none absolute flex flex-col flex-nowrap rounded-md border-[1px] border-[hsl(var(--border))] bg-[hsl(var(--card))] px-2 py-1 text-sm"
			style:visibility
			style:left={$tooltipPos.x + 'px'}
			style:top={$tooltipPos.y + 'px'}
		>
			<div>
				{$tooltipValue.date.toLocaleDateString(navigator.languages[0], {
					day: '2-digit',
					month: 'short',
					year: 'numeric'
				})}
			</div>
			<div class="flex flex-row flex-nowrap items-center gap-6">
				<div class="flex flex-row flex-nowrap items-center gap-2">
					<div class="h-4 w-1 rounded-[1px] bg-blue-700"></div>
					<div class="text-[hsl(var(--muted-foreground))]">Volume</div>
				</div>
				<div>{Number.parseFloat($tooltipValue.value.toFixed(3)).toString()}</div>
			</div>
		</div>
		<div class="col-start-1 row-start-1 flex flex-col flex-nowrap justify-between">
			<Separator class="bg-[hsl(var(--border)/.5)]" />
			<Separator class="bg-[hsl(var(--border)/.5)]" />
			<Separator class="bg-[hsl(var(--border)/.5)]" />
			<Separator class="bg-[hsl(var(--border)/.5)]" />
			<Separator class="bg-[hsl(var(--border)/.5)]" />
			<Separator class="bg-[hsl(var(--border)/.5)]" />
		</div>
		<div class="col-start-1 row-start-1 flex h-full flex-row-reverse flex-nowrap items-end">
			{#each data as el}
				<!-- svelte-ignore a11y-mouse-events-have-key-events -->
				<div
					on:mouseover={() => {
						tooltipValue.set(el);
					}}
					class="flex h-full w-full items-end justify-center px-1 hover:bg-[hsl(var(--muted))]"
				>
					<div
						class="w-full rounded-[3px] bg-blue-700 transition-[height]"
						style:height="{max > 0 ? (el.value / max) * 90 : 0}%"
					></div>
				</div>
			{/each}
		</div>
	</AspectRatio>
</div>
