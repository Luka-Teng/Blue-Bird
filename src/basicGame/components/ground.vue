<template>
  <div class="ground collision" :style="{top: vTop, left: vLeft, right: vRight, width: vWidth}"></div>
</template>

<script>
  export default {
    props: {
      vTop: String,
      vLeft: {
        type: String,
        default: 'auto'
      },
      vRight: {
        type: String,
        default: 'auto'
      },
      vWidth: String
    }
  }
</script>

<style scoped>
  .ground{
     width: 100%;
     height: 62px;
     background: url('./../assets/ground.png');
     position: absolute;
     background-repeat: repeat-x;
  }
</style>
