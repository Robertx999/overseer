<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	export let id: string, image: string, collection: string;
	export let title = '';

	const getFile = async (collection: string, id: string, image: string) => {
		const res = await fetch(`/api/files/${collection}/${id}/${image}`);
		const url = URL.createObjectURL(await res.blob());
		return url;
	};

	let loaded: boolean = false;
</script>

<div
	class="relative flex min-w-full flex-1 flex-col overflow-hidden rounded-2xl bg-[color:var(--md-sys-color-surface-container-high)] text-[color:var(--md-sys-color-on-surface)] md:min-w-[25rem] md:max-w-[50rem]"
>
	<div class=" relative aspect-[4/3]">
		{#await getFile(collection, id, image)}
			<div
				out:fade={{ duration: 200 }}
				class="absolute h-full w-full animate-pulse bg-[color:var(--md-sys-color-outline-variant)]"
			></div>
		{:then src}
			<img
				in:fade={{ duration: 200 }}
				{src}
				alt=""
				class="{loaded ? 'visible' : 'collapse'} absolute overflow-hidden object-cover"
				on:load={() => {
					loaded = true;
					URL.revokeObjectURL(src);
				}}
			/>
		{/await}
		<!-- {#if !loaded}
			<div
				class="h-full w-full animate-pulse rounded-sm bg-[color:var(--md-sys-color-outline-variant)] p-5"
			></div>
		{/if} -->
	</div>
	<div class="absolute bottom-0 flex w-full flex-row items-end justify-between gap-2 p-6">
		<div
			class="bg-primary-transparent rounded-lg px-2 text-2xl leading-9 text-[color:var(--md-sys-color-on-primary-container)]"
		>
			{title}
		</div>
		<div
			class="bg-secondary-transparent rounded-md px-2 text-sm font-light leading-6 text-[color:var(--md-sys-on-secondary-container)]"
		>
			<slot />
		</div>
	</div>
</div>

<style lang="postcss">
	.bg-primary-transparent {
		background-color: color-mix(in srgb, var(--md-sys-color-primary-container) 75%, transparent);
	}
	.bg-secondary-transparent {
		background-color: color-mix(in srgb, var(--md-sys-color-secondary-container) 75%, transparent);
	}
</style>
