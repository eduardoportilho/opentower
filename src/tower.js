/**
 * @typedef {Object} Point
 * @property {number} x - The X Coordinate.
 * @property {number} y - The Y Coordinate.
 */

/**
 * @typedef {Object} Boundaries
 * @property {Point} topLeft - top-left point of the object.
 * @property {Point} bottomRight - bottom-right point of the object.
 */
export const TOWER_SIZE = {
  rows: 2,
  cols: 2
}

export class Tower {
  constructor (boundaries) {
    this.topLeftPosition = boundaries.topLeft
    this.width = boundaries.bottomRight.x - boundaries.topLeft.x
    this.height = boundaries.bottomRight.y - boundaries.topLeft.y
  }

  /**
   * Draw the tower on position.
   * @param  {CanvasRenderingContext2D} context - Canvas renderering context.
   */
  draw (context) {
    context.fillStyle = 'lightgray'
    context.strokeStyle = 'dimgray'
    context.fillRect(this.topLeftPosition.x, this.topLeftPosition.y, this.width, this.height)
    context.strokeRect(this.topLeftPosition.x, this.topLeftPosition.y, this.width, this.height)
  }

  /**
   * Get to top-left and bottom-right points of the tower.
   * @return {Boundaries}
   */
  getBoundaries () {
    return {
      'topLeft': this.topLeftPosition,
      'bottomRight': this.bottomRightPosition
    }
  }
}
