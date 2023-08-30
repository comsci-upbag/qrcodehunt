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
<div class="w-[1080px] h-[1920px] justify-center items-center gap-2.5 inline-flex">
	<div class="w-[1080px] h-[2276px] relative">
		<div
			class="w-[1000px] h-[870px] left-[54px] top-[1406px] absolute bg-violet-700 bg-opacity-50 rounded-full blur-[1000px]"
		/>
	</div>
	<div class="flex-col justify-center items-center gap-[68px] inline-flex">
		<div class="text-teal-950 text-8xl font-normal">Freshie Walk</div>
		<div class="w-[810px] h-[130px] relative">
			<div
				class="w-[810px] h-[130px] left-0 top-0 absolute bg-white bg-opacity-50 rounded-[20px]"
			/>
			<div class="w-[610px] h-[71px] left-[100px] top-[32px] absolute">
				<button
					class="left-0 top-0 absolute text-violet-900 text-opacity-50 text-[50px] font-bold"
					on:click={handleSignIn}
				>
					Login with Google
				</button>
				<img
					class="w-[70px] h-[70px] left-[540px] top-[1px] absolute"
					src="https://via.placeholder.com/70x70"
					alt=""
				/>
			</div>
		</div>
	</div>
</div>
