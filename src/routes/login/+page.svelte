<script lang="ts">
	import { signIn } from '@auth/sveltekit/client';
	import google from '$lib/images/google.svg';

	const handleSignIn = () => {
		signIn('google', { callbackUrl: '/' });
	};
</script>

<svelte:head>
	<title>Freshie Walk</title>
	<meta name="description" content="COMSCI@UP.BAG" />
</svelte:head>

<div class="container">
	<div class="card">
		<h1>Freshie Walk</h1>
		<button on:click={handleSignIn}>
			Sign in with Google
			<img src={google} alt="" />
		</button>
	</div>
</div>

<style>
	.container {
		width: 100vw;
		height: 100vh;
		display: flex;
		align-content: center;
		justify-content: center;
	}

	.card {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: auto;
		width: 360px;
		height: 360px;
		gap: 26px;
		background: rgba(255, 255, 255, 0.4);
		box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
		backdrop-filter: blur(9px);
		-webkit-backdrop-filter: blur(9px);
		border-radius: 10px;
		border: 1px solid rgba(255, 255, 255, 0.18);
	}

	.card h1 {
		color: rgba(57, 69, 92, 0.8);
		font-size: 34px;
		font-family: Poppins;
		font-weight: 700;
		word-wrap: break-word;
	}

	button {
		width: 200px;
		display: flex;
		justify-content: space-between;
		padding: 26px;
		border-radius: 20px;
		background: rgba(255, 255, 255, 0.5);
		color: rgba(71.83, 28.13, 164.69, 0.5);
		font-size: 16px;
		font-family: Poppins;
		font-weight: 700;
		word-wrap: break-word;
	}

	button img {
		width: 26px;
		height: 26px;
	}
</style>
