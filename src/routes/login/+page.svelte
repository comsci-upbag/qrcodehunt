<script>
	import { signIn } from '@auth/sveltekit/client';

	const handleSignIn = () => {
		signIn('google', { callbackUrl: '/' });
	};
</script>

<svelte:head>
	<title>Freshie Walk</title>
	<meta name="description" content="COMSCI@UP.BAG" />
</svelte:head>

<h1>
	Hello world
</h1>
