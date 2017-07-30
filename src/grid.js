/**
 * @typedef {Object} CellData
 * @property {number} x - The X Coordinate.
 * @property {number} y - The Y Coordinate.
 * @property {number} dist - Number of steps until target.
 * @property {number} nextStep - Next cell on the path to target.
 */

import {Cell, CELL_EDGE_SIZE} from './cell'

export default class Grid {
  constructor (canvasSize) {
    this.canvasSize = canvasSize
    this.colCount = Math.floor(canvasSize.width / CELL_EDGE_SIZE)
    this.rowCount = Math.floor(canvasSize.height / CELL_EDGE_SIZE)
    this.init()
  }

  init () {
    this.grid = new Array(this.rowCount)
    for (var row = 0; row < this.rowCount; row++) {
      this.grid[row] = Array(this.colCount)
      for (var col = 0; col < this.colCount; col++) {
        this.grid[row][col] = new Cell(row, col)
      }
    }
  }

  /**
   * Reset grid data.
   */
  reset () {
    for (var row = 0; row < this.rowCount; row++) {
      for (var col = 0; col < this.colCount; col++) {
        this.grid[row][col].reachable = false
        this.grid[row][col].dist = undefined
        this.grid[row][col].nextStep = undefined
      }
    }
  }

  /**
   * Get cell at position.
   * @param  {number} x - X coordinate.
   * @param  {number} y - Y coordinate.
   * @return {Cell}
   */
  get (row, col) {
    return this.grid[row][col]
  }
  /**
   * Get target cell.
   * @return {Cell}
   */
  getTarget () {
    let row = Math.round(this.rowCount / 2)
    let col = this.colCount - 1
    return this.get(row, col)
  }

  /**
   * Get the unvisited neighbour cells of the position.
   * @param  {Point} position
   * @return {Cell[]}
   */
  getUnvisitedNeighboursCells (coord) {
    return [
      {row: coord.row, col: coord.col - 1},
      {row: coord.row - 1, col: coord.col},
      {row: coord.row, col: coord.col + 1},
      {row: coord.row + 1, col: coord.col}
    ].filter((nCoord) => (
      nCoord.col >= 0 &&
      nCoord.col < this.colCount &&
      nCoord.row >= 0 &&
      nCoord.row < this.rowCount
    )).map((nCoord) => (
      this.get(nCoord.row, nCoord.col)
    )).filter((cell) => cell.dist === undefined)
  }
}
