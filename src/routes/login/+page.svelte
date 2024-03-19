<script lang="ts">
	import { signIn } from '@auth/sveltekit/client';
	import google from '$lib/assets/google.svg';

	const handleSignIn = () => {
		signIn('google', { callbackUrl: '/' });
	};
</script>

<svelte:head>
	<title>QR Code Hunt</title>
	<meta name="description" content="COMSCI@UP.BAG" />
</svelte:head>

<div class="container">
	<div class="card">
		<h1>QR Code Hunt</h1>
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
		background: var(--black);
		box-shadow: 0 8px 32px 0 var(--primary);
		backdrop-filter: blur(9px);
		-webkit-backdrop-filter: blur(9px);
		border-radius: 10px;
		border: 1px solid rgba(255, 255, 255, 0.18);
	}

	.card h1 {
		color: var(--primary);
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
		background: var(--secondary);
		color: var(--white);
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
