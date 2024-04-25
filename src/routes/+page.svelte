<script lang="ts">
	import Card from '$lib/Card.svelte';

	import { camAliases } from '$lib';

	export let data;
</script>

<div
	class="flex h-fit min-w-full basis-1/4 flex-row flex-wrap content-start items-start justify-start gap-6 p-6"
>
	{#if data.imgDirs}
		{#each Object.entries(data.imgDirs) as [mac, img]}
			<Card title={$camAliases.get(mac) ? $camAliases.get(mac) : mac} src={mac + '/' + img}>
				{new Date(parseInt(img.split('.')[0])).toLocaleString()}
			</Card>
		{/each}
	{/if}

	<!-- {#each paths as path}
		<Card title={path} src={path}></Card>
	{/each} -->
</div>
