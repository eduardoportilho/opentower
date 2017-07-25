// ROADMAP:
// ✔︎ - expose draw method
// ✔︎ - draw grid
// - draw object's paths (or call object draw)
//  - towers
//  - goons
//  - bullets?
// - receive user click and call game methods

/**
 * @typedef {Object} Point
 * @property {number} x The X Coordinate
 * @property {number} y The Y Coordinate
 */

import {buildSquarePath} from './square-path'

/**
 * Size of the (square) cell edge.
 * @type {number}
 */
const CELL_EDGE_SIZE = 50

class Grid {
  /**
   * Grid constructor
   * @param  {HTMLCanvasElement} canvas - HTML canvas.
   */
  constructor (canvas) {
    this.canvas = canvas
    this.rowCount = Math.floor(canvas.height / CELL_EDGE_SIZE)
    this.colCount = Math.floor(canvas.width / CELL_EDGE_SIZE)
  }

  /**
   * Draw the grid.
   */
  draw () {
    const context = this.canvas.getContext('2d')

    context.clearRect(0, 0, this.canvas.width, this.canvas.height)

    context.lineWidth = 0.5
    context.fillStyle = 'lightgray'
    context.strokeStyle = 'gray'
    for (let row = 0; row < this.rowCount; row++) {
      for (let col = 0; col < this.rowCount; col++) {
        let cellStartPosition = this.getCellStartPoint(row, col)
        let path = buildSquarePath(cellStartPosition, CELL_EDGE_SIZE)
        context.fill(path)
        context.stroke(path)
      }
    }
  }

  /**
   * Get the cell start point (upper left).
   * @param  {number} row - Cell row.
   * @param  {number} col - Cell column.
   * @return {Point} Cell start point.
   */
  getCellStartPoint (row, col) {
    return {
      x: col * CELL_EDGE_SIZE,
      y: row * CELL_EDGE_SIZE
    }
  }
}

export default Grid
