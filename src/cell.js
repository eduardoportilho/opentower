/**
 * Grid cell.
 */
class Cell {
  /**
   * @param {number} row - Row number.
   * @param {number} col - Column number.
   * @param {Path2D} path - Cell path.
   */
  constructor (row, col, path) {
    this.row = row
    this.col = col
    this.path = path
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
