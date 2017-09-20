/* global requestAnimationFrame */

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
import {getPaths} from './path.js'
import random from '../utils/random'
import {polygon} from '../utils/drawing-utils'

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
    this.startLoop()
  }

  startLoop () {
    this.lastTick = Date.now()
    this.animationId = requestAnimationFrame(this.tick.bind(this))
  }

  /**
   * Update state, render and restart the game loop every X ms.
   */
  tick () {
    if (!this.animationId) {
      return
    }
    const now = Date.now()
    const delta = (now - this.lastTick)

    this.update(delta)

    if (!this.animationId) {
      return
    }
    this.lastTick = now
    this.grid.drawGame(this.context)
    this.drawGoonPath()
    this.animationId = requestAnimationFrame(this.tick.bind(this))
  }

  update (delta) {
    this.goons.forEach(goon => goon.update(delta))
  }

  spanGoonOnRandomPosition () {
    const spawnCell = random.getRandomElementFromArray(
      this.grid.getSpawnCells()
    )
    const spawnPosition = this.grid.isoGridUtils.getCellSideCenter(
      spawnCell.row,
      spawnCell.col,
      FLOOR_HEIGHT,
      'south' // TODO: tiles can have different entry points
    )
    const goon = new Goon()
    goon.position = spawnPosition
    goon.cell = spawnCell
    goon.path = this.getPaths()[0]
    this.goons.push(goon)
  }

  getDrawables () {
    return this.goons
  }

  // Debug
  drawGoonPath () {
    const paths = getPaths(this.grid.getTargetCell())
    polygon(this.context, paths[0], false, true)
  }
}
