<script lang="ts">
	import DatePicker from '$lib/DatePicker.svelte';
	import { writable, type Writable } from 'svelte/store';
	import { fly } from 'svelte/transition';

	import { mobileFilterOpen, camAliases } from '$lib';

	let showDatePicker = false;
	let input: any;
	let lastValue = '';

	export let camNums: number[];

	export let camChecked: Writable<number>;
	export let selectedDate: Writable<string>;

	function preventDefault(e: Event) {
		if (innerWidth > 768) {
			e.preventDefault();
		}
	}

	function onCheck({ target }: Event) {
		if (target) {
			if ((target as HTMLInputElement).checked) {
				camChecked.set(parseInt((target as HTMLInputElement).value));
			}
		}
	}

	let innerWidth: number;
</script>

<svelte:window bind:innerWidth />

<div
	in:fly={innerWidth <= 768 ? { y: 10, duration: 300, delay: 100 } : { y: 0, duration: 0 }}
	out:fly={innerWidth <= 768 ? { y: 0, duration: 100 } : { y: 0, duration: 0 }}
	class="flex shrink-0 grow-0 flex-col items-center justify-start gap-6 bg-[color:var(--md-sys-color-surface-container)] p-6 max-md:rounded-3xl md:h-screen md:border-l md:border-[color:var(--md-sys-color-outline-variant)]"
>
	<div role="radiogroup" aria-labelledby="group-title" class="flex min-w-full flex-col gap-6">
		<div class="flex items-center gap-4">
			<md-icon>videocam</md-icon>
			<h3 class="text-lg font-semibold" id="group-title">Camera</h3>
		</div>

		{#each camNums as cam_num}
			<div class="flex gap-4">
				<md-radio
					on:input={onCheck}
					id="first-radio"
					name="group"
					value={cam_num}
					aria-label="First"
					checked={$camChecked == cam_num ? true : null}
				/>
				<label for="first-radio"
					>{$camAliases.get(cam_num) ? $camAliases.get(cam_num) : 'Camera ' + cam_num}</label
				>
			</div>
		{/each}
	</div>
	<md-divider />
	<div class="min-w-full">
		<md-outlined-text-field
			class="w-56"
			value={$selectedDate}
			on:focus={() => {
				showDatePicker = true;
				lastValue = input.value;
			}}
			on:blur={() => {
				showDatePicker = false;
			}}
			bind:this={input}
			label="Date"
			type="date"
			has-trailing-icon="true"
		>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			{#if innerWidth > 768}
				<md-icon-button
					toggle
					on:click={() => {
						selectedDate.set(input.value);
						if (showDatePicker == false) {
							input.focus();
						} else {
							input.blur();
						}
					}}
					on:mousedown={preventDefault}
					selected={showDatePicker ? true : null}
					slot="trailing-icon"
				>
					<md-icon>calendar_today</md-icon>
				</md-icon-button>
			{/if}
		</md-outlined-text-field>
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		{#if showDatePicker && innerWidth > 768}
			<div class=" relative top-4" on:mousedown={preventDefault}>
				<DatePicker
					bind:value={$selectedDate}
					onCancelClick={() => {
						input.blur();
						input.value = lastValue;
					}}
					onOKClick={() => {
						input.blur();
					}}
				/>
			</div>
		{/if}
	</div>
	{#if innerWidth <= 768}
		<div class="flex min-w-full flex-row items-center justify-end gap-2">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<md-text-button
				on:click={() => {
					input.value = lastValue;
					input.blur();
					mobileFilterOpen.set(false);
				}}
			>
				Cancel
			</md-text-button>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<md-text-button
				on:click={() => {
					selectedDate.set(input.value);
					input.blur();
					mobileFilterOpen.set(false);
				}}
			>
				OK
			</md-text-button>
		</div>
	{/if}
</div>
