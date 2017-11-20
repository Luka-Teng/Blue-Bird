<template>
  <div :class="action">
  </div>
</template>

<script>
export default {
  name: 'hero',
  data () {
    return {
      action: 'hero_idel'
    }
  },
  methods: {
    face (event) {
      const num = event.keyCode
      switch (num) {
        case 37:
          this.action = 'hero_walking back'
          break
        case 39:
          this.action = 'hero_walking'
      }
    },
    stopMove (event) {
      const num = event.keyCode
      switch (num) {
        case 37:
          this.action = 'hero_idel'
          break
        case 39:
          this.action = 'hero_idel'
      }
    }
  },
  mounted () {
    window.addEventListener("keydown", this.face)
    window.addEventListener("keyup", this.stopMove)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hero_idel {
    width: 60px;
    height: 80px;
    background-image: url(./../assets/hero.jpg);
    background-position: 8% 3%;
  }
  .hero_idel.back {
    transform: rotateY(180deg)
  }
  .hero_walking {
    width: 60px;
    height: 80px;
    background-image: url(./../assets/hero.jpg);
    background-position: 41% 3%;
  }
  .hero_walking.back {
    transform: rotateY(180deg)
  }
</style>
