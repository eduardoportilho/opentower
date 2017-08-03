import {imageCache} from './image-cache.js'

const PIXELS_PER_STEP = 2

export default class Goon {
  constructor (id, cell, game, pathFinder) {
    this.id = id
    this.game = game
    this.pathFinder = pathFinder
    this.timeSinceLastStep = 0
    this.cell = cell
    this.position = this.cell.getTopLeftPosition()
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
   * @param  {number} delta - ms since last update.
   */
  update (delta) {
    const nextCell = this.pathFinder.nextCell(this.cell, 1)
    if (!nextCell) {
      this.game.removeGoon(this)
      return
    }

    const targetPosition = nextCell.getTopLeftPosition()
    const nextPosition = this.calculateNextPosition(this.position, targetPosition, PIXELS_PER_STEP)
    const nextPositionCell = this.game.grid.getCellAtPosition(nextPosition)

    if (nextPositionCell) {
      this.cell = nextPositionCell
      this.position = nextPosition
    } else {
      this.game.removeGoon(this)
    }
  }

  /**
   * Given the current and target position and the size of a step, calculate the new position after one step.
   * @param  {Point} current - Current position.
   * @param  {Point} target - Target position.
   * @param  {number} step - Size of the step (in pixels).
   * @return {Point} Position after one step.
   */
  calculateNextPosition (current, target, step) {
    // TODO: check this logic for negative dy
    const dx = target.x - current.x
    const dy = target.y - current.y
    const hyp = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
    const sin = dy / hyp
    const cos = dx / hyp

    const dyStep = sin * step
    const dxStep = cos * step

    const nextX = Math.round(current.x + dxStep)
    const nextY = Math.round(current.y + dyStep)
    return {x: nextX, y: nextY}
  }
}
