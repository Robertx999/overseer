<script lang="ts">
	import { darkMode, camAliases, type CamerasRecordModel } from '$lib';
	import { onDestroy, onMount } from 'svelte';
	import PocketBase from 'pocketbase';
	import { writable, type Writable } from 'svelte/store';

	export let data;

	let cameras: Writable<CamerasRecordModel[]> = writable(data.cameras);

	const pbOrigin = 'http://10.1.1.38:9000';
	const pb = new PocketBase(pbOrigin);

	function switchDarkMode(e: Event) {
		let { value } = e.target as unknown as { value: string };
		darkMode.set(value == 'light' ? false : true);
	}

	onMount(() => {
		camAliases.subscribe((map) => {
			map.forEach((value, key) => {
				document.cookie = `${key}=${value}`;
			});
		});
		pb.collection('cameras').subscribe('*', async () => {
			let list: CamerasRecordModel[] = await pb
				.collection('cameras')
				.getFullList()
				.then((res) => {
					return res as CamerasRecordModel[];
				})
				.catch((error) => {
					console.log(error);
					return [];
				});
			cameras.update(() => list);
		});
		cameras.subscribe((value) => {
			console.log(value);
		});
	});

	onDestroy(() => {
		pb.collection('cameras').unsubscribe();
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
	{#each $cameras as camera}
		<div class="flex flex-row items-center gap-4">
			<md-outlined-text-field
				label="{camera.mac} alias"
				on:input={({
					//@ts-ignore
					target
				}) => {
					$camAliases.set(camera.mac, target.value);
					camAliases.update((n) => n);
				}}
				value={$camAliases.get(camera.mac) ? $camAliases.get(camera.mac) : ''}
			>
			</md-outlined-text-field>
		</div>
	{/each}
</div>
