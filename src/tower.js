import {imageCache} from './image-cache.js'

export default class Tower {
  constructor (cell) {
    this.cell = cell
  }

  /**
   * Draw the tower on position.
   * @param  {CanvasRenderingContext2D} context - Canvas renderering context.
   */
  draw (context) {
    var img = imageCache['tower-1']
    let position = this.cell.getCenterPosition()
    context.drawImage(img, position.x, position.y)
  }
}
