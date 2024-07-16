<script lang="ts">
	import { onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	export let numberString: string;

	let scrolls: HTMLDivElement[] = [];

	const inner_width: Writable<number> = writable(80),
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
	});
</script>

<div
	class="relative h-[1lh] transition-[width] {$$restProps.class || ''}"
	style:width="{$inner_width}px"
>
	<div
		class="gradient-mask absolute flex h-[1lh] flex-row flex-nowrap"
		bind:clientWidth={$inner_width}
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
