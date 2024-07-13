<script lang="ts">
	import { onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	export let numberString: string, Class: string;

	let scrolls: HTMLDivElement[] = [],
		wrapper: HTMLDivElement,
		height = 0;

	const inner_width: Writable<number> = writable(0),
		chars = writable(['']);

	$: chars.set(numberString.split(''));

	onMount(() => {
		chars.subscribe((chars) => {
			if (chars != undefined && chars.length > 0) {
				chars.forEach((char, index) => {
					if (scrolls[index] && scrolls[index].style && !Number.isNaN(Number.parseInt(char))) {
						scrolls[index].style.transform =
							`translateY(-${scrolls[index]?.getElementsByTagName('div')[Number.parseInt(char)]?.offsetTop || 0}px)`;
					}
				});
			}
		});
		inner_width.subscribe((width) => {
			wrapper.style.width = `${width}px`;
		});
	});
</script>

<div class="relative transition-[width]" style="height: {height}px;" bind:this={wrapper}>
	<div
		class="gradient-mask absolute flex flex-row flex-nowrap {Class}"
		bind:clientWidth={$inner_width}
		bind:clientHeight={height}
	>
		{#each $chars as char, index}
			{#if Number.isNaN(Number.parseInt(char))}
				<div>
					{char}
				</div>
			{:else}
				<div class="relative flex h-[1lh] w-[.7em] flex-col flex-nowrap overflow-hidden">
					<div
						class="absolute flex flex-col flex-nowrap items-end overflow-visible transition-transform"
						bind:this={scrolls[index]}
					>
						<div class="relative">0</div>
						<div class="relative">1</div>
						<div class="relative">2</div>
						<div class="relative">3</div>
						<div class="relative">4</div>
						<div class="relative">5</div>
						<div class="relative">6</div>
						<div class="relative">7</div>
						<div class="relative">8</div>
						<div class="relative">9</div>
					</div>
				</div>
			{/if}
		{/each}
	</div>
</div>

<style lang="postcss">
	.gradient-mask {
		mask-image: linear-gradient(transparent, white 20%, white 80%, transparent);
	}
</style>
