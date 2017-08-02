import {imageCache} from './image-cache.js'

const STEPS_PER_UPDATE = 1
const MIN_TIME_BETWEEN_STEPS = 0.2

export default class Goon {
  constructor (id, cell, game, pathFinder) {
    this.id = id
    this.cell = cell
    this.game = game
    this.pathFinder = pathFinder
    this.timeSinceLastStep = 0
  }

  /**
   * Draw the goon on position.
   * @param  {CanvasRenderingContext2D} context - Canvas renderering context.
   */
  draw (context) {
    var img = imageCache['goon-1']
    let position = this.cell.getCenterPosition()
    context.drawImage(img, position.x, position.y)
  }

  /**
   * Update goon state.
   * @param  {number} delta - ms since last update.
   */
  update (delta) {
    this.timeSinceLastStep += delta
    if (this.timeSinceLastStep < MIN_TIME_BETWEEN_STEPS) {
      return
    }

    this.timeSinceLastStep = 0
    let newCell = this.pathFinder.nextCell(this.cell, STEPS_PER_UPDATE)
    if (newCell) {
      this.cell = newCell
    } else {
      this.game.removeGoon(this)
    }
  }
}
