<script lang="ts">
	import { Html5Qrcode } from 'html5-qrcode';
	import { availableCardImages } from '$lib/cardImages';

	export let totalCardsCollected: number;

	let card = -1;
	let scanning = false;
	let answer = '';
	let stopScanning = () => void {};

	const validateAnswer = async (decodedText: string) => {
		const res = await fetch('/api/validateAnswer', {
			method: 'POST',
			headers: {
				'Content-Type': 'text/plain'
			},
			body: JSON.stringify({ decodedText })
		});
		const { isValid, cardNumber } = await res.json();
		if (isValid) {
			stopScanning();
			answer = decodedText;
			card = cardNumber;
		}
	};

	const claimCard = async () => {
		if (answer == '') return;

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
		}
	};

	const startScanning = () => {
		let scanner = new Html5Qrcode('reader');
		scanner
			.start(
				{ facingMode: 'environment' },
				{
					aspectRatio: 1,
					fps: 10,
					qrbox: { width: 250, height: 250 }
				},
				async (decodedText: string) => {
					await validateAnswer(decodedText);
				},
				undefined
			)
			.then(() => {
				scanning = true;
			})
			.catch(() => {
				scanning = false;
			});

		stopScanning = () => {
			scanner?.stop().then(() => {
				scanning = false;
			});
		};
	};
</script>

<div class="container">
	<div id="reader">
		{#if !scanning}
			{#if card != -1}
				<div class="card" style="background-image: url({availableCardImages[card]});" />
			{:else}
				<div class="instructions">
					<h1>Please allow camera permissions to be able to scan QR codes!</h1>
					<p>
						Reset the site settings if you have already denied camera permissions and wish to use
						this app again.
					</p>
				</div>
			{/if}
		{/if}
	</div>
	{#if scanning}
		<button on:click|once={stopScanning}>Stop Scanning</button>
	{:else if card != -1}
		<button on:click|once={claimCard}>Claim</button>
	{:else}
		<button on:click|once={startScanning}>Start Scanning</button>
	{/if}
</div>

<style>
	.container {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-content: center;
	}
	#reader {
		width: 100%;
		aspect-ratio: 1;
	}
	.card {
		width: 360px;
		height: 360px;
		margin-right: 50px;
		border-radius: 10px;
		background: #eee;
		background-size: cover;
	}
	.instructions {
		width: 80%;
		height: 80%;
		padding: 10%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.instructions h1 {
		color: black;
		font-size: 16px;
		font-family: Poppins;
		font-weight: 500;
		word-wrap: break-word;
		text-align: center;
	}
	.instructions p {
		color: rgba(0, 0, 0, 0.5);
		font-size: 8px;
		font-family: Poppins;
		font-weight: 500;
		word-wrap: break-word;
		text-align: center;
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
		justify-content: center;
		align-items: center;
		display: inline-flex;
	}
</style>
