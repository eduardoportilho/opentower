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
    // flatten all cells on a single array
    this.allCells = [].concat.apply([], this.grid)
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
    ].filter(coord => (
      !this._isOutOfGrid(coord)
    )).map(coord => (
      grid.get(coord.row, coord.col)
    )).filter(cell => (
      cell.dist === undefined &&
      !cell.blocked
    ))
  }

  /**
   * Get the cell that contains the provided position.
   * @param  {Point} point
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
   * Get the cells that contains the boundaries area.
   * @param  {Boundaries} boundaries
   * @return {Cell[]}
   */
  getCellsInBoundaries (boundaries) {
    const topLeftCell = this.getCellAtPosition(boundaries.topLeft)
    const bottomRightCell = this.getCellAtPosition(boundaries.bottomRight)
    const cells = []
    for (let row = topLeftCell.coord.row; row <= bottomRightCell.coord.row; row++) {
      for (let col = topLeftCell.coord.col; col <= bottomRightCell.coord.col; col++) {
        cells.push(this.get(row, col))
      }
    }
    return cells
  }

  /**
   * Return an array containing all cells.
   * @return {Cell[]}
   */
  getCells () {
    return this.allCells
  }

  /**
   * Return a block of cells containg the point approximately in the center
   * @param  {Point} point - Point contained in the block,
   * @param  {number} rowCount - Number of rows in the block.
   * @param  {number} colCount - Number of cols in the block.
   * @return {Cell[]}
   */
  getCellsAround (point, rowCount, colCount) {
    const center = this.getCellAtPosition(point)
    if (!center) {
      return undefined
    }
    const topRow = center.coord.row - Math.floor(rowCount / 2)
    const bottomRow = topRow + rowCount - 1
    const leftCol = center.coord.col - Math.floor(colCount / 2)
    const rightCol = leftCol + colCount - 1
    if (this._isOutOfGrid({row: topRow, col: leftCol}) ||
      this._isOutOfGrid({row: bottomRow, col: rightCol})) {
      return undefined
    }

    const cells = []
    for (let row = topRow; row <= bottomRow; row++) {
      for (let col = leftCol; col <= rightCol; col++) {
        cells.push(this.get(row, col))
      }
    }
    return cells
  }

  /**
   * Check if a coordinate is out of the grid.
   * @param  {Coord} coord
   * @return {Boolean}       [description]
   */
  _isOutOfGrid (coord) {
    return coord.col < 0 ||
      coord.col >= this.colCount ||
      coord.row < 0 ||
      coord.row >= this.rowCount
  }
}
