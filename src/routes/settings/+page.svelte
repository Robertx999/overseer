<script lang="ts">
	import { darkMode, camAliases } from '$lib';
	import { onMount } from 'svelte';

	export let data;

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
	{#each data.cams as cam}
		<div class="flex flex-row items-center gap-4">
			<md-outlined-text-field
				label="{cam} alias"
				on:input={({ target }) => {
					$camAliases.set(cam, target.value);
					camAliases.update((n) => n);
				}}
				value={$camAliases.get(cam) ? $camAliases.get(cam) : ''}
			>
			</md-outlined-text-field>
		</div>
	{/each}
</div>
