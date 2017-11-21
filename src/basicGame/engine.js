//游戏中定义，6px = 1m, 60f = 1s, 故 x m/s = x/10 px/f, a m/s2 = a/60 px/f2
let startTime = null
let showFps = 30

//同步函数渲染队列
let functionList = []
export class update {
  constructor (callback, type = 0) {
    this.callback = callback
    this.type = type
    functionList.push(this)
  }
  remove () {
    functionList.splice(functionList.indexOf(this),1)
  }
}

//碰撞检测
export const adjustCollision = function (alpha, beta, where, callback) {
  if (where === 'top') {
    const value = getStyle(beta, 'top') - getStyle(alpha, 'height') + 1
    callback(value)
  }
}
function getStyle(obj, attribute) {
  return parseFloat(window.getComputedStyle(obj)[attribute])
}
export const impact = function (alpha, beta, data) {
  let a = {
    x: getStyle(alpha, 'left'),
    y: getStyle(alpha, 'top'),
    w: getStyle(alpha, 'width'),
    h: getStyle(alpha, 'height')
  }
  let b = {
    x: getStyle(beta, 'left'),
    y: getStyle(beta, 'top'),
    w: getStyle(beta, 'width'),
    h: getStyle(beta, 'height')
  }
  if (a.y + a.h <= b.y) {
    data.where = 'top'
    return false
  } else if (b.y + b.h <= a.y) {
    data.where = 'bottom'
    return false
  } else if (a.x + a.w <= b.x) {
    data.where = 'left'
    return false
  } else if (b.x + b.w <= a.x ) {
    data.where = 'right'
    return false
  }
  return true
}

//根据浏览器刷新率进行渲染
function draw(timestamp){
 if (!startTime) startTime = timestamp
 var diff = timestamp - startTime
 if (document.getElementById('fps') && showFps === 0) {
   document.getElementById('fps').innerHTML = (1000/diff).toFixed(0) + 'fps'
   showFps = 30
 } else {
   showFps--
 }
 startTime = timestamp
 functionList.forEach((fuc) => {
   fuc.callback()
   if (fuc.type === 1) fuc.remove()
 })
 requestAnimationFrame(draw)
}
requestAnimationFrame(draw)
