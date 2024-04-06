<script lang="ts">
	export let src: string | undefined = undefined;
	export let title = '';
</script>

<div
	class="flex min-w-80 max-w-96 flex-col overflow-hidden rounded-2xl bg-[color:var(--md-sys-color-surface-container-high)] text-[color:var(--md-sys-color-on-surface)]"
>
	{#if src != undefined}
		<img {src} alt="" class="overflow-hidden rounded-b-xl object-cover" />
	{/if}
	<div class="flex flex-col gap-2 p-6">
		<p class="text-2xl text-[color:var(--md-sys-color-on-surface)]">{title}</p>
		<p class="text-sm text-[color:var(--md-sys-color-outline)]"><slot /></p>
	</div>
</div>
