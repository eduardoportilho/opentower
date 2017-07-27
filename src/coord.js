export default class Coord {
  /**
   * @param {number} row
   * @param {number} col
   */
  constructor (row, col) {
    this.row = row
    this.col = col
  }

  /**
   * Compare two coordinates.
   * @param {Coord} coord
   * @return {Boolean}
   */
  equals (coord) {
    return coord && this.row === coord.row && this.col === coord.col
  }
}
