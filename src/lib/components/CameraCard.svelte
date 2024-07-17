<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { ExternalLink, TrendingUp } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import RollingCounter from './RollingCounter.svelte';
	import { writable, type Writable } from 'svelte/store';
	import { AspectRatio } from './ui/aspect-ratio';
	import Chart from '$lib/components/Chart.svelte';
	import { Skeleton } from './ui/skeleton';
	import * as Tooltip from './ui/tooltip';

	export let skeleton: boolean = false,
		cameraId: string = '';
	let online = writable(Math.round(Math.random()));

	const time: Writable<string> = writable('14:40'),
		relative = writable(''),
		volume: Writable<number> = writable(0),
		delta_volume = writable(0),
		data_arr = writable(
			Array.from({ length: 10 }, (_, index) => ({
				value: Math.trunc(Math.random() * 900) / 100 + 1,
				date: new Date(Date.now() - index * 1000 * 60 * 60 * 24 * 30.437)
			}))
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
				Array.from(
					new Intl.RelativeTimeFormat(navigator?.language, {
						style: 'narrow',
						numeric: 'auto'
					}).format(-Math.trunc(Math.random() * 10), 'day')
				)
					.map((value, index) => (index == 0 ? value.toUpperCase() : value))
					.join('')
			);
			volume.set(Math.trunc(Math.random() * 999999) / 1000);
			delta_volume.set(Math.trunc(Math.random() * 12000) / 1000);
			data_arr.update((array) =>
				array.map((el, index) => ({
					value: Math.abs(Math.min(el.value + Math.trunc((Math.random() - 0.5) * 60) / 10, 200)),
					date: new Date(Date.now() - index * 1000 * 60 * 60 * 24 * 30.437)
				}))
			);
			online.update((value) => Math.round(Math.random()));
		}, 4000);
	});
</script>

<Card.Root
	class="w-full overflow-hidden max-md:w-[calc(100vw-3.5rem)] md:min-w-fit md:max-w-[25vw] {$$restProps.class ||
		''}"
>
	<Card.Header class="bg-[hsl(var(--muted)/.5)]">
		<div class=" flex flex-row flex-nowrap items-center justify-between gap-2 md:gap-20">
			<div class="flex flex-col flex-nowrap">
				{#if skeleton}
					<Skeleton class="mb-3 h-5 w-16" />
					<Skeleton class="h-4 w-[143px]"></Skeleton>
				{:else}
					<div class="text-lg font-semibold">Camera</div>
					<div style:font-family="Geist Mono" class="text-sm text-[hsl(var(--muted-foreground))]">
						EC:94:CB:4A:AF:28
					</div>
				{/if}
			</div>
			<div class="flex flex-row items-center gap-5">
				{#if skeleton}
					<Skeleton class="h-[22px] w-16 rounded-full" />
				{:else if $online}
					<Badge class="flex h-min w-16 justify-center bg-green-600">Online</Badge>
				{:else}
					<Badge class="flex h-min w-16 justify-center bg-red-700">Offline</Badge>
				{/if}
				<div class="flex flex-row gap-1">
					<Tooltip.Root>
						<Tooltip.Trigger asChild let:builder>
							<Button
								builders={[builder]}
								href="/dashboard/{cameraId}"
								variant="outline"
								size="icon"
							>
								<ExternalLink size="16" />
							</Button>
						</Tooltip.Trigger>
						<Tooltip.Content>
							<p>Open Camera View</p>
						</Tooltip.Content>
					</Tooltip.Root>
				</div>
			</div>
		</div>
	</Card.Header>
	<Card.Content>
		<Separator class="-ml-6 w-[calc(100%+3rem)]" />
		<div
			class="-ml-6 flex w-[calc(100%+3rem)] flex-row flex-nowrap content-stretch justify-evenly gap-2"
		>
			<div class="flex h-32 items-center px-2 py-9 md:px-6">
				<div class="">
					<div class="ml-1 text-xs text-[hsl(var(--muted-foreground)/var(--tw-text-opacity))]">
						Last updated
					</div>
					{#if skeleton}
						<Skeleton class="my-1 h-7 w-24" />
						<Skeleton class="my-1 h-5 w-16" />
					{:else}
						<RollingCounter numberString={$time} class="text-3xl font-bold" />
						<div class="ml-1 text-base font-bold">{$relative}</div>
					{/if}
				</div>
			</div>
			<Separator orientation="vertical" class="h-auto" />
			<div class="flex h-32 items-center px-2 py-9">
				<div class="">
					<div class="text-xs text-[hsl(var(--muted-foreground)/var(--tw-text-opacity))]">
						Volume
					</div>
					{#if skeleton}
						<Skeleton class=" my-1 h-7 w-32" />
						<Skeleton class="my-1 h-5 w-16" />
					{:else}
						<RollingCounter numberString={$volume.toFixed(3)} class="text-3xl font-bold" />
						<div class="flex flex-row flex-nowrap items-center gap-2 text-base font-bold">
							<TrendingUp size="16" />
							<RollingCounter numberString={$delta_volume.toFixed(3)} class="text-base font-bold" />
						</div>
					{/if}
				</div>
			</div>
		</div>
		<Separator class="-ml-6 mb-6 w-[calc(100%+3rem)]" />
		<AspectRatio ratio={4 / 1}>
			{#if skeleton}
				<Skeleton class="h-full w-full" />
			{:else}
				<img
					src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
					alt="Gray by Drew Beamer"
					class="h-full w-full rounded-md object-cover"
				/>
			{/if}
		</AspectRatio>
		<Separator class="my-6 -ml-6 w-[calc(100%+3rem)]" />
		<Chart
			period="y"
			data={skeleton
				? Array.from({ length: 1 }, () => ({ value: 0, date: new Date(Date.now()) }))
				: $data_arr}
		/>
	</Card.Content>
</Card.Root>
