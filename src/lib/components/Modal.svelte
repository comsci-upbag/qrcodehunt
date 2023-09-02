<script lang="ts">
	import { availableCardImages } from '$lib/cardImages';

	export let modal: HTMLDialogElement | undefined = undefined;
	export let card: number;
	export let answer: string;
	export let totalCardsCollected;

	const claimCard = async () => {
		const res = await fetch('/api/claimCard', {
			method: 'POST',
			headers: {
				'Content-Type': 'text/plain'
			},
			body: JSON.stringify({ answer })
		});
		const { isCardClaimed } = await res.json();
		if (isCardClaimed) {
			card = -1;

			const res = await fetch('/api/getUserCards');
			const userCards = await res.json();
			totalCardsCollected = userCards.cards.length;
			modal?.close();
		}
	};
</script>

<dialog bind:this={modal}>
	<div class="modal">
		<h1>New card found!</h1>
		<div class="card" style="background-image: url({availableCardImages[card]});" />
		<button on:click={claimCard}>Claim </button>
	</div>
</dialog>

<style>
	dialog {
		border: none;
		margin: auto;
		padding: 30px 10px;
		background: rgba(255, 255, 255, 0.4);
		box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		border-radius: 10px;
		border: 1px solid rgba(255, 255, 255, 0.18);
	}

	dialog::backdrop {
		background: rgba(255, 255, 255, 0.4);
		box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
		backdrop-filter: blur(3px);
		-webkit-backdrop-filter: blur(3px);
		z-index: 100;
	}

	.modal {
		display: inline-flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 360px;
		gap: 30px;
		overflow: hidden;
	}

	h1 {
		font-family: 'Poppins', sans-serif;
		font-size: x-large;
		font-weight: bold;
	}

	.card {
		width: 300px;
		height: 300px;
		border-radius: 10px;
		background: #eee;
		background-size: cover;
	}

	button {
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
