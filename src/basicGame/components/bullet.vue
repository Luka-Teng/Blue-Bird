<template>
  <div class="bullet" :style="{top: vTop, left: vLeft}"></div>
</template>

<script>
  import { update } from './../engine'
  export default {
    props: ['vTop', 'vLeft']
  }
</script>

<style scoped>
  .bullet{
    width:10px;
    height:10px;
    background: #ed222e;
    position: absolute;
    z-index: 1
  }
</style>
