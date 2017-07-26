/**
 * @typedef {Object} Point
 * @property {number} x - The X Coordinate.
 * @property {number} y - The Y Coordinate.
 */

/**
 * @typedef {Object} Coord
 * @property {number} row - The row Coordinate.
 * @property {number} col - The column Coordinate.
 */

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
  constructor (row, col, path, position) {
    this.row = row
    this.col = col
    this.path = path
    this.position = position
  }

  /**
   * Cell coordinate.
   * @return {Coord}
   */
  getCoord () {
    return {
      row: this.row,
      col: this.col
    }
  }

  /**
   * Check cell coordinates.
   * @param {Coord} coord
   * @return {Boolean}
   */
  isOnCoord (coord) {
    return coord && this.row === coord.row && this.col === coord.col
  }
}

export default Cell
