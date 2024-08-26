<script>
	export let clue;
	export let answer;
	export let flip;

	export let flippable = true;

	export let showCardBack = false;
	const toggleShowBack = () => (showCardBack = flippable && !showCardBack);
</script>

<main>
	<div
		class="flip-box"
		role="button"
		on:click={toggleShowBack}
		on:keyup={toggleShowBack}
		tabindex="0"
	>
		<div class="flip-box-inner" class:flip-it={showCardBack}>
			<div class="flip-box-front">
				<div id="image-cont">
					<img src={clue} alt={clue} />
				</div>
			</div>

			<div class="flip-box-back" class:conceal-answer={flip}>
				<img src={answer} alt={answer} />
			</div>
		</div>
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;

		scroll-snap-align: start;
		flex-shrink: 0;
		width: 300px;
		margin-right: 50px;
		border-radius: 10px;
		background: #eee;
		background-size: cover;
		transform-origin: center center;
		transform: scale(1);
		transition: transform 0.5s;
		position: relative;
	}

	/* Position the front and back side */
	.flip-box-front,
	.flip-box-back {
		position: absolute;
		width: 100%;
		height: 100%;
		-webkit-backface-visibility: hidden; /* Safari */
		backface-visibility: hidden;
	}

	/* Style the front side */
	.flip-box-front {
		background-color: #ddd;
		color: black;
		display: flex;
		justify-content: center;
	}

	@keyframes revealTextSlowly {
		to {
			color: white;
		}
	}

	.conceal-answer {
		animation: revealTextSlowly 0.3s forwards;
	}

	/* Style the back side */
	.flip-box-back {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #61592f;
		color: #61592f;
		/* 		color: white; */
		font-size: 1.3rem;
		transform: rotateY(180deg);
	}

	#image-cont {
		background-color: hsl(50, 65%, 75%);
		max-width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	img {
		max-height: 100%;
	}

	/* The flip box container - set the width and height to whatever you want. We have added the border property to demonstrate that the flip itself goes out of the box on hover (remove perspective if you don't want the 3D effect */
	.flip-box {
		background-color: transparent;
		width: 300px;
		height: 300px;
		/* 		border: 1px solid #ddd; */
		perspective: 1000px; /* Remove this if you don't want the 3D effect */
	}

	/* This container is needed to position the front and back side */
	.flip-box-inner {
		position: relative;
		width: 100%;
		height: 100%;
		text-align: center;
		transition: transform 0.4s;
		transform-style: preserve-3d;
	}

	/* Do an horizontal flip on button click */
	.flip-it {
		transform: rotateY(180deg);
	}
</style>
