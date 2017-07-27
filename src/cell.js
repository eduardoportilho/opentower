/**
 * @typedef {Object} Point
 * @property {number} x - The X Coordinate.
 * @property {number} y - The Y Coordinate.
 */

import {buildSquarePath} from './square-path'
import Coord from './coord'

/**
 * Size of the (square) cell edge.
 * @type {number}
 */
const CELL_EDGE_SIZE = 50

/**
 * Grid cell.
 */
class Cell {
  /**
   * @param {number} row - Row number.
   * @param {number} col - Column number.
   * @param {Path2D} path - Cell path.
   * @param {Point} position - Cell position (upper left).
   */
  constructor (row, col, position) {
    this.coord = new Coord(row, col)
    this.position = position
    this.path = buildSquarePath(position, CELL_EDGE_SIZE)
  }

  /**
   * Check cell coordinates.
   * @param {Coord} coord
   * @return {Boolean}
   */
  isOnCoord (coord) {
    return this.coord.equals(coord)
  }
}

export default Cell
