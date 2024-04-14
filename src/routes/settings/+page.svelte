<script lang="ts">
	import { writable } from 'svelte/store';

	import { darkMode, camAliases } from '$lib';
	import { onMount } from 'svelte';

	export let data;

	function switchDarkMode(e: Event) {
		let { value } = e.target as unknown as { value: string };
		darkMode.set(value == 'light' ? false : true);
	}

	function dataFromPathName(path: string) {
		return {
			getDate: () => {
				return new Date(parseInt(path.split('/').at(-1) as string) * 1000);
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

	onMount(() => {
		camAliases.subscribe((map) => {
			map.forEach((value, key) => {
				document.cookie = `cam${key}=${value}`;
			});
		});
	});
</script>

<svelte:body class={$darkMode ? 'dark' : 'light'} />

<div
	class="flex min-w-full basis-1/4 flex-col flex-wrap content-start items-start justify-start gap-3 p-6"
>
	<h1 class="text-sm font-bold text-[color:var(--md-sys-color-primary)] md:hidden">Application</h1>
	<div class="mb-5 flex w-full items-center gap-4 md:hidden">
		<div class="font-medium">Theme:</div>
		<md-outlined-select on:change={switchDarkMode}>
			<md-select-option selected={$darkMode ? null : true} value="light">
				<div slot="headline">Light</div>
			</md-select-option>
			<md-select-option selected={$darkMode ? true : null} value="dark">
				<div slot="headline">Dark</div>
			</md-select-option>
		</md-outlined-select>
	</div>
	<h1 class="text-sm font-bold text-[color:var(--md-sys-color-primary)]">Cameras</h1>
	{#each cam_nums as cam_num}
		<div class="flex flex-row items-center gap-4">
			<md-outlined-text-field
				label="Camera {cam_num} alias"
				on:input={({ target }) => {
					$camAliases.set(cam_num, target.value);
					camAliases.update((n) => n);
				}}
				value={$camAliases.get(cam_num) ? $camAliases.get(cam_num) : ''}
			>
			</md-outlined-text-field>
		</div>
	{/each}
</div>
