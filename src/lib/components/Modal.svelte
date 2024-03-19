<script lang="ts">
	import { availableCardImages, maxCards } from '$lib/globals';

	export let modal: HTMLDialogElement | undefined = undefined;
	export let card: number;
	export let answer: string;
	export let totalCardsCollected;
	export let isAlreadyFound: boolean;

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
			modal?.close();

			const res = await fetch('/api/getUserCards');
			const userCards = await res.json();
			totalCardsCollected = userCards.cards.length;

			if (totalCardsCollected == maxCards) {
				window.location.href = '/completion';
			}
		}
	};
</script>

<dialog bind:this={modal}>
	<div class="modal">
		{#if isAlreadyFound}
			<h1>Card already claimed!</h1>
			<img class="card" src={availableCardImages[card]} alt="" />
			<button on:click={() => modal?.close()}>Close</button>
		{:else}
			<h1>New card found!</h1>
			<img class="card" src={availableCardImages[card]} alt="" />
			<button on:click={claimCard}>Claim</button>
		{/if}
	</div>
</dialog>

<style>
	dialog {
		border: none;
		margin: auto;
		padding: 30px 10px;
		background: rgba(255, 255, 255, 0.4);
		box-shadow: 0 8px 32px 0 var(--secondary);
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		border-radius: 10px;
		border: 1px solid rgba(255, 255, 255, 0.18);
	}

	dialog::backdrop {
		background: rgba(255, 255, 255, 0.4);
		box-shadow: 0 8px 32px 0 var(--secondary);
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
	button:hover {
		transition: all 0.5s;
		background: rgba(206, 205, 209, 0.5);
	}
</style>
