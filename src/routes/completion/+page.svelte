<script lang="ts">
	import { confetti } from '@neoconfetti/svelte';
	import { formLink } from '$lib/globals';

	import { availableCardImages } from '$lib/globals';

	const redirectToForm = () => {
		window.location.href = formLink;
	};
</script>

<div use:confetti={{ stageHeight: 1000 }} />
<main>
	<div class="card">
		<h1>Congratulations!</h1>

		<div class="cards">
			<div>
				{#each availableCardImages as card}
					<div class="cardImage" style="background-image: url({card});" />
				{/each}
			</div>
		</div>

		<p>To claim your reward, please accomplish the form below.</p>
		<button on:click={redirectToForm}>Open Google Forms</button>
	</div>
</main>

<style>
	main {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 25px;
		margin: auto;
	}

	h1 {
		font-family: 'Poppins', sans-serif;
		font-size: x-large;
		font-weight: bold;
		padding: 16px;
	}

	p {
		color: black;
		font-size: 12px;
		font-family: Poppins;
		padding: 8px;
		font-weight: 500;
		word-wrap: break-word;
	}

	.card {
		display: inline-flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 360px;
		gap: 0px;
		overflow: hidden;
		background: rgba(255, 255, 255, 0.4);
		box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
		backdrop-filter: blur(9px);
		-webkit-backdrop-filter: blur(9px);
		border-radius: 10px;
		border: 1px solid rgba(255, 255, 255, 0.18);
	}

	.cards {
		width: 300px;
		overflow: hidden;
		padding-bottom: 13.5px;
	}

	.cards > div {
		display: flex;

		overflow-x: auto;
		scroll-snap-type: x mandatory;

		scroll-behavior: smooth;
		-webkit-overflow-scrolling: touch;
	}

	.cards > div::-webkit-scrollbar {
		width: 10px;
		height: 10px;
	}
	.cards > div::-webkit-scrollbar-thumb {
		background: black;
		border-radius: 10px;
	}
	.cards > div::-webkit-scrollbar-track {
		background: transparent;
	}

	.cardImage {
		scroll-snap-align: start;
		flex-shrink: 0;
		width: 300px;
		height: 300px;
		margin-right: 50px;
		border-radius: 10px;
		background: #eee;
		background-size: cover;
		transform-origin: center center;
		transform: scale(1);
		transition: transform 0.5s;
		position: relative;
	}

	button {
		width: 100%;
		color: rgba(0, 0, 0, 0.5);
		font-size: 16px;
		font-family: Poppins;
		font-weight: 700;
		word-wrap: break-word;
		padding-top: 13.5px;
		padding-bottom: 13.5px;
		padding-left: 49px;
		padding-right: 48px;
		background: rgba(255, 255, 255, 0.5);
		border-radius: 10px;
		justify-content: center;
		align-items: center;
		display: inline-flex;
	}
</style>
