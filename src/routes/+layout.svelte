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
	<img src="$lib/assets/background.png" alt="" class="hidden" />
	<div class="loading">
		<div class="lds-ripple">
			<div></div>
			<div></div>
		</div>
	</div>
{:then}
	<slot />
{/await}

<style>
	.hidden {
		position: absolute;
		top: -9999px;
		left: -9999px;
		opacity: 0;
	}
	.loading {
		height: 100vh;
		width: 100vw;
		display: flex;
		justify-content: center;
		align-items: center;
		background: black;
	}
	.lds-ripple {
		display: inline-block;
		position: relative;
		width: 80px;
		height: 80px;
	}
	.lds-ripple div {
		position: absolute;
		border: 4px solid #fff;
		opacity: 1;
		border-radius: 50%;
		animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
	}
	.lds-ripple div:nth-child(2) {
		animation-delay: -0.5s;
	}
	@keyframes lds-ripple {
		0% {
			top: 36px;
			left: 36px;
			width: 0;
			height: 0;
			opacity: 0;
		}
		4.9% {
			top: 36px;
			left: 36px;
			width: 0;
			height: 0;
			opacity: 0;
		}
		5% {
			top: 36px;
			left: 36px;
			width: 0;
			height: 0;
			opacity: 1;
		}
		100% {
			top: 0px;
			left: 0px;
			width: 72px;
			height: 72px;
			opacity: 0;
		}
	}
</style>
