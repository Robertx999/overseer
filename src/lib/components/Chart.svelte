<script lang="ts">
	import AspectRatio from './ui/aspect-ratio/aspect-ratio.svelte';
	import { Separator } from './ui/separator';

	export let data: number[];
	$: max = data.reduce((previous, current) => (previous < current ? current : previous));
</script>

<AspectRatio ratio={3 / 2} class="grid">
	<div class="col-start-1 row-start-1 flex flex-col flex-nowrap justify-between">
		<Separator class="bg-[hsl(var(--border)/.5)]" />
		<Separator class="bg-[hsl(var(--border)/.5)]" />
		<Separator class="bg-[hsl(var(--border)/.5)]" />
		<Separator class="bg-[hsl(var(--border)/.5)]" />
		<Separator class="bg-[hsl(var(--border)/.5)]" />
		<Separator class="bg-[hsl(var(--border)/.5)]" />
	</div>
	<div class="col-start-1 row-start-1 flex h-full flex-row-reverse flex-nowrap items-end gap-1">
		{#each data as value}
			<div
				class=" w-full rounded-[3px] bg-blue-700 transition-[height]"
				style="height: {(value / max) * 80}%;"
			></div>
		{/each}
	</div>
</AspectRatio>
