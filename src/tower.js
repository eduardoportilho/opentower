import {imageCache} from './image-cache.js'

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

const TOWER_SIZE = {
  width: 34,
  height: 46
}

// const TOWER_SIZE_IN_CELLS = {
//   width: 2,
//   height: 2
// }

export default class Tower {
  constructor (centerPosition) {
    this.topLeftPosition = {
      x: Math.max(0, centerPosition.x - Math.round(TOWER_SIZE.width / 2)),
      y: Math.max(0, centerPosition.y - Math.round(TOWER_SIZE.height / 2))
    }
    this.bottomRightPosition = {
      x: this.topLeftPosition.x + TOWER_SIZE.width,
      y: this.topLeftPosition.y + TOWER_SIZE.height
    }
    this.cells = undefined
  }

  /**
   * Draw the tower on position.
   * @param  {CanvasRenderingContext2D} context - Canvas renderering context.
   */
  draw (context) {
    var img = imageCache['tower-1']
    context.drawImage(img, this.topLeftPosition.x, this.topLeftPosition.y)
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
