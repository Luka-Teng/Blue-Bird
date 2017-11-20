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
      speed: 1,
      keysDown: {},
      updates: {},
      runningLeft: false,
      runningRight: false
    }
  },
  methods: {
    keysDownEvent (keyCode) {
      switch (keyCode) {
        case 37:
          this.action = 'hero_walking back'
          this.runningLeft = true
          this.updates[keyCode] = new update(() => {
            this.movementX = this.movementX - parseFloat(this.speed)
          })
          break
        case 39:
          this.action = 'hero_walking'
          this.runningRight = true
          this.updates[keyCode] = new update(() => {
            this.movementX = this.movementX + parseFloat(this.speed)
          })

      }
    },
    keysUpEvent (keyCode) {
      switch (keyCode) {
        case 37:
          this.runningLeft = false
          if (this.runningRight) {
            this.action = 'hero_walking'
          } else {
            this.action = 'hero_idel back'
          }
          break
        case 39:
          this.runningRight = false
          if (this.runningLeft) {
            this.action = 'hero_walking back'
          } else {
            this.action = 'hero_idel'
          }
      }
      if (this.updates[keyCode]) {
        this.updates[keyCode].remove()
        delete this.updates[keyCode]
      }
    }
  },
  mounted () {
    window.addEventListener("keydown", (e) => {
      if (!this.keysDown[e.keyCode]) {
        this.keysDownEvent(e.keyCode)
        this.keysDown[e.keyCode] = true
      }
    })
    window.addEventListener("keyup", (e) => {
      if (this.keysDown[e.keyCode]) {
        this.keysUpEvent(e.keyCode)
        delete this.keysDown[e.keyCode]
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
