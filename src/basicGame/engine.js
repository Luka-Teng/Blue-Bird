let startTime = null
let showFps = 30
//同步函数渲染队列
let functionList = []
export class update {
  constructor (callback) {
    this.callback = callback
    functionList.push(this)
  }
  remove () {
    functionList.splice(functionList.indexOf(this),1)
  }
}
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
 })
 requestAnimationFrame(draw)
}
requestAnimationFrame(draw)
