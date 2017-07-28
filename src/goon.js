import {imageCache} from './image-cache.js'
import pathFinder from './path-finder'

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
    this.stepsPerUpdate = 3
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
    let newPosition = pathFinder.nextPosition(this.position, this.stepsPerUpdate)
    if (newPosition) {
      this.position = newPosition
    } else {
      this.game.removeGoon(this)
    }
  }
}
