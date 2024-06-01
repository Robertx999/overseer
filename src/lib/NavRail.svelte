<script lang="ts">
	import type { Writable } from 'svelte/store';
	import { invalidate } from '$app/navigation';

	import { mobileFilterOpen } from '$lib';

	export let darkMode: Writable<boolean>;
	export let currentPath: string;

	function switchDarkMode(e: Event) {
		let { selected } = e.target as unknown as { selected: boolean };
		darkMode.set(selected);
	}
</script>

<div
	class="z-10 flex h-[88px] w-[88px] shrink-0 grow-0 flex-row justify-between border-r-0 border-[color:var(--md-sys-color-outline-variant)] bg-[color:var(--md-sys-color-surface-container)] max-md:w-screen md:h-screen md:flex-col"
>
	<div
		class="relative flex w-full flex-row-reverse gap-10 max-md:items-center md:mt-[18px] md:flex-col"
	>
		<div
			class="bottom-[calc(88px+1.5rem)] right-6 mx-auto flex flex-col items-end gap-4 max-md:absolute"
		>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			{#if currentPath == '/gallery'}
				<md-fab
					variant="tertiary"
					on:click={() => {
						mobileFilterOpen.set(true);
					}}
					class="md:hidden"
					aria-label="Filter"
					size="small"
				>
					<md-icon slot="icon">filter_list</md-icon>
				</md-fab>
			{/if}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			{#if currentPath != '/settings'}
				<md-fab
					label="Refresh"
					variant="primary"
					on:click={() => {
						invalidate((url) => url.href.includes(currentPath));
					}}
					aria-label="Edit"
					class="md:hidden"
				>
					<md-icon slot="icon">refresh</md-icon>
				</md-fab>
			{/if}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<md-fab
				variant="primary"
				on:click={() => {
					invalidate((url) => url.href.includes(currentPath));
				}}
				aria-label="Edit"
				class="max-md:hidden"
			>
				<md-icon slot="icon">refresh</md-icon>
			</md-fab>
		</div>
		<div class="flex flex-row justify-around gap-4 max-md:w-full md:flex-col">
			<a
				href="/"
				class="destination flex h-14 w-full max-w-[88px] flex-col items-center justify-start gap-1 {currentPath ==
				'/'
					? 'text-[color:var(--md-sys-color-on-surface)]'
					: 'text-[color:var(--md-sys-color-on-surface-variant)]'}"
			>
				<div class="indicator relative flex h-8 w-14 items-center justify-center rounded-full">
					<div
						class="absolute h-full rounded-full bg-[color:var(--md-sys-color-primary-container)] transition-all duration-[200ms] ease-in-out {currentPath ==
						'/'
							? 'w-full opacity-100'
							: 'w-0 opacity-0'}"
					/>
					<md-icon class="z-10 {currentPath == '/' ? 'filled' : 'empty'}"> home </md-icon>
				</div>
				<span class=" text-xs font-medium leading-4 tracking-widest">Home</span>
			</a>
			<!-- <a
				href="/gallery"
				class="destination flex h-14 w-full max-w-[88px] flex-col items-center justify-start gap-1 {currentPath ==
				'/gallery'
					? 'text-[color:var(--md-sys-color-on-surface)]'
					: 'text-[color:var(--md-sys-color-on-surface-variant)]'}"
			>
				<div class="indicator relative flex h-8 w-14 items-center justify-center rounded-full">
					<div
						class="absolute h-full rounded-full bg-[color:var(--md-sys-color-primary-container)] transition-all duration-[200ms] ease-in-out {currentPath ==
						'/gallery'
							? 'w-full opacity-100'
							: 'w-0 opacity-0'}"
					/>
					<md-icon class="z-10 {currentPath == '/gallery' ? 'filled' : 'empty'}"> image </md-icon>
				</div>
				<span class=" text-xs font-medium leading-4 tracking-widest">Gallery</span>
			</a> -->
			<a
				href="/settings"
				class="destination flex h-14 w-full max-w-[88px] flex-col items-center justify-start gap-1 {currentPath ==
				'/settings'
					? 'text-[color:var(--md-sys-color-on-surface)]'
					: 'text-[color:var(--md-sys-color-on-surface-variant)]'}"
			>
				<div class="indicator relative flex h-8 w-14 items-center justify-center rounded-full">
					<div
						class="absolute h-full rounded-full bg-[color:var(--md-sys-color-primary-container)] transition-all duration-[200ms] ease-in-out {currentPath ==
						'/settings'
							? 'w-full opacity-100'
							: 'w-0 opacity-0'}"
					/>
					<md-icon class="z-10 {currentPath == '/settings' ? 'filled' : 'empty '}">
						settings
					</md-icon>
				</div>
				<span class=" text-xs font-medium leading-4 tracking-widest">Settings</span>
			</a>
		</div>
		<!-- <form
			bind:this={form}
			method="POST"
			action="./upload.php"
			enctype="multipart/form-data"
			target="dummyframe"
			class="flex w-full flex-col"
		>
			<input class="absolute mt-24" type="submit" value="Upload Image" name="submit">
			<input class="absolute mt-16" name="imageFile" type="file" />
		</form> -->
	</div>
	<div class="mb-5 flex w-full max-md:hidden">
		<md-outlined-icon-button
			on:change={switchDarkMode}
			selected={$darkMode ? true : null}
			toggle
			class="mx-auto"
		>
			<md-icon>light_mode</md-icon>
			<md-icon slot="selected">dark_mode</md-icon>
		</md-outlined-icon-button>
	</div>
</div>

<style lang="postcss">
	.destination:hover .indicator {
		background-color: color-mix(in srgb, var(--md-sys-color-on-surface) 8%, transparent);
	}
	.filled {
		animation: fill 200ms 1 forwards ease-in-out;
	}
	.empty {
		animation: empty 200ms 1 forwards ease-in-out;
	}
	@keyframes fill {
		0% {
			font-variation-settings: 'FILL' 0;
		}
		100% {
			font-variation-settings: 'FILL' 1;
		}
	}
	@keyframes empty {
		0% {
			font-variation-settings: 'FILL' 1;
		}
		100% {
			font-variation-settings: 'FILL' 0;
		}
	}
</style>
