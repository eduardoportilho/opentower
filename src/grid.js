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

import {buildSquarePath} from './square-path'
import Cell from './cell'

/**
 * Size of the (square) cell edge.
 * @type {number}
 */
const CELL_EDGE_SIZE = 50

/**
 * Style for cell type
 * @type {Object}
 */
const CELL_STYLES = {
  'default': {
    'fill': 'lightgray',
    'stroke': 'gray',
    'lineWidth': 0.5
  },
  'highlight': {
    'fill': 'gray',
    'stroke': 'lightgray',
    'lineWidth': 0.5
  }
}

class Grid {
  /**
   * Grid constructor
   * @param  {HTMLCanvasElement} canvas - HTML canvas.
   */
  constructor (canvas) {
    this.canvas = canvas
    this.context = this.canvas.getContext('2d')
    this.rowCount = Math.floor(canvas.height / CELL_EDGE_SIZE)
    this.colCount = Math.floor(canvas.width / CELL_EDGE_SIZE)
    this.cells = this.createCells()
    this.highlightedCoord = undefined
    this.onclick = undefined

    // bind events
    this.canvas.onclick = this.onCanvasClick.bind(this)
    this.canvas.onmousemove = this.onMouseMove.bind(this)
    this.canvas.onmouseout = this.onMouseMove.bind(this)
  }

  /**
   * Create cells for all coordinates.
   * @return {Cell[]} cells.
   */
  createCells () {
    const cells = []
    for (let row = 0; row < this.rowCount; row++) {
      for (let col = 0; col < this.colCount; col++) {
        let cellStartPosition = this.getCellStartPosition(row, col)
        let path = buildSquarePath(cellStartPosition, CELL_EDGE_SIZE)
        cells.push(new Cell(row, col, path))
      }
    }
    return cells
  }

  /**
   * Draw the grid.
   */
  draw () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.cells.forEach((cell) => {
      if (cell.isOnCoord(this.highlightedCoord)) {
        this.setContextStyle(CELL_STYLES.highlight)
      } else {
        this.setContextStyle(CELL_STYLES.default)
      }
      this.context.fill(cell.path)
      this.context.stroke(cell.path)
    })
  }

  /**
   * Set highlighted cell on mouse move.
   * @param {MouseEvent} event
   */
  onMouseMove (event) {
    var mousePosition = {
      x: event.clientX - event.target.offsetLeft,
      y: event.clientY - event.target.offsetTop
    }
    const cell = this.getCellAtPosition(mousePosition)
    this.highlightedCoord = cell ? cell.getCoord() : undefined
    this.draw()
  }

  /**
   * Trigger onclick on canvas click.
   * @param {MouseEvent} event
   */
  onCanvasClick (event) {
    var mousePosition = {
      x: event.clientX - event.target.offsetLeft,
      y: event.clientY - event.target.offsetTop
    }
    const cell = this.getCellAtPosition(mousePosition)
    this.onclick && this.onclick(cell)
  }

  /**
   * Get the cell start point (upper left).
   * @param  {number} row - Cell row.
   * @param  {number} col - Cell column.
   * @return {Point} Cell start point.
   */
  getCellStartPosition (row, col) {
    return {
      x: col * CELL_EDGE_SIZE,
      y: row * CELL_EDGE_SIZE
    }
  }

  /**
   * Get cell at position.
   * @param  {number} x
   * @param  {number} y
   * @return {Cell} Cell or undefined.
   */
  getCellAtPosition ({x, y}) {
    return this.cells.find((cell) => this.context.isPointInPath(cell.path, x, y))
  }

  /**
   * Set context style.
   * @param {string} fill - Fill color.
   * @param {string} stroke - Stroke color.
   * @param {number} lineWidth - Line width.
   */
  setContextStyle ({fill, stroke, lineWidth}) {
    this.context.lineWidth = lineWidth
    this.context.fillStyle = fill
    this.context.strokeStyle = stroke
  }
}

export default Grid
