<script lang="ts">
	// import '@material/web/button/filled-button.js';
	// import '@material/web/button/outlined-button.js';
	// import '@material/web/checkbox/checkbox.js';
	// import '@material/web/switch/switch.js';

	import Card from '$lib/Card.svelte';

	export let data;

	function dataFromPathName(path: string) {
		return {
			getDate: () => {
				return new Date(parseInt(path.split('/').at(-1) as string) * 1000).toLocaleString();
			},
			getTimestamp: () => {
				return parseInt(path.split('/').at(-1) as string) * 1000;
			},
			getCamNum: () => {
				return parseInt(path.slice(path.indexOf('-cam') + 4));
			}
		};
	}

	let parsed_paths = data.paths
		.map((el) => ({
			cam_num: dataFromPathName(el).getCamNum(),
			timestamp: dataFromPathName(el).getTimestamp(),
			date: dataFromPathName(el).getDate(),
			path: el
		}))
		.sort((a, b) => a.timestamp - b.timestamp);

	let cam_nums: number[] = [];

	parsed_paths.forEach((el) => {
		if (!cam_nums.includes(el.cam_num)) {
			cam_nums.push(el.cam_num);
		}
	});

	let newest: { cam_num: number; timestamp: number; date: string; path: string }[] = [];

	cam_nums.forEach((num) => {
		newest.push(
			parsed_paths
				.filter((el) => el.cam_num == cam_nums[num])
				.reduce(
					(prev, curr) => {
						return prev.timestamp > curr.timestamp ? prev : curr;
					},
					{ cam_num: 0, timestamp: 0, date: '', path: '' }
				)
		);
	});

	console.log(newest);
</script>

<div
	class="flex min-w-full basis-1/4 flex-row flex-wrap content-start items-start justify-start gap-6"
>
	{#if newest}
		{#each newest as cam}
			<Card title="Camera no.{cam.cam_num}" src={cam.path}>
				{cam.date}
			</Card>
		{/each}
	{/if}

	<!-- {#each paths as path}
		<Card title={path} src={path}></Card>
	{/each} -->
</div>
