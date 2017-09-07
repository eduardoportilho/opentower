import {loadImageCache} from '../image-cache.js'
import {IsoGrid} from './iso-grid.js'

const CANVAS_WIDTH = 1400
const CANVAS_HEIGHT = 800

loadImageCache(init)

function init () {
  const canvas = document.getElementById('canvas')
  canvas.width = 1400
  canvas.height = 800

  const game = new Game(canvas)
  game.init()
}

class Game {
  constructor (canvas) {
    this.context = canvas.getContext('2d')
    this.isoGrid = new IsoGrid({
      width: 1400,
      height: 800
    })
  }

  init () {
    this.isoGrid.drawGame(this.context)
  }
}
