/**
 * @typedef {Object} Drawable
 * @property {Object} position
 * @property {number} position.x
 * @property {number} position.y
 * @property {function} draw
 */

import {loadImageCache} from '../image-cache.js'
import {IsoGrid, FLOOR_HEIGHT} from './iso-grid.js'
import Goon from './goon.js'
import random from '../utils/random'

const CANVAS_WIDTH = 1400
const CANVAS_HEIGHT = 800

loadImageCache(init)

function init () {
  const canvas = document.getElementById('canvas')
  canvas.width = CANVAS_WIDTH
  canvas.height = CANVAS_HEIGHT

  const game = new Game(canvas)
  game.init()
}

class Game {
  constructor (canvas) {
    this.goons = []
    this.context = canvas.getContext('2d')
    this.grid = new IsoGrid(this, {
      width: canvas.width,
      height: canvas.height
    })
  }

  init () {
    this.spanGoonOnRandomPosition()
    this.grid.drawGame(this.context)
  }

  spanGoonOnRandomPosition () {
    const spawnCellCoordinates = random.getRandomElementFromArray(
      this.grid.getSpawnCellCoordinates()
    )
    const spawnPosition = this.grid.isoGridUtils.getCellSideCenter(
      spawnCellCoordinates.row,
      spawnCellCoordinates.col,
      FLOOR_HEIGHT,
      'south' // TODO: tiles can have different entry points
    )
    const goon = new Goon()
    goon.position = spawnPosition
    this.goons.push(goon)
  }

  getDrawables () {
    return this.goons
  }
}
