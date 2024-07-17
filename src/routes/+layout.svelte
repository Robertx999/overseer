<script lang="ts">
	import '../app.css';

	import Button from '$lib/components/ui/button/button.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	import { Home, Clock, Filter, Settings, Sun, Moon, BarChart } from 'lucide-svelte';
	import { turn } from '$lib';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import type { Action } from 'svelte/action';
	import { writable, type Writable } from 'svelte/store';

	export const darkModeEnabled = writable(true);
	const darkMode: Action = (node) => {
			darkModeEnabled.subscribe((value) => node.setAttribute('data-mode', value ? 'dark' : ''));
		},
		pageWidth = writable(1000);

	export const routes: { name: string; href: string; icon: typeof Home }[] = [
		{
			name: 'Dashboard',
			href: '/dashboard',
			icon: Home
		},
		{
			name: 'Recent',
			href: '/recent',
			icon: Clock
		},
		{
			name: 'All Photos',
			href: '/all',
			icon: Filter
		},
		{
			name: 'Settings',
			href: '/settings',
			icon: Settings
		}
	];

	const breadcrumbs: Writable<{ name: string; href: string }[]> = writable([]);
	let widths: Writable<number[]> = writable([]);
	onMount(() => {
		page.subscribe((value) => {
			breadcrumbs.update(() => {
				const array = value.url.pathname.slice(1).split('/');
				return array.map((href, index) => ({
					href: '/' + array.slice(0, index + 1).join('/'),
					name:
						routes.find((el) => el.href == '/' + href)?.name ||
						href.charAt(0).toUpperCase() + href.slice(1).toLowerCase()
				}));
			});
		});
	});
</script>

<svelte:window bind:innerWidth={$pageWidth} />
<svelte:body use:darkMode />

<div class="flex h-full w-full flex-col-reverse md:flex-row">
	<div
		class="flex w-full flex-none flex-row max-md:h-fit max-md:border-t-[1px] md:w-14 md:flex-col md:border-r-[1px] md:py-2"
	>
		<!-- logo -->
		<div class="flex h-full w-14 items-center justify-center max-md:hidden md:h-14 md:w-full">
			<div class="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
				<BarChart color={'hsl(var(--primary-foreground) / var(--tw-text-opacity))'} size={16} />
				<!-- <svg
					class="logo h-6 w-6"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="175.508 130.812 175.506 153.3009"
				>
					<path
						style="fill-rule: nonzero; paint-order: fill;"
						d="M 201.129 130.812 L 175.508 130.812 L 203.691 270.448 C 203.691 270.448 275.432 301.194 351.014 270.448 L 201.129 130.812 Z"
					/>
				</svg> -->
			</div>
		</div>
		<!-- nav bar -->
		<div class="flex grow flex-row md:flex-col md:justify-between">
			<!-- top -->
			<div class="flex w-full flex-row justify-around gap-1 p-2 max-md:h-fit md:flex-col">
				{#each routes as { name, href, icon }, index}
					<Tooltip.Root>
						<Tooltip.Trigger asChild let:builder>
							<Button
								builders={[builder]}
								{href}
								class="transition-[background]"
								variant={$page.url.pathname == href ? 'secondary' : 'ghost'}
								size={$pageWidth > 768 ? 'icon' : undefined}
							>
								<div
									class="flex justify-center overflow-hidden transition-[width]"
									style:width="{$widths[index]}px"
								>
									<div bind:clientWidth={$widths[index]} class=" w-fit">
										{#if $pageWidth > 768 || $page.url.pathname != href}
											<svelte:component this={icon} size={22} />
										{:else}
											{name}
										{/if}
									</div>
								</div>
							</Button>
						</Tooltip.Trigger>
						<Tooltip.Content side="right">
							<p>{name}</p>
						</Tooltip.Content>
					</Tooltip.Root>
				{/each}
			</div>
			<!-- bottom -->
			<div class="flex gap-1 p-2 max-md:hidden max-md:h-full md:w-full">
				<Button
					variant="ghost"
					size="icon"
					on:click={() => {
						darkModeEnabled.update((value) => !value);
					}}
					class="relative overflow-hidden"
				>
					{#key $darkModeEnabled}
						<div in:turn={{ delay: 100 }} out:turn={{}} class="absolute overflow-hidden">
							<svelte:component this={$darkModeEnabled ? Moon : Sun} size={22} />
						</div>
					{/key}
				</Button>
			</div>
		</div>
	</div>
	<div class="flex h-full w-full flex-col overflow-hidden bg-[hsl(var(--muted)/.4)]">
		<!-- title bar -->
		<!-- <div class="flex h-14 w-full flex-none items-center border-b-[1px] px-4 text-xl font-bold">
			{routes.find((value) => $page.url.pathname == value.href)?.name}
		</div> -->
		<div class="flex w-full flex-none items-center py-7 pl-7 text-xl font-bold">
			<Breadcrumb.Root>
				<Breadcrumb.List>
					{#each $breadcrumbs as { name, href }, index}
						{#if index != 0}
							<Breadcrumb.Separator />
						{/if}
						<Breadcrumb.Item>
							<Breadcrumb.Link {href}>{name}</Breadcrumb.Link>
						</Breadcrumb.Item>
					{/each}
				</Breadcrumb.List>
			</Breadcrumb.Root>
		</div>
		<!-- content -->
		<div class="flex grow">
			<slot></slot>
		</div>
	</div>
</div>

<style lang="postcss">
	::-webkit-scrollbar {
		width: 3px;
	}
	::-webkit-scrollbar-track {
		@apply hidden;
	}
	::-webkit-scrollbar-thumb {
		background-color: hsl(var(--muted-foreground) / var(--tw-bg-opacity));
	}
</style>
