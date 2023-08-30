<script>
	import { signIn } from '@auth/sveltekit/client';
	import google from '$lib/images/google.svg';

	import '@fontsource/poppins';

	const handleSignIn = () => {
		signIn('google', { callbackUrl: '/' });
	};
</script>

<svelte:head>
	<title>Freshie Walk</title>
	<meta name="description" content="COMSCI@UP.BAG" />
</svelte:head>

<div class="container">
	<h1>Freshie Walk</h1>
	<button on:click={handleSignIn}>
		Sign in with Google
		<img src={google} alt="" />
	</button>
</div>

<style>
	.container {
		margin: auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 26px;
	}

	.container h1 {
		color: rgba(57, 69, 92, 0.8);
		font-size: 48px;
		font-family: Poppins;
		font-weight: 700;
		word-wrap: break-word;
	}

	button {
		all: unset;
		display: flex;
		gap: 26px;
		padding: 26px;
		border-radius: 20px;
		background: rgba(255, 255, 255, 0.5);
		color: rgba(71.83, 28.13, 164.69, 0.5);
		font-size: 20px;
		font-family: Poppins;
		font-weight: 700;
		word-wrap: break-word;
	}

	button img {
		width: 26px;
		height: 26px;
	}
</style>
