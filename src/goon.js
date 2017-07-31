import {imageCache} from './image-cache.js'

export default class Goon {
  constructor (id, cell, game, pathFinder) {
    this.id = id
    this.cell = cell
    this.game = game
    this.pathFinder = pathFinder
    this.stepsPerUpdate = 1
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
   */
  update () {
    let newCell = this.pathFinder.nextCell(this.cell, this.stepsPerUpdate)
    if (newCell) {
      this.cell = newCell
    } else {
      this.game.removeGoon(this)
    }
  }
}
