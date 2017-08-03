/**
 * @typedef {Object} Point
 * @property {number} x - The X Coordinate.
 * @property {number} y - The Y Coordinate.
 */

import Coord from './coord'

/**
 * Size of the (square) cell edge.
 * @type {number}
 */
export const CELL_EDGE_SIZE = 20

/**
 * Grid cell.
 */
export class Cell {
  /**
   * @param {number} row - Row number.
   * @param {number} col - Column number.
   */
  constructor (row, col) {
    this.coord = new Coord(row, col)
    this.reachable = false
    this.dist = undefined
    this.nextStep = undefined
    this.blocked = false
  }

  /**
   * Check cell coordinates.
   * @param {Coord} coord
   * @return {Boolean}
   */
  isOnCoord (coord) {
    return this.coord.equals(coord)
  }

  /**
   * Get the position of the center of the cell in pixels.
   * @return {Point}
   */
  getCenterPosition () {
    let x = Math.round((this.coord.col * CELL_EDGE_SIZE) + (CELL_EDGE_SIZE / 2))
    let y = Math.round((this.coord.row * CELL_EDGE_SIZE) + (CELL_EDGE_SIZE / 2))
    return {x, y}
  }

  /**
   * Get the top-left position of the cell in pixels.
   * @return {Point}
   */
  getTopLeftPosition () {
    let x = this.coord.col * CELL_EDGE_SIZE
    let y = this.coord.row * CELL_EDGE_SIZE
    return {x, y}
  }

  /**
   * Get the bottom-right position of the cell in pixels.
   * @return {Point}
   */
  getBottomRightPosition () {
    let x = (this.coord.col + 1) * CELL_EDGE_SIZE
    let y = (this.coord.row + 1) * CELL_EDGE_SIZE
    return {x, y}
  }
}
