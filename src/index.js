import {loadImageCache} from './image-cache.js'
import Game from './game.js'
import Renderer from './renderer.js'

loadImageCache(init)

function init () {
  const canvas = document.getElementById('canvas')
  const game = new Game()
  const renderer = new Renderer(canvas, game)
  renderer.start()
}
