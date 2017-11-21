<template>
	<div>
		<hero></hero>
		<span id='fps'></span>
		<div id="ground"></div>
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
#ground{
	 width: 500px;
	 height: 100px;
	 border: 1px solid #999;
	 background: #eee;
	 position: absolute;
	 top: 333px;
}
</style>
