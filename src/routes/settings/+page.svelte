<script lang="ts">
	import { writable } from 'svelte/store';

	import { darkMode } from '$lib/index';
	// let darkMode = app.darkMode;

	function switchDarkMode(e: Event) {
		let { value } = e.target as unknown as { value: string };
		darkMode.set(value == 'light' ? false : true);
	}
</script>

<svelte:body class={$darkMode ? 'dark' : 'light'} />

<div
	class="flex min-w-full basis-1/4 flex-row flex-wrap content-start items-start justify-start gap-3 p-6"
>
	<div class="mb-5 flex w-full items-center gap-4 md:hidden">
		<div>Theme:</div>
		<md-outlined-select on:change={switchDarkMode}>
			<md-select-option selected={$darkMode ? null : true} value="light">
				<div slot="headline">Light</div>
			</md-select-option>
			<md-select-option selected={$darkMode ? true : null} value="dark">
				<div slot="headline">Dark</div>
			</md-select-option>
		</md-outlined-select>
	</div>
</div>
