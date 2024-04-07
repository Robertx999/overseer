<script lang="ts">
	// import '@material/web/button/filled-button.js';
	// import '@material/web/button/outlined-button.js';
	// import '@material/web/checkbox/checkbox.js';
	// import '@material/web/switch/switch.js';

	let paths: string[] = ['./src/lib/uploads/808718.jpg'];

	import Card from '$lib/Card.svelte';
</script>

<div
	class="flex min-w-full basis-1/4 flex-row flex-wrap content-start items-start justify-start gap-6"
>
	{#each paths as path}
		<Card title={path} src={path}>Just an ordinary image.</Card>
	{/each}

	<!-- {#each paths as path}
		<Card title={path} src={path}></Card>
	{/each} -->
</div>
