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
   * @param  {Cell} cell
   * @return {Cell[]}
   */
  getUnvisitedNeighboursCells (cell) {
    const coord = cell.coord
    const grid = this
    return [
      {row: coord.row, col: coord.col - 1},
      {row: coord.row - 1, col: coord.col},
      {row: coord.row, col: coord.col + 1},
      {row: coord.row + 1, col: coord.col}
    ].filter((nCoord) => (
      nCoord.col >= 0 &&
      nCoord.col < grid.colCount &&
      nCoord.row >= 0 &&
      nCoord.row < grid.rowCount
    )).map((nCoord) => (
      grid.get(nCoord.row, nCoord.col)
    )).filter((cell) => (
      cell.dist === undefined &&
      !cell.blocked
    ))
  }

  /**
   * Get the cell that contains the provided position.
   * @return {Cell}
   */
  getCellAtPosition (point) {
    if (point.x < 0 ||
      point.x > this.canvasSize.width ||
      point.y < 0 ||
      point.y > this.canvasSize.height
    ) {
      return undefined
    }
    const col = Math.floor(point.x / CELL_EDGE_SIZE)
    const row = Math.floor(point.y / CELL_EDGE_SIZE)
    return this.get(row, col)
  }

  /**
   * Check if there is any blocked cells inside the boundaries and block them if not.
   * @param  {Boundaries} boundaries
   * @return {Boolean} true, if there were no blocked cells and could block, false otherwise.
   */
  blockIfUnblocked (boundaries) {
    const topLeftCell = this.getCellAtPosition(boundaries.topLeft)
    const bottomRightCell = this.getCellAtPosition(boundaries.bottomRight)
    // check if there is any blocked cell
    for (var row = topLeftCell.coord.row; row < bottomRightCell.coord.row; row++) {
      for (var col = topLeftCell.coord.col; col < bottomRightCell.coord.col; col++) {
        let cell = this.get(row, col)
        if (cell.blocked) {
          return false
        }
      }
    }
    // block cells
    for (var row = topLeftCell.coord.row; row < bottomRightCell.coord.row; row++) {
      for (var col = topLeftCell.coord.col; col < bottomRightCell.coord.col; col++) {
        let cell = this.get(row, col)
        cell.blocked = true
      }
    }
    return true
  }
}
