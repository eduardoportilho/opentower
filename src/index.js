import {loadImageCache} from './image-cache.js'
import Game from './game.js'
import Renderer from './renderer.js'

loadImageCache(init)

function init () {
  const canvas = document.getElementById('canvas')
  const game = new Game()
  const renderer = new Renderer(canvas, game)
  renderer.start()
  initCtrlPanel(game)
}

function initCtrlPanel (game) {
  document.getElementById('spawn').onclick = function (e) {
    e.stopPropagation()
    e.preventDefault()

    const x = document.getElementById('x').value
    const y = document.getElementById('y').value
    game.spawnGoon(x, y)
  }

  document.getElementById('speedUpdate').onclick = function (e) {
    e.stopPropagation()
    e.preventDefault()

    const speed = parseInt(document.getElementById('speed').value)
    game.goons.forEach(goon => {goon.speed = speed})
  }
}
