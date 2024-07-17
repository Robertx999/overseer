<script lang="ts">
	import Chart from '$lib/components/Chart.svelte';
	import RollingCounter from '$lib/components/RollingCounter.svelte';
	import { AspectRatio } from '$lib/components/ui/aspect-ratio';
	import * as Card from '$lib/components/ui/card';
	import * as Tabs from '$lib/components/ui/tabs';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { writable, type Writable } from 'svelte/store';
	import { TrendingUp } from 'lucide-svelte';

	// export let data: PageData;

	const time: Writable<string> = writable('14:40'),
		relative = writable(''),
		volume: Writable<number> = writable(0),
		delta_volume = writable(0);

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
		}, 4000);
	});
</script>

<div class="flex h-full w-full items-center justify-center px-7 pb-7">
	<div class="grid h-full grid-cols-[auto,auto,auto,auto] grid-rows-[repeat(4,min-content)] gap-7">
		<Card.Root class="col-start-1 row-start-1 flex min-w-fit items-center justify-center">
			<Card.Header>
				<Card.Content class="pb-0">
					<div class="ml-1 text-xs text-[hsl(var(--muted-foreground)/var(--tw-text-opacity))]">
						Last updated
					</div>
					<RollingCounter numberString={$time} class="text-3xl font-bold" />
					<div class="ml-1 text-base font-bold">{$relative}</div>
				</Card.Content>
			</Card.Header>
		</Card.Root>
		<Card.Root class="col-start-2 row-start-1 flex min-w-fit items-center justify-center">
			<Card.Header>
				<Card.Content class="pb-0">
					<div class="text-xs text-[hsl(var(--muted-foreground)/var(--tw-text-opacity))]">
						Volume
					</div>
					<RollingCounter numberString={$volume.toFixed(3)} class="text-3xl font-bold" />
					<div class="flex flex-row flex-nowrap items-center gap-2 text-base font-bold">
						<TrendingUp size="16" />
						<RollingCounter numberString={$delta_volume.toFixed(3)} class="text-base font-bold" />
					</div>
				</Card.Content>
			</Card.Header>
		</Card.Root>
		<Card.Root class="col-start-3 row-start-1 w-72 min-w-fit">
			<Card.Content class="pt-6">
				<AspectRatio class="overflow-hidden rounded-md" ratio={2 / 1}>
					<img
						src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
						alt="Gray by Drew Beamer"
						class="h-full w-full object-cover"
					/>
				</AspectRatio>
			</Card.Content>
		</Card.Root>
		<div class="col-start-4 row-span-full flex min-w-fit flex-col gap-7">
			<Card.Root class="h-36">
				<Card.Header>
					<Card.Title>Camera Settings</Card.Title>
				</Card.Header>
			</Card.Root>
			<Card.Root class="h-[50%]">
				<Card.Header>
					<Card.Title>Camera Schedule</Card.Title>
				</Card.Header>
			</Card.Root>
		</div>
		<Tabs.Root value="monthly" class="col-span-3 col-start-1 row-start-2 min-w-fit">
			<Tabs.List>
				<Tabs.Trigger value="yearly">Yearly</Tabs.Trigger>
				<Tabs.Trigger value="monthly">Monthly</Tabs.Trigger>
				<Tabs.Trigger value="weekly">Weekly</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="yearly">
				<Card.Root>
					<Card.Header>
						<Card.Title>Chart</Card.Title>
					</Card.Header>
					<Card.Content class="">
						<Chart
							data={Array.from({ length: 12 }, (_, index) => ({
								value: Math.abs(Math.min(Math.trunc((Math.random() - 0.5) * 60) / 10, 200)),
								date: new Date(Date.now() - index * 1000 * 60 * 60 * 24 * 30.437)
							}))}
							period="y"
							ratio={4 / 1}
						/>
					</Card.Content>
				</Card.Root>
			</Tabs.Content>
			<Tabs.Content value="monthly">
				<Card.Root>
					<Card.Header>
						<Card.Title>Chart</Card.Title>
					</Card.Header>
					<Card.Content class="">
						<Chart
							data={Array.from({ length: 12 }, (_, index) => ({
								value: Math.abs(Math.min(Math.trunc((Math.random() - 0.5) * 60) / 10, 200)),
								date: new Date(Date.now() - index * 1000 * 60 * 60 * 24 * 30.437)
							}))}
							period="y"
							ratio={4 / 1}
						/>
					</Card.Content>
				</Card.Root>
			</Tabs.Content>
			<Tabs.Content value="weekly">
				<Card.Root>
					<Card.Header>
						<Card.Title>Chart</Card.Title>
					</Card.Header>
					<Card.Content class="">
						<Chart
							data={Array.from({ length: 12 }, (_, index) => ({
								value: Math.abs(Math.min(Math.trunc((Math.random() - 0.5) * 60) / 10, 200)),
								date: new Date(Date.now() - index * 1000 * 60 * 60 * 24 * 30.437)
							}))}
							period="y"
							ratio={4 / 1}
						/>
					</Card.Content>
				</Card.Root>
			</Tabs.Content>
		</Tabs.Root>
	</div>
</div>
