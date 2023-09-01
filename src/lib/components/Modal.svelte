<script lang="ts">
	import { availableCardImages } from '$lib/cardImages';

	export let isModalShown: boolean;
	export let cardNumber: number;
	export let counter: number;
</script>

{#if isModalShown}
	<div>
		<h1>New card found!</h1>
		<div class="card" style="background-image: url({availableCardImages[cardNumber]});" />
		<button
			on:click={async () => {
				isModalShown = false;
				cardNumber = -1;

				const res = await fetch('/api/getUserCards');
				const userCards = await res.json();
				counter = userCards.cards.length;
			}}>Claim</button
		>
	</div>
{/if}

<style>
</style>
