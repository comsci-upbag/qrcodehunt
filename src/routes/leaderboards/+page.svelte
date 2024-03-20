<script lang="ts">
	import type { User } from '@prisma/client';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	const userDuration = (user: User) => {
		const duration = user.duration;
		if (!duration) return '0s';

		const days = Math.floor(duration / (1000 * 60 * 60 * 24));
		const hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((duration % (1000 * 60)) / 1000);
		return `${days > 0 ? `${days}d ` : ''}${hours > 0 ? `${hours}h ` : ''}${
			minutes > 0 ? `${minutes}m ` : ''
		}${seconds > 0 ? `${seconds}s` : ''}`;
	};
</script>

<div class="container">
	<div class="card">
		<h1>Leaderboards</h1>
		<p>View the top 10 players who have collected the most cards.</p>

		<div class="leaderboard">
			{#each data.users as user}
				<div class="user">
					<img src={user.image} alt="" />
					<h2>{user.name}</h2>
					<p>{userDuration(user)}</p>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.container {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: auto;
	}

	h1 {
		font-family: 'Poppins', sans-serif;
		font-size: x-large;
		font-weight: bold;
		padding-top: 16px;
		padding-bottom: 5px;
		text-align: center;
	}

	p {
		color: black;
		font-size: 12px;
		font-family: Poppins;
		padding: 8px;
		font-weight: 500;
		word-wrap: break-word;
		text-align: center;
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
		box-shadow: 0 8px 32px 0 var(--secondary);
		backdrop-filter: blur(9px);
		-webkit-backdrop-filter: blur(9px);
		border-radius: 10px;
		border: 1px solid rgba(255, 255, 255, 0.18);
	}

	.leaderboard {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 10px;
		padding-bottom: 20px;
		text-overflow: ellipsis;
	}

	.user {
		display: grid;
		grid-template-columns: 1fr 3fr 2fr;
		align-items: center;
		gap: 10px;
	}

	.user img {
		width: 38px;
		height: 38px;
		border-radius: 9px;
	}

	.user h2 {
		font-family: 'Poppins', sans-serif;
		font-size: 16px;
		font-weight: bold;
	}

	.user p {
		color: black;
		font-size: 16px;
		font-family: Poppins;
		font-weight: 500;
		word-wrap: break-word;
	}
</style>
