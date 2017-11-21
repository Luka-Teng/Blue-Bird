<template>
  <div>
    <div :class="action"
      :style="{position: 'absolute', left: movementX+'px', top: movementY+'px'}"
      ref="hero"
      id="hero" >
    </div>
    <label>Speed</label><input v-model="speed">
    <label>Gravity</label><input v-model="g">
    <label>jumping force</label><input v-model="force">
  </div>
</template>

<script>
import { update, impact, adjustCollision } from './../engine'
export default {
  name: 'hero',
  data () {
    return {
      action: 'hero_idel',
      movementX: 0.0,
      movementY: 0.0,
      speed: 50.0,
      velocityY: 0.0,
      velocityX: 0.0,
      g: 400,
      force: 1500.0,
      keysDown: {},
      updates: {},
      runningLeft: false,
      runningRight: false
    }
  },
  computed: {
    g_toFloat () {
      return isNaN(this.g) || this.g === '' ? 0.0 : parseFloat(this.g)
    },
    force_toFloat () {
      return isNaN(this.force) || this.force === '' ? 0.0 : parseFloat(this.force)
    }
  },
  methods: {
    keysDownEvent (keyCode) {
      switch (keyCode) {
        case 37:
          this.action = 'hero_walking back'
          this.runningLeft = true
          this.velocityX = isNaN(this.speed) || this.speed === '' ? 0.0 : parseFloat(this.speed)
          this.updates[keyCode] = new update(() => {
            this.movementX = this.movementX - this.velocityX / 10
          }, 'keypress')
          break
        case 39:
          this.action = 'hero_walking'
          this.runningRight = true
          this.velocityX = isNaN(this.speed) || this.speed === '' ? 0.0 : parseFloat(this.speed)
          this.updates[keyCode] = new update(() => {
            this.movementX = this.movementX + this.velocityX / 10
          }, 'keypress')
          break
        case 67:
        new update(() => {
          this.velocityY = -this.force_toFloat / 10
          this.movementY -= 2
        }, 1)
      }
    },
    keysUpEvent (keyCode) {
      switch (keyCode) {
        case 37:
          this.runningLeft = false
          this.velocityX = 0
          if (this.runningRight) {
            this.action = 'hero_walking'
          } else {
            this.action = 'hero_idel back'
          }
          break
        case 39:
          this.runningRight = false
          this.velocityX = 0
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
    //初始化
    const collisions =  document.getElementsByClassName("ground")
    let data = []
    for (let i = 0 ; i < collisions.length ; i++) {
      data[i] = {}
    }
    let init = new update(() => {
      this.velocityY += this.g_toFloat / 60
      this.movementY += this.velocityY / 10
      for (let i = 0 ; i < collisions.length ; i++) {
        const collision = impact(this.$refs.hero, collisions[i], data[i])
        if (collision) {
          if (data[i].where === 'top' || data[i].where === 'bottom') this.velocityY = 0.0
          adjustCollision(this.$refs.hero, collisions[i], data[i].where, (value) => {
            if (data[i].where === 'top' ||data[i].where === 'bottom') {
              this.movementY = value
            } else if (data[i].where === 'left' || data[i].where === 'right') {
              this.movementX = value
            }
          })
        }
      }
    }, 'init press')
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
