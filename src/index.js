import {loadImageCache} from './image-cache.js'
import Game from './game.js'
import Renderer from './renderer.js'

loadImageCache(init)

function init () {
  const canvas = document.getElementById('canvas')
  const game = new Game()

  // TODO game as the object root: create render and delegate
  const renderer = new Renderer(canvas, game)
  renderer.start()
  initCtrlPanel(game, renderer)
}

function initCtrlPanel (game, renderer) {
  document.getElementById('spawn').onclick = function (e) {
    e.stopPropagation()
    e.preventDefault()

    const x = parseInt(document.getElementById('x').value)
    const y = parseInt(document.getElementById('y').value)
    game.spawnGoon(x, y)
  }

  document.getElementById('speedUpdate').onclick = function (e) {
    e.stopPropagation()
    e.preventDefault()

    const speed = parseInt(document.getElementById('speed').value)
    game.goons.forEach(goon => { goon.speed = speed })
  }

  document.getElementById('pause').onclick = function (e) {
    e.stopPropagation()
    e.preventDefault()

    if (renderer.isRunning()) {
      renderer.stop()
    } else {
      renderer.start()
    }
  }
}
