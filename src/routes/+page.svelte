<script>
	import Scanner from './Scanner.svelte';
	import Dock from './Dock.svelte';

	import "@fontsource/poppins";
</script>

<svelte:head>
	<title>Freshie Walk</title>
	<meta name="description" content="COMSCI@UP.BAG" />
</svelte:head>

<main>
	<h1 class="title">Freshie Walk</h1>

	<section class="app">
		<div class="profile-info">
			<h2>John Doe</h2>
			<h2>jdoe@up.edu.ph</h2>
		</div>

		<div class="camera-preview">

		</div>
	</section>

</main>

<style>

	h1 {
		font-family: 'Poppins', sans-serif;
		font-size: x-large;
		font-weight: bold;
	}

	main {
		height: 100vh;
		width: 100vw;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	section.app {
		background-color: #DFE6EC;
		width: 80vw;
		height: 70vh;
		border-radius: 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
	}

	.profile-info {

	}

</style>
