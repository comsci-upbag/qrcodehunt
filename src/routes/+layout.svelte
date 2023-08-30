<script>
	import './styles.css';
</script>

<div>
	<main>
		<slot />
	</main>
</div>

<style>
	main {
		width: 100vw;
		height: 100vh;
		background: radial-gradient(farthest-side at top left, rgba(255, 0, 255, 0.5), transparent),
			radial-gradient(farthest-corner at bottom right, rgba(255, 50, 50, 0.5), transparent 400px);
	}
</style>
