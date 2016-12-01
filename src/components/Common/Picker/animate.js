const time = Date.now || function () {
  return +new Date()
}

let running = {}
let counter = 1
let desiredFrames = 60
let millisecondsPerSecond = 1000

export default {


  requestAnimationFrame: (function () {
    var requestFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame
    return function (callback, root) {
      requestFrame(callback, root)
    }
  })(),


  stop (id) {
    var cleared = running[id] != null
    if (cleared) {
      running[id] = null
    }
    return cleared
  },


  isRunning (id) {
    return running[id] != null
  },


  start (stepCallback, verifyCallback, completedCallback, duration, easingMethod, root) {
    var _this = this
    var start = time()
    var lastFrame = start
    var percent = 0
    var dropCounter = 0
    var id = counter++

    if (!root) {
      root = document.body
    }


    if (id % 20 === 0) {
      var newRunning = {}
      for (var usedId in running) {
        newRunning[usedId] = true
      }
      running = newRunning
    }

    var step = function (virtual) {

      var render = virtual !== true

      var now = time()


      if (!running[id] || (verifyCallback && !verifyCallback(id))) {
        running[id] = null
        completedCallback && completedCallback(desiredFrames - (dropCounter / ((now - start) / millisecondsPerSecond)), id, false)
        return
      }


      if (render) {
        var droppedFrames = Math.round((now - lastFrame) / (millisecondsPerSecond / desiredFrames)) - 1
        for (var j = 0; j < Math.min(droppedFrames, 4); j++) {
          step(true)
          dropCounter++
        }
      }


      if (duration) {
        percent = (now - start) / duration
        if (percent > 1) {
          percent = 1
        }
      }


      var value = easingMethod ? easingMethod(percent) : percent
      if ((stepCallback(value, now, render) === false || percent === 1) && render) {
        running[id] = null
        completedCallback && completedCallback(desiredFrames - (dropCounter / ((now - start) / millisecondsPerSecond)), id, percent === 1 || duration == null)
      } else if (render) {
        lastFrame = now
        _this.requestAnimationFrame(step, root)
      }
    }


    running[id] = true
    // Init first step
    _this.requestAnimationFrame(step, root)

    return id
  }
}
