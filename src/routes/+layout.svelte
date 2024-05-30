<script lang="ts">
	import '../app.pcss';

	import { fly, fade } from 'svelte/transition';

	import NavRail from '$lib/NavRail.svelte';

	import '$lib/css/light.css';
	import '$lib/css/dark.css';

	import '@material/web/all.js';
	import { onMount } from 'svelte';

	import * as app from '$lib';
	let { darkMode, mobileFilterOpen, camAliases } = app;

	export let data;

	onMount(() => {
		darkMode.set(
			Boolean(
				parseInt(
					document.cookie
						.split('; ')
						.reduce((prev, curr) => (prev.split('=')[0] == 'dark_mode' ? prev : curr))
						.split('=')[1]
				)
			)
		);
		camAliases.set(
			new Map(
				document.cookie
					.split('; ')
					.filter((value) => /^([0-9A-Fa-f]{12})=.*$/.test(value))
					.map((value) => [value.split('=')[0] as string, value.split('=')[1]])
			)
		);

		darkMode.subscribe((value) => {
			document.cookie = `dark_mode=${Number(value)}`;
		});
	});

	let innerWidth: number;
</script>

<svelte:window bind:innerWidth />

<div
	class="{$darkMode ? 'dark' : 'light'} 
	flex h-screen w-screen flex-col-reverse overflow-hidden bg-[color:var(--md-sys-color-background)] text-[color:var(--md-sys-color-on-surface)] md:flex-row"
>
	<NavRail bind:darkMode currentPath={data.url}></NavRail>

	<div class="relative flex h-full w-full flex-row">
		{#key data.url}
			<div
				class="absolute flex h-full w-full overflow-y-auto"
				in:fly={{ y: 10, duration: 300, delay: 100 }}
				out:fly={{ y: 0, duration: 100 }}
			>
				<slot />
			</div>
		{/key}
	</div>
	{#if $mobileFilterOpen && innerWidth < 768}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			in:fade={{ duration: 300, delay: 100 }}
			out:fade={{ duration: 100 }}
			on:click={() => {
				mobileFilterOpen.set(false);
			}}
			class="absolute z-20 flex h-full w-full bg-black/50"
		/>
	{/if}
	<!-- svelte-ignore a11y-missing-attribute -->
	<iframe name="dummyframe" id="dummyframe" style="display: none;"></iframe>
</div>
