<script lang="ts">
	import '../app.pcss';

	import { fly } from 'svelte/transition';

	import NavRail from '$lib/NavRail.svelte';

	import '$lib/css/light.css';
	import '$lib/css/dark.css';

	import '@material/web/all.js';

	export let data;

	export const ssr = false;
	export const prerender = true;

	let darkMode = true;
</script>

<div
	class="{darkMode
		? 'dark'
		: 'light'} flex flex-row overflow-hidden bg-[color:var(--md-sys-color-background)]"
>
	<NavRail bind:darkMode currentPath={data.url}></NavRail>

	{#key data.url}
		<div
			class="flex h-screen w-full p-6"
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
	<!-- svelte-ignore a11y-missing-attribute -->
	<iframe name="dummyframe" id="dummyframe" style="display: none;"></iframe>
</div>
