import {loadImageCache} from './image-cache.js'
import Game from './game.js'
import Grid from './grid.js'

loadImageCache(init)

function init () {
  const canvas = document.getElementById('canvas')
  const game = new Game()
  const grid = new Grid(canvas, game)
  grid.draw()
}
