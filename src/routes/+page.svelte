<script lang="ts">
	import Scanner from '$lib/components/Scanner.svelte';
	import Dock from '$lib/components/Dock.svelte';
	import Modal from '$lib/components/Modal.svelte';

	import { onMount } from 'svelte';

	import { page } from '$app/stores';

	let user = $page.data.session?.user;
	let name = user?.name;
	let email = user?.email;
	let image = user?.image;

	let counter = 0;
	let numsOfCards = 11;

	let isModalShown = false;
	let cardNumber = -1;

	const validateCompletion = async () => {
		await fetch('/api/validateCompletion');
	};

	onMount(async () => {
		const res = await fetch('/api/getUserCards');
		const userCards = await res.json();
		counter = userCards.cards.length;
	});
</script>

<svelte:head>
	<title>Freshie Walk</title>
	<meta name="description" content="COMSCI@UP.BAG" />
</svelte:head>

<Modal bind:isModalShown bind:cardNumber bind:counter />

<div class="container">
	<h1 class="title">Freshie Walk</h1>
	<div class="card">
		<div class="info-bar">
			<div class="profile-bar">
				<img src={image} alt="" />
				<div class="profile-info">
					<h2>{name}</h2>
					<p>{email}</p>
				</div>
			</div>
			<p>{counter}/{numsOfCards}</p>
		</div>

		<Scanner />
		{#if counter == numsOfCards}
			<button on:click={validateCompletion}>Submit Cards</button>
		{/if}
	</div>
	<Dock />
</div>

<style>
	.container {
		height: calc(100vh - 50px);
		width: 100vw;
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 25px;
		margin: auto;
	}

	.container h1 {
		font-family: 'Poppins', sans-serif;
		font-size: x-large;
		font-weight: bold;
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

	.info-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 340px;
		padding-top: 15px;
		padding-bottom: 8px;
	}

	.info-bar p {
		color: black;
		font-size: 16px;
		font-family: Poppins;
		font-weight: 500;
		word-wrap: break-word;
	}

	.profile-bar {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 10px;
	}

	.profile-bar img {
		width: 38px;
		height: 38px;
		border-radius: 9px;
	}

	.profile-info {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		justify-content: center;
		align-items: flex-start;
	}

	.profile-info h2 {
		color: #08282b;
		font-size: 16px;
		font-family: Poppins;
		font-weight: 500;
		word-wrap: break-word;
	}
	.profile-info p {
		color: rgba(0, 0, 0, 0.5);
		font-size: 8px;
		font-family: Poppins;
		font-weight: 500;
		word-wrap: break-word;
	}
</style>
