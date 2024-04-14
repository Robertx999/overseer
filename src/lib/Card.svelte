<script lang="ts">
	export let src: string | undefined = undefined;
	export let title = '';
</script>

<div
	class="relative flex flex-col overflow-hidden rounded-2xl bg-[color:var(--md-sys-color-surface-container-high)] text-[color:var(--md-sys-color-on-surface)] md:min-w-80 md:max-w-96"
>
	{#if src != undefined}
		<img {src} alt="" class="overflow-hidden object-cover" />
	{/if}
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
