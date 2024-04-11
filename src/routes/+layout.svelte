<script lang="ts">
	import '../app.pcss';

	import { fly } from 'svelte/transition';

	import NavRail from '$lib/NavRail.svelte';

	import '$lib/css/light.css';
	import '$lib/css/dark.css';

	import '@material/web/all.js';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	export let data;

	export const ssr = false;
	export const prerender = true;

	let darkMode = writable(true);

	// darkMode.set(
	// 	Boolean(
	// 		parseInt(
	// 			document.cookie
	// 				.split('; ')
	// 				.reduce((prev, curr) => (prev.split('=')[0] == 'dark_mode' ? prev : curr))
	// 		)
	// 	)
	// );

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
</script>

<div
	class="{$darkMode ? 'dark' : 'light'} 
	flex flex-row overflow-hidden bg-[color:var(--md-sys-color-background)] text-[color:var(--md-sys-color-on-surface)]"
>
	<NavRail bind:darkMode currentPath={data.url}></NavRail>

	<div class="relative flex w-full flex-row">
		{#key data.url}
			<div
				class="absolute flex h-screen w-full overflow-y-auto p-6"
				in:fly={{ y: 10, duration: 300, delay: 100 }}
				out:fly={{ y: 0, duration: 100 }}
			>
				<div
					class="flex min-w-full basis-1/4 flex-row flex-wrap content-start items-start justify-start gap-3"
				>
					<slot />
				</div>
			</div>
		{/key}
	</div>
	<!-- svelte-ignore a11y-missing-attribute -->
	<iframe name="dummyframe" id="dummyframe" style="display: none;"></iframe>
</div>
