<script lang="ts">
	export let darkMode: boolean;
	export let currentPath: string;
</script>

<div
	class="flex h-screen w-[88px] shrink-0 grow-0 flex-col justify-between border-r-0 border-[color:var(--md-sys-color-outline-variant)] bg-[color:var(--md-sys-color-surface-container)]"
>
	<div class="mt-[18px] flex w-full flex-col gap-10">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<md-fab
			variant="tertiary"
			on:click={() => {
				window.location.reload();
			}}
			class="mx-auto"
			aria-label="Edit"
		>
			<md-icon slot="icon">refresh</md-icon>
		</md-fab>
		<div class="flex flex-col gap-4">
			<a href="/" class="destination flex h-14 w-full flex-col items-center justify-start gap-1">
				<div class="indicator relative flex h-8 w-14 items-center justify-center rounded-full">
					<div
						class="absolute h-full rounded-full bg-[color:var(--md-sys-color-secondary-container)] transition-all duration-300 {currentPath ==
						'/'
							? 'w-full opacity-100'
							: 'w-0 opacity-0'}"
					/>
					<md-icon
						class="z-10 text-[color:var(--md-sys-color-on-secondary-container)] {currentPath == '/'
							? 'filled'
							: 'empty'}"
					>
						home
					</md-icon>
				</div>
				<span
					class=" text-xs font-medium leading-4 tracking-widest text-[color:var(--md-sys-color-on-surface)]"
					>Home</span
				>
			</a>
			<a
				href="/gallery"
				class="destination flex h-14 w-full flex-col items-center justify-start gap-1"
			>
				<div class="indicator relative flex h-8 w-14 items-center justify-center rounded-full">
					<div
						class="absolute h-full rounded-full bg-[color:var(--md-sys-color-secondary-container)] transition-all duration-300 {currentPath ==
						'/gallery'
							? 'w-full opacity-100'
							: 'w-0 opacity-0'}"
					/>
					<md-icon
						class="z-10 text-[color:var(--md-sys-color-on-surface-variant)] {currentPath ==
						'/gallery'
							? 'filled'
							: 'empty'}"
					>
						image
					</md-icon>
				</div>
				<span
					class=" text-xs font-medium leading-4 tracking-widest text-[color:var(--md-sys-color-on-surface-variant)]"
					>Gallery</span
				>
			</a>
			<a
				href="/upload"
				class="destination flex h-14 w-full flex-col items-center justify-start gap-1"
			>
				<div class="indicator relative flex h-8 w-14 items-center justify-center rounded-full">
					<div
						class="absolute h-full rounded-full bg-[color:var(--md-sys-color-secondary-container)] transition-all duration-300 {currentPath ==
						'/upload'
							? 'w-full opacity-100'
							: 'w-0 opacity-0'}"
					/>
					<md-icon
						class="z-10 text-[color:var(--md-sys-color-on-surface-variant)] {currentPath ==
						'/upload'
							? 'filled'
							: 'empty'}"
					>
						upload
					</md-icon>
				</div>
				<span
					class=" text-xs font-medium leading-4 tracking-widest text-[color:var(--md-sys-color-on-surface-variant)]"
					>Upload</span
				>
			</a>
		</div>
		<!-- <form
			bind:this={form}
			method="POST"
			action="./upload.php"
			enctype="multipart/form-data"
			target="dummyframe"
			class="flex w-full flex-col"
		>
			<input class="absolute mt-24" type="submit" value="Upload Image" name="submit">
			<input class="absolute mt-16" name="imageFile" type="file" />
		</form> -->
	</div>
	<div class="mb-5 flex w-full">
		<md-outlined-icon-button
			on:change={() => {
				darkMode = !darkMode;
			}}
			selected={darkMode ? true : null}
			toggle
			class="mx-auto"
		>
			<md-icon>light_mode</md-icon>
			<md-icon slot="selected">dark_mode</md-icon>
		</md-outlined-icon-button>
	</div>
</div>

<style lang="postcss">
	.destination:hover .indicator {
		background-color: color-mix(in srgb, var(--md-sys-color-on-surface) 8%, transparent);
	}
	.filled {
		animation: fill 300ms 1 forwards;
	}
	.empty {
		animation: empty 300ms 1 forwards;
	}
	@keyframes fill {
		0% {
			font-variation-settings: 'FILL' 0;
		}
		100% {
			font-variation-settings: 'FILL' 1;
		}
	}
	@keyframes empty {
		0% {
			font-variation-settings: 'FILL' 1;
		}
		100% {
			font-variation-settings: 'FILL' 0;
		}
	}
</style>
