<script lang="ts">
	import DatePicker from '$lib/DatePicker.svelte';
	import type { MdRadio } from '@material/web/all';
	import { writable, type Writable } from 'svelte/store';

	let showDatePicker = false;
	let input: any;
	let date: string = '';
	let lastValue = '';

	export let camNums: number[];

	export let camChecked: Writable<number>;
	export let selectedDate: Writable<string>;

	function preventDefault(e: Event) {
		e.preventDefault();
	}

	function onCheck({ target }: Event) {
		if (target) {
			if ((target as HTMLInputElement).checked) {
				camChecked.set(parseInt((target as HTMLInputElement).value));
			}
		}
	}
</script>

<div
	class="flex h-screen shrink-0 grow-0 flex-col items-center justify-start gap-6 border-l border-[color:var(--md-sys-color-outline-variant)] bg-[color:var(--md-sys-color-surface-container)] p-6"
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
				<label for="first-radio">{cam_num}</label>
			</div>
		{/each}
	</div>
	<md-divider />
	<div class="min-w-full">
		<md-outlined-text-field
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
		</md-outlined-text-field>
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class=" relative top-4 {showDatePicker ? '' : 'hidden'}" on:mousedown={preventDefault}>
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
	</div>
</div>
