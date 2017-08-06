import {imageCache} from './image-cache.js'

export default class Goon {
  constructor (id, initialCell, game, pathFinder) {
    this.id = id
    this.game = game
    this.pathFinder = pathFinder
    this.cell = initialCell
    this.cell.hasGoon = true
    this.position = this.cell.getTopLeftPosition()
    this.speed = 60 // px/sec
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
    this.cell.hasGoon = false
    const nextCell = this.pathFinder.nextCell(this.cell, 1)
    if (!nextCell) {
      this.game.removeGoon(this)
      return
    }

    const offset = this.cell.getOffset(this.position)
    const targetPosition = {
      x: nextCell.getTopLeftPosition().x + offset.x,
      y: nextCell.getTopLeftPosition().y + offset.y
    }

    const stepSize = this.speed * delta / 1000.0
    const nextPosition = this.calculateNextPosition(this.position, targetPosition, stepSize)
    // Might happen that stepSize is not enought to change cell
    const nextPositionCell = this.game.grid.getCellAtPosition(nextPosition)
    console.log(`NP:`, nextPosition)

    if (nextPositionCell) {
      this.cell = nextPositionCell
      this.cell.hasGoon = true
      this.position = nextPosition
    } else {
      this.game.removeGoon(this)
    }
  }

  /**
   * Given the current and target position and the size of a step, calculate the new position after one step.
   * @param  {Point} current - Current position.
   * @param  {Point} target - Target position.
   * @param  {number} stepSize - Size of the step (in pixels).
   * @return {Point} Position after one step.
   */
  calculateNextPosition (current, target, stepSize) {
    // TODO: check this logic for negative dy
    const dx = target.x - current.x
    const dy = target.y - current.y
    const hyp = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
    const sin = dy / hyp
    const cos = dx / hyp

    const dyStep = sin * stepSize
    const dxStep = cos * stepSize

    const nextX = Math.ceil(current.x + dxStep)
    const nextY = Math.ceil(current.y + dyStep)
    return {x: nextX, y: nextY}
  }
}
