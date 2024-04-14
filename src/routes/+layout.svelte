<script lang="ts">
	import '../app.pcss';

	import { fly } from 'svelte/transition';
	import { writable, type Writable } from 'svelte/store';

	import NavRail from '$lib/NavRail.svelte';

	import '$lib/css/light.css';
	import '$lib/css/dark.css';

	import '@material/web/all.js';
	import { onMount } from 'svelte';

	import * as app from '$lib/index';
	let darkMode = app.darkMode;

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

		darkMode.subscribe((value) => {
			document.cookie = `dark_mode=${Number(value)}`;
		});
	});
</script>

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
	<!-- svelte-ignore a11y-missing-attribute -->
	<iframe name="dummyframe" id="dummyframe" style="display: none;"></iframe>
</div>
