/**
 * @typedef {Object} CellData
 * @property {number} x - The X Coordinate.
 * @property {number} y - The Y Coordinate.
 * @property {number} dist - Number of steps until target.
 * @property {number} nextStep - Next cell on the path to target.
 */

export default class Grid {
  constructor (xMax, yMax) {
    this.xMax = xMax
    this.yMax = yMax
  }

  /**
   * Reset grid data.
   */
  reset () {
    this.grid = new Array(this.xMax + 1)
    for (let x = 0; x <= this.xMax; x++) {
      this.grid[x] = new Array(this.yMax + 1)
    }
  }

  /**
   * Get cell data at position.
   * @param  {number} x - X coordinate.
   * @param  {number} y - Y coordinate.
   * @return {CellData}
   */
  get (x, y) {
    return this.grid[x][y]
  }

  /**
   * Set cell data at position.
   * @param {CellData} data
   */
  set ({x, y, dist, nextStep}) {
    this.grid[x][y] = {x, y, dist, nextStep}
  }

  /**
   * Get the coordinates of the uninitialized neighbours of the position.
   * @param  {Point} position
   * @return {Point[]}
   */
  getUnvisitedNeighboursCoords (position) {
    return [
      {x: position.x - 1, y: position.y},
      {x: position.x, y: position.y - 1},
      {x: position.x + 1, y: position.y},
      {x: position.x, y: position.y + 1}
    ].filter((nPos) => (
      nPos.x >= 0 &&
      nPos.x <= this.xMax &&
      nPos.y >= 0 &&
      nPos.y <= this.yMax &&
      this.get(nPos.x, nPos.y) === undefined
    ))
  }
}
