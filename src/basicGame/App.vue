<template>
	<div id="background">
		<hero :speed="speed" :force="force" :g="g" ></hero>
		<span id='fps'></span>
		<ground vTop="376px" vWidth="30%" vLeft="0px"></ground>
		<ground vTop="438px" vWidth="60%" vLeft="0px"></ground>
		<ground vTop="500px" vWidth="100%" vLeft="0px"></ground>
		<wall vTop="0px" vHeight="377px" vLeft="0px"></wall>
		<wall vTop="0px" vHeight="501px" vRight="0px"></wall>

		<!--游戏基本信息-->
		<div class="game-info">
			<label>SPEED</label>
			<input v-model='speed'>
		</div>
		<div class="game-info" style="left:230px">
			<label>FORCE</label>
			<input v-model='force'>
		</div>
		<div class="game-info" style="left:460px">
			<label>G</label>
			<input v-model='g'>
		</div>
	</div>
</template>

<script>
import hero from './components/hero'
import ground from './components/ground'
import wall from './components/wall'
export default {
	data () {
		return {
			speed: 100.0,
			force: 3000.0,
			g: 1600.0
		}
	},
	components: {
		hero,
		ground,
		wall
	}
}
</script>

<style scope>
	#fps{
		position: absolute;
		right: 61px;
		top: 20px;
		border: 1px solid #999;
		padding: 10px 30px;
		border-radius: 10px;
		background: #aaa;
		color: #fff;
	}
	#background{
		background-image: url(./assets/background.png);
		background-size: cover;
		position: absolute;
		left: 0px;
		top: 0px;
		right: 0px;
		bottom: 342px;
		height: 501px;
	}
	.game-info {
    position: absolute;
    top: 569px;
    font-size: 12px;
    color: #fff;
	}
	.game-info input{
    margin-left: 10px;
    border-radius: 10px;
    padding: 0px 10px;
    background: #ccc;
    color: #333;
	}
</style>
