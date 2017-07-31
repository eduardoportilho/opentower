import {imageCache} from './image-cache.js'

const TOWER_SIZE =  {
  width: 50,
  height: 50
}

export default class Tower {
  constructor (cell) {
    this.cell = cell
    this.offset = {
      x: Math.round(TOWER_SIZE.width / 2),
      y: Math.round(TOWER_SIZE.height / 2)
    }
  }

  /**
   * Draw the tower on position.
   * @param  {CanvasRenderingContext2D} context - Canvas renderering context.
   */
  draw (context) {
    var img = imageCache['tower-1']
    let position = this.cell.getCenterPosition()
    context.drawImage(img, position.x - this.offset.x, position.y - this.offset.y)
  }
}
