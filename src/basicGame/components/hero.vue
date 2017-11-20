<template>
  <div>
    <div :class="action" :style="{position: 'absolute', left: movementX+'px'}">
    </div>
    <input v-model="speed">
  </div>
</template>

<script>
import { update } from './../engine'
export default {
  name: 'hero',
  data () {
    return {
      action: 'hero_idel',
      movementX: 0,
      speed: 10,
      keysDown: {},
      updates: {}
    }
  },
  methods: {
    keysDownEvent (keyCode) {
      switch (keyCode) {
        case 37:
          this.action = 'hero_walking back'
          this.updates[keyCode] = new update(() => {
            this.movementX--
          })
          break
        case 39:
          this.action = 'hero_walking'
          this.updates[keyCode] = new update(() => {
            this.movementX++
          })
      }
    },
    keysUpEvent (keyCode) {
      switch (keyCode) {
        case 37:
          this.action = 'hero_idel back'
          break
        case 39:
          this.action = 'hero_idel'
      }
      if (this.updates[keyCode]) {
        this.updates[keyCode].remove()
        delete this.updates[keyCode]
      }
    }
  },
  mounted () {
    let vm = this
    window.addEventListener("keydown",function(e){
      if (!vm.keysDown[e.keyCode]) {
        vm.keysDownEvent(e.keyCode)
        vm.keysDown[e.keyCode] = true
      }
    })
    window.addEventListener("keyup",function(e){
      if (vm.keysDown[e.keyCode]) {
        vm.keysUpEvent(e.keyCode)
        delete vm.keysDown[e.keyCode]
      }
    })
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
