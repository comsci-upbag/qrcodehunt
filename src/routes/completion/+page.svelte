<script lang="ts">
	import { confetti } from '@neoconfetti/svelte';
	import { formLink } from '$lib/globals';

	import { availableCardImages } from '$lib/globals';

	const redirectToForm = () => {
		window.location.href = formLink;
	};
</script>

<div use:confetti={{ stageHeight: 1000 }} />
<div class="container">
	<div class="card">
		<h1>Congratulations!</h1>
		<p>You have found all the cards and successfully completed QR Code Hunt!</p>

		<div class="cards">
			<div>
				{#each availableCardImages as card}
					<div class="cardImage" style="background-image: url({card});" />
				{/each}
			</div>
		</div>

		<a href="/leaderboards">View Leaderboards</a>

		<p>To claim your reward, please accomplish the form below.</p>
		<button on:click={redirectToForm}>Open Google Forms</button>
	</div>
</div>

<style>
	.container {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: auto;
	}

	h1 {
		font-family: 'Poppins', sans-serif;
		font-size: x-large;
		font-weight: bold;
		padding-top: 16px;
		padding-bottom: 5px;
		text-align: center;
	}

	a {
		color: var(--black);
		font-size: 16px;
		font-family: Poppins;
		font-weight: 700;
		word-wrap: break-word;
		padding-top: 13.5px;
		padding-bottom: 13.5px;
		padding-left: 49px;
		padding-right: 48px;
		text-decoration: none;
		cursor: pointer;
	}

	p {
		color: black;
		font-size: 12px;
		font-family: Poppins;
		padding: 8px;
		font-weight: 500;
		word-wrap: break-word;
		text-align: center;
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
		box-shadow: 0 8px 32px 0 var(--secondary);
		backdrop-filter: blur(9px);
		-webkit-backdrop-filter: blur(9px);
		border-radius: 10px;
		border: 1px solid rgba(255, 255, 255, 0.18);
	}

	.cards {
		width: 300px;
		overflow: hidden;
		padding: 1rem 0;
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
	button:hover {
		transition: all 0.5s;
		background: rgba(153, 134, 193, 0.5);
	}
</style>
