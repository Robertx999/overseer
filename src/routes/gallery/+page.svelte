<script lang="ts">
	// import '@material/web/button/filled-button.js';
	// import '@material/web/button/outlined-button.js';
	// import '@material/web/checkbox/checkbox.js';
	// import '@material/web/switch/switch.js';

	import DatePicker from '$lib/DatePicker.svelte';
	import { MdList } from '@material/web/all';

	let showDatePicker = false;
	let input: any;
	let date: string;
	let lastValue = '';

	function preventDefault(e: Event) {
		e.preventDefault();
	}
</script>

<div
	class="flex min-w-full basis-1/4 flex-row flex-wrap content-start items-start justify-start gap-6"
>
	<div>
		<ul>
			<li class="flex h-12 items-center justify-center gap-3">
				Camera 1
				<md-checkbox></md-checkbox>
			</li>
			<li class="flex h-12 items-center justify-center gap-3">
				Camera 2
				<md-checkbox></md-checkbox>
			</li>
			<li class="flex h-12 items-center justify-center gap-3">
				Camera 3
				<md-checkbox></md-checkbox>
			</li>
		</ul>
	</div>
	<div class="w-96">
		<md-outlined-text-field
			value={date}
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
			supporting-text="dd.mm.rrrr"
			has-trailing-icon="true"
		>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<md-icon-button
				toggle
				on:click={() => {
					date = input.value;
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
				<md-icon>today</md-icon>
			</md-icon-button>
		</md-outlined-text-field>
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class={'relative ' + (showDatePicker ? '' : 'hidden')} on:mousedown={preventDefault}>
			<DatePicker
				bind:value={date}
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
