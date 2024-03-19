<script lang="ts">
	import './styles.css';
	import { availableCardImages } from '$lib/globals';
	import { onMount } from 'svelte';

	onMount(async () => {
		availableCardImages.forEach((card) => {
			new Image().src = card;
		});
	});
</script>

<slot />
