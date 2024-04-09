<script lang="ts">
	// import '@material/web/button/filled-button.js';
	// import '@material/web/button/outlined-button.js';
	// import '@material/web/checkbox/checkbox.js';
	// import '@material/web/switch/switch.js';

	import Card from '$lib/Card.svelte';

	export let data;

	function dataFromPathName(path: string) {
		return {
			date: new Date(parseInt(path.split('/').at(-1) as string) * 1000).toLocaleDateString(),
			cam_num: parseInt(path.slice(path.indexOf('-cam') + 4))
		};
	}
</script>

<div
	class="flex min-w-full basis-1/4 flex-row flex-wrap content-start items-start justify-start gap-6"
>
	{#if data.paths}
		{#each data.paths as path}
			<Card title={dataFromPathName(path).date} src={path}>
				Camera no.{dataFromPathName(path).cam_num}
			</Card>
		{/each}
	{/if}

	<!-- {#each paths as path}
		<Card title={path} src={path}></Card>
	{/each} -->
</div>
