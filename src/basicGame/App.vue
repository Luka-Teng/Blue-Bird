<template>
	<div>
		<hero></hero>
		<span id='fps'></span>
		<div class="ground" style="top:233px;left:0px"></div>
		<div class="ground" style="top:433px;left:0px"></div>
		<div class="ground" style="top:633px;left:0px"></div>
	</div>
</template>

<script>
import hero from './components/hero'
export default {
	components: {
		hero
	}
}
</script>

<style scope>
#fps{
	position: absolute;
	right: 27px;
	top: 16px;
	border: 1px solid #999;
	padding: 10px;
	border-radius: 10px;
	background: #aaa;
	color: #fff;
}
.ground{
	 width: 500px;
	 height: 100px;
	 border: 1px solid #999;
	 background: #eee;
	 position: absolute;
}
</style>
