import {imageCache} from './image-cache.js'
import pathFinder from './path-finder'

/**
 * Point where the goons are heading to.
 * @type {Object}
 */
const GOON_TARGET_POSITION = {
  x: 600,
  y: 275
}

/**
 * Number of steps to complete the arena.
 * @type {Number}
 */
const STEP_COUNT = 400

export default class Goon {
  constructor (id, position, game) {
    this.id = id
    this.position = position
    this.game = game
    this.stepX = (GOON_TARGET_POSITION.x - this.position.x) / STEP_COUNT
    this.stepY = (GOON_TARGET_POSITION.y - this.position.y) / STEP_COUNT
  }

  /**
   * Draw the goon on position.
   * @param  {CanvasRenderingContext2D} context - Canvas renderering context.
   */
  draw (context) {
    var img = imageCache['goon-1']
    context.drawImage(img, this.position.x, this.position.y)
  }

  /**
   * Update goon state.
   */
  update () {
    let newPosition = pathFinder.nextPosition(this.position)
    if (newPosition !== undefined) {
      this.position = newPosition
    } else {
      this.game.removeGoon(this)
    }
  }
}
