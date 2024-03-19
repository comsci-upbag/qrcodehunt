<script lang="ts">
	import { availableCardImages } from '$lib/globals';

	let cards: number[] = [];

	let cardImages: string[];
	$: cardImages = cards.map((index) => {
		return availableCardImages[index];
	});

	const fetchCards = async () => {
		const res = await fetch('/api/getUserCards');
		const data = await res.json();
		cards = data.cards;
	};
</script>

<div class="container" on:mouseenter={fetchCards} role="none">
	<h1>Cards Collected</h1>
	<div class="cards">
		<div>
			{#each cardImages as cardImage}
				<img class="card" src={cardImage} alt="" />
			{/each}
		</div>
	</div>
</div>

<style>
	.container {
		transition: all 0.5s;
		width: 360px;
		height: 450px;
		position: absolute;
		top: calc(100% - 50px);
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		gap: 0px;
		background: rgba(255, 255, 255, 0.9);
		box-shadow: 0 8px 32px 0 var(--secondary);
		backdrop-filter: blur(60px);
		-webkit-backdrop-filter: blur(60px);
		border-radius: 10px;
		border: 1px solid rgba(255, 255, 255, 0.18);
	}

	.container h1 {
		color: rgba(0, 0, 0, 0.5);
		font-size: 16px;
		font-family: Poppins;
		font-weight: 700;
		word-wrap: break-word;
		padding-top: 13.5px;
		padding-bottom: 13.5px;
		padding-left: 49px;
		padding-right: 48px;
	}

	.container:hover {
		top: calc(100vh - 430px);
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

	.card {
		scroll-snap-align: start;
		flex-shrink: 0;
		width: 300px;
		margin-right: 50px;
		border-radius: 10px;
		background: #eee;
		background-size: cover;
		transform-origin: center center;
		transform: scale(1);
		transition: transform 0.5s;
		position: relative;
	}
</style>
