<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { AspectRatio } from '$lib/components/ui/aspect-ratio/index.js';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import CameraCard from '$lib/components/CameraCard.svelte';
</script>

<div class="flex flex-wrap gap-4">
	<CameraCard />
	<Card.Root class="grow max-md:w-full md:min-w-[28rem] md:max-w-[38rem]">
		<Card.Header>
			<Card.Title>Camera 1</Card.Title>
			<Card.Description>EC:94:CB:4A:AF:28</Card.Description>
		</Card.Header>
		<Card.Content>
			<AspectRatio ratio={16 / 9}>
				<img
					src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
					alt="Gray by Drew Beamer"
					class="h-full w-full rounded-md object-cover"
				/>
			</AspectRatio>
		</Card.Content>
		<Card.Footer>
			<div class="mt-1 h-5">{new Date(Date.now()).toLocaleString()}</div>
		</Card.Footer>
	</Card.Root>
	<Card.Root class="grow max-md:w-full md:min-w-[28rem] md:max-w-[38rem]">
		<Card.Header>
			<Card.Title>
				<Skeleton class="h-5 w-[100px]" />
			</Card.Title>
			<Card.Description>
				<Skeleton class=" mt-[2px] h-4 w-[150px]" />
			</Card.Description>
		</Card.Header>
		<Card.Content>
			<AspectRatio ratio={16 / 9}>
				<Skeleton class="h-full w-full rounded-md object-cover" />
			</AspectRatio>
		</Card.Content>
		<Card.Footer>
			<Skeleton class="mt-1 h-5 w-[150px]" />
		</Card.Footer>
	</Card.Root>
</div>
