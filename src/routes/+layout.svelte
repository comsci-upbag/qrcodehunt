<script lang="ts">
	import './styles.css';
	import { availableCardImages } from '$lib/globals';
	import { onMount } from 'svelte';

	onMount(async () => {
		availableCardImages.forEach((card) => {
			new Image().src = card;
		});
	});

	const waitBackground = new Promise((resolve) => {
		let backgroundImage = new Image();
		backgroundImage.src = '$lib/assets/background.png';
		backgroundImage.onload = resolve;
	});
</script>

{#await waitBackground}
	<div class="loading">
		<h1>Loading...</h1>
	</div>
{:then}
	<slot />
{/await}

<style>
	.loading {
		height: 100vh;
		width: 100vw;
		display: flex;
		justify-content: center;
		align-items: center;
		background: black;
	}

	h1 {
		color: white;
	}
</style>
