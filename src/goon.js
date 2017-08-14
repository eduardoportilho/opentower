import {imageCache} from './image-cache.js'
import {getPointInLine} from './geometry-utils'

const GOON_IMAGE_SIZE = {
  width: 14,
  height: 20
}

export default class Goon {
  constructor (id, initialCell, game, pathFinder) {
    this.id = id
    this.game = game
    this.pathFinder = pathFinder
    this.cell = initialCell
    this.cell.hasGoon = true
    this.position = this.cell.getTopLeftPosition()
    this.speed = 20 // px/sec
    this.life = 100
    this.bounty = 20

    // store the decimals lost in the last step to maintain constant speed
    this._residualStep = 0
  }

  /**
   * Draw the goon on position.
   * @param  {CanvasRenderingContext2D} context - Canvas renderering context.
   */
  draw (context) {
    // _Paint cell base:
    // context.fillStyle = 'gold'
    // const cellOrigin = this.cell.getTopLeftPosition()
    // context.fillRect(cellOrigin.x, cellOrigin.y, CELL_EDGE_SIZE, CELL_EDGE_SIZE)

    const img = imageCache['goon-1']
    context.drawImage(img, this.position.x, this.position.y - Math.round(GOON_IMAGE_SIZE.height / 2))
    this.drawLifeBar(context)
  }

  drawLifeBar (context) {
    const height = 4
    const width = 20
    const greenWidth = Math.max(0, Math.round(width * this.life / 100))
    const redWidth = width - greenWidth

    const y = this.position.y - 20
    const greenX = this.position.x
    const redX = this.position.x + greenWidth

    context.fillStyle = 'green'
    context.fillRect(greenX, y, greenWidth, height)
    context.fillStyle = 'red'
    context.fillRect(redX, y, redWidth, height)
  }

  /**
   * Update goon state.
   * @param  {number} delta - ms since last update.
   */
  update (delta) {
    this.updatePosition(delta)
    this.updateLife(delta)
  }

  updateLife (delta) {
    if (this.life <= 0) {
      this.game.killGoon(this)
    }
  }

  updatePosition (delta) {
    this.cell.hasGoon = false
    const nextCell = this.pathFinder.nextCell(this.cell, 1)
    if (!nextCell) {
      throw new Error('Goon traped!')
      //this.game.goonArrived(this)
      //return
    }

    const offset = this.cell.getOffset(this.position)
    const targetPosition = {
      x: nextCell.getTopLeftPosition().x + offset.x,
      y: nextCell.getTopLeftPosition().y + offset.y
    }

    const step = (this.speed * delta / 1000.0) + this._residualStep
    const intStep = Math.floor(step)
    this._residualStep = step - intStep

    const nextPosition = getPointInLine(this.position, targetPosition, intStep)
    // Might happen that step is not enought to change cell
    const nextPositionCell = this.game.grid.getCellAtPosition(nextPosition)

    if (nextPositionCell.isTarget) {
      this.game.goonArrived(this)
    } else {
      this.cell = nextPositionCell
      this.cell.hasGoon = true
      this.position = nextPosition
    }
  }
}
