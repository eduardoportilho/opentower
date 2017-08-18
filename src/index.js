import {loadImageCache} from './image-cache.js'
import {initGame, getGame} from './game.js'

loadImageCache(init)

function init () {
  const canvas = document.getElementById('canvas')
  const scoreBoard = document.getElementById('scoreBoard')

  const game = initGame(canvas, scoreBoard)
  game.start()

  initDebugPanel()
}

function initDebugPanel () {
  document.getElementById('spawn').onclick = function (e) {
    e.stopPropagation()
    e.preventDefault()

    const x = parseInt(document.getElementById('x').value)
    const y = parseInt(document.getElementById('y').value)
    getGame().spawnGoon(x, y)
  }

  document.getElementById('speedUpdate').onclick = function (e) {
    e.stopPropagation()
    e.preventDefault()

    const speed = parseInt(document.getElementById('speed').value)
    getGame().goons.forEach(goon => { goon.speed = speed })
  }

  document.getElementById('pause').onclick = function (e) {
    e.stopPropagation()
    e.preventDefault()
    const game = getGame()

    if (game.renderer.isRunning()) {
      game.stop()
    } else {
      game.start()
    }
  }
}
