<template>
  <div class="wall collision" :style="{top: vTop, left: vLeft, right: vRight, height: vHeight}"></div>
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
      vHeight: String
    }
  }
</script>

<style scoped>
  .wall{
     width: 50px;
     background: url('./../assets/wall.jpg');
     position: absolute;
     background-repeat: repeat-y;
     background-size: contain;
  }
</style>
