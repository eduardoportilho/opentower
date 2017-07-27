import {imageCache} from './image-cache.js'

/**
 * Point where the goons are heading to.
 * @type {Object}
 */
const GOON_TARGET_POSITION = {
  x: 600,
  y: 100
}

/**
 * Number of steps to complete the arena.
 * @type {Number}
 */
const STEP_COUNT = 400

export default class Goon {
  constructor (position) {
    this.position = position
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
    this.position = {
      x: this.position.x + this.stepX,
      y: this.position.y + this.stepY
    }
  }
}
