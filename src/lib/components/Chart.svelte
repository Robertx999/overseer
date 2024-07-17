<script lang="ts">
	import { readable, writable, type Readable, type Writable } from 'svelte/store';
	import AspectRatio from './ui/aspect-ratio/aspect-ratio.svelte';
	import { Separator } from './ui/separator';
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';

	export let data: { value: number; date: Date }[];
	export let period: 'w' | 'm' | 'y';
	export let ratio = 3 / 2;

	const locale: Readable<string> = readable('en', (set) => {
		onMount(() => {
			set(navigator.language);
		});
	});

	const offset = 10;
	const separators = 5;

	const periods: Writable<string[]> = writable([]);

	const mousePos = writable({ x: 0, y: 0 }),
		tooltipPos = spring({ x: 0, y: 0 }),
		tooltipValue: Writable<{ value: number; date: Date }> = writable({
			value: 0,
			date: new Date(0)
		});

	let wrapper: HTMLDivElement,
		tooltip: HTMLDivElement,
		opacity = 0;

	const max = writable(0);
	const chartMax = writable(0);

	$: max.set(Math.max(...data.map((el) => el.value)));
	$: periods.set(
		data.map(({ date }, index) => {
			const { format } = Intl.DateTimeFormat($locale, {
				weekday: period == 'w' ? 'short' : undefined,
				month: period == 'y' || period == 'm' ? 'short' : undefined,
				day: period == 'm' ? '2-digit' : undefined
			});
			return format(date);
		})
	);

	onMount(() => {
		max.subscribe((value) => {
			chartMax.set(
				(Number.parseInt(Math.trunc(value).toString()[0]) + 1) *
					Math.pow(10, Math.trunc(value).toString().length - 1)
			);
		});
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
<div>
	<AspectRatio {ratio} class="grid grid-flow-dense grid-cols-[auto,1fr] grid-rows-[1fr,auto]">
		<div
			class=" col-start-1 row-start-1 flex h-full w-min flex-col-reverse items-end justify-between pr-4 text-xs text-[hsl(var(--muted-foreground)/var(--tw-text-opacity))]"
		>
			{#each Array.from({ length: separators + 1 }, (_, index) => index) as value}
				<div class=" flex h-[1px] items-center">
					{#if value == 0}
						{value.toFixed(0)}
					{:else}
						{(($chartMax / separators) * value).toFixed(0)}
					{/if}
				</div>
			{/each}
		</div>
		<div
			class=" relative col-start-2 row-start-1 grid h-full w-full {$$restProps.class}"
			on:mousemove={({ clientX, clientY }) => {
				const { left, top } = wrapper.getBoundingClientRect();
				mousePos.set({
					x: clientX - left,
					y: clientY - top
				});
			}}
			on:mouseenter={() => {
				opacity = 1;
			}}
			on:mouseleave={() => {
				opacity = 0;
			}}
			bind:this={wrapper}
		>
			<div
				bind:this={tooltip}
				class="pointer-events-none absolute flex flex-col flex-nowrap gap-1 rounded-md border-[1px] border-[hsl(var(--border))] bg-[hsl(var(--card))] px-2 py-2 text-xs drop-shadow-md transition-opacity"
				style:opacity
				style:left={$tooltipPos.x + 'px'}
				style:top={$tooltipPos.y + 'px'}
			>
				<div class="font-bold">
					{$tooltipValue.date.toLocaleDateString('en', {
						day: '2-digit',
						month: 'short',
						year: 'numeric'
					})}
				</div>
				<div class="flex flex-row flex-nowrap items-center gap-6">
					<div class="flex flex-row flex-nowrap items-center gap-2">
						<div class="h-4 w-1 rounded-[1.5px] bg-blue-700"></div>
						<div class="text-[hsl(var(--muted-foreground))]">Volume</div>
					</div>
					<div style:font-family="Geist Mono">
						{Number.parseFloat($tooltipValue.value.toFixed(3)).toString()}
					</div>
				</div>
			</div>
			<div class="col-start-1 row-start-1 flex flex-col flex-nowrap justify-between">
				{#each Array.from({ length: separators + 1 }) as _}
					<Separator class="bg-[hsl(var(--border)/.3)]" />
				{/each}
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
							style:height="{$max > 0 ? (el.value / $chartMax) * 100 : 0}%"
						></div>
					</div>
				{/each}
			</div>
		</div>
		<div
			class=" col-start-2 row-start-2 flex h-min w-full flex-row-reverse items-end justify-between pt-4 text-xs text-[hsl(var(--muted-foreground)/var(--tw-text-opacity))]"
		>
			{#each $periods as period}
				<div class=" flex w-[1px] justify-center">
					{period}
				</div>
			{/each}
		</div>
	</AspectRatio>
</div>
