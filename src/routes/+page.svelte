<script>
	import Scanner from './Scanner.svelte';
	import Dock from './Dock.svelte';
</script>

<svelte:head>
	<title>Freshie Walk</title>
	<meta name="description" content="COMSCI@UP.BAG" />
</svelte:head>

<div class="w-[1080px] h-[1920px] relative">
	<div class="w-[1080px] h-[2276px] left-0 top-[-174px] absolute">
		<div
			class="w-[1000px] h-[870px] left-[54px] top-[1406px] absolute bg-violet-700 bg-opacity-50 rounded-full blur-[1000px]"
		/>
	</div>
	<img
		class="w-[823px] h-[897px] left-[128px] top-[463px] absolute rounded-[20px]"
		src="https://via.placeholder.com/823x897"
		alt=""
	/>
	<div class="w-[908px] h-[380px] left-[86px] top-[1666px] absolute">
		<div
			class="w-[908px] h-[313px] left-0 top-[67px] absolute bg-violet-50 bg-opacity-50 rounded-[40px]"
		/>
		<div class="w-[241px] h-[254px] left-[42px] top-0 absolute bg-white rounded-[30px] shadow" />
		<div class="w-[241px] h-[254px] left-[333px] top-0 absolute bg-white rounded-[30px] shadow" />
		<div
			class="w-[241px] h-[247px] left-[624px] top-[7px] absolute bg-white rounded-[30px] shadow"
		/>
	</div>
	<div class="w-[453px] h-[100px] left-[313px] top-[1430px] absolute">
		<div class="w-[453px] h-[100px] left-0 top-0 absolute bg-white bg-opacity-50 rounded-[20px]" />
		<div class="left-[151px] top-[17px] absolute text-black text-opacity-50 text-[50px] font-bold">
			Claim
		</div>
	</div>
	<div class="w-[374px] h-[100px] left-[134px] top-[294px] absolute">
		<div class="left-[137px] top-[27px] absolute text-teal-950 text-[32px] font-light">
			Brymer Meneses
		</div>
		<img
			class="w-[100px] h-[100px] left-0 top-0 absolute rounded-full"
			src="https://via.placeholder.com/100x100"
			alt=""
		/>
	</div>
	<div class="left-[223px] top-[81px] absolute text-teal-950 text-8xl font-normal">
		Freshie Walk
	</div>
</div>
