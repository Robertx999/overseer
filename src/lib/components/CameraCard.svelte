<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Terminal, Settings } from 'lucide-svelte';
	// import { Slider } from '$lib/components/ui/slider';
	// import * as Tooltip from '$lib/components/ui/tooltip';
	import { onMount } from 'svelte';
	import RollingCounter from './RollingCounter.svelte';
	import { writable, type Writable } from 'svelte/store';
	import { AspectRatio } from './ui/aspect-ratio';
	import Chart from '$lib/components/Chart.svelte';

	let value = [0],
		open: boolean;

	const time: Writable<string> = writable('14:40'),
		relative = writable(''),
		volume: Writable<number> = writable(0),
		delta_volume = writable(0),
		data_arr = writable(
			Array.from({ length: 10 }, (_) => Math.trunc(Math.random() * 900) / 100 + 1)
		);
	onMount(() => {
		setInterval(() => {
			time.set(
				Math.trunc(Math.random() * 24)
					.toString()
					.padStart(2, '0') +
					':' +
					Math.trunc(Math.random() * 60)
						.toString()
						.padStart(2, '0')
			);
			relative.set(
				new Intl.RelativeTimeFormat(navigator.languages[0], { style: 'narrow' }).format(
					-Math.trunc(Math.random() * 10),
					'day'
				)
			);
			volume.set(Math.trunc(Math.random() * 999999) / 1000);
			delta_volume.set(Math.trunc(Math.random() * 12000) / 1000);
			data_arr.update((array) =>
				array.map((value) =>
					Math.abs(Math.min(value + Math.trunc((Math.random() - 0.5) * 60) / 10, 10))
				)
			);
		}, 500);
	});
</script>

<Card.Root>
	<Card.Header class="bg-[hsl(var(--muted)/.5)]">
		<div class=" flex flex-row flex-nowrap items-center justify-between gap-10">
			<div class="flex flex-col flex-nowrap">
				<div class="text-lg font-semibold">Camera</div>
				<div class="text-sm text-[hsl(var(--muted-foreground))]">EC:94:CB:4A:AF:28</div>
			</div>
			<div class="flex flex-row items-center gap-5">
				<Badge class="h-min bg-green-600">Online</Badge>
				<div class="flex flex-row gap-1">
					<Button variant="outline" size="icon">
						<Terminal size="16" />
					</Button>
					<Button variant="outline" size="icon">
						<Settings size="16" />
					</Button>
				</div>
			</div>
		</div>
	</Card.Header>
	<Card.Content>
		<Separator class="-ml-6 w-[calc(100%+3rem)]" />
		<div
			class="-ml-6 flex w-[calc(100%+3rem)] flex-row flex-nowrap content-stretch justify-evenly gap-2"
		>
			<div class="flex h-32 items-center px-6 py-9">
				<div class="">
					<div class="ml-1 text-xs text-[hsl(var(--muted-foreground)/var(--tw-text-opacity))]">
						Last updated
					</div>
					<RollingCounter numberString={$time} Class="text-3xl font-bold" />
					<div class="ml-1 text-base font-bold">{$relative}</div>
				</div>
			</div>
			<Separator orientation="vertical" class="h-auto" />
			<div class="flex h-32 items-center px-6 py-9">
				<div class="">
					<div class="text-xs text-[hsl(var(--muted-foreground)/var(--tw-text-opacity))]">
						Volume
					</div>
					<RollingCounter numberString={$volume.toFixed(3)} Class="text-3xl font-bold" />
					<div class="flex flex-row flex-nowrap text-base font-bold">
						+<RollingCounter numberString={$delta_volume.toFixed(3)} Class="text-base font-bold" />
					</div>
				</div>
			</div>
		</div>
		<Separator class="-ml-6 mb-6 w-[calc(100%+3rem)]" />
		<!-- <div class="flex w-full flex-col gap-2 pt-6">
			<Tooltip.Root openDelay={0} closeOnPointerDown={false} bind:open>
				<Tooltip.Trigger>
					<Slider
						max={10}
						step={0.01}
						bind:value
						onValueChange={() => {
							open = true;
						}}
					/>
				</Tooltip.Trigger>
				<Tooltip.Content>
					{value[0]}
				</Tooltip.Content>
			</Tooltip.Root>
			<RollingCounter numberString={value[0].toFixed(2)} Class="text-3xl font-bold" />
		</div> -->
		<AspectRatio ratio={4 / 1}>
			<img
				src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
				alt="Gray by Drew Beamer"
				class="h-full w-full rounded-md object-cover"
			/>
		</AspectRatio>
		<Separator class="my-6 -ml-6 w-[calc(100%+3rem)]" />
		<Chart data={$data_arr} />
	</Card.Content>
</Card.Root>
