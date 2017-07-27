/* global requestAnimationFrame */

/**
 * @typedef {Object} Point
 * @property {number} x - The X Coordinate.
 * @property {number} y - The Y Coordinate.
 */

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
  'cell': {
    'fill': 'lightgray',
    'stroke': 'gray',
    'lineWidth': 0.5
  },
  'cellHighlighted': {
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
  constructor (canvas, game) {
    this.canvas = canvas
    this.game = game
    this.context = this.canvas.getContext('2d')
    this.rowCount = Math.floor(canvas.height / CELL_EDGE_SIZE)
    this.colCount = Math.floor(canvas.width / CELL_EDGE_SIZE)
    this.cells = this.createCells()
    this.highlightedCoord = undefined

    // bind events
    this.canvas.onclick = this.onCanvasClick.bind(this)
    this.canvas.onmousemove = this.onMouseMove.bind(this)
    this.canvas.onmouseout = this.onMouseMove.bind(this)
  }

  /**
   * Start running events.
   */
  start () {
    this.animationId = requestAnimationFrame(this.tick.bind(this))
  }

  /**
   * Update state a render.
   */
  tick () {
    this.game.update()
    this.render()
    this.animationId = requestAnimationFrame(this.tick.bind(this))
  }

  /**
   * Create cells for all coordinates.
   * @return {Cell[]} cells.
   */
  createCells () {
    const cells = []
    for (let row = 0; row < this.rowCount; row++) {
      for (let col = 0; col < this.colCount; col++) {
        let position = this.getCellUpperLeftPosition(row, col)
        cells.push(new Cell(row, col, position))
      }
    }
    return cells
  }

  /**
   * Draw the grid.
   */
  render () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    // 1st layer: cells
    this.cells.forEach((cell) => {
      if (cell.isOnCoord(this.highlightedCoord)) {
        this.setContextStyle(CELL_STYLES.cellHighlighted)
      } else {
        this.setContextStyle(CELL_STYLES.cell)
      }
      this.context.fill(cell.path)
      this.context.stroke(cell.path)
    })

    // 2nd layer: towers
    this.game.towers.forEach((tower) => {
      tower.draw(this.context)
    })

    // 3rd layer: goons
    this.game.goons.forEach((goon) => {
      goon.draw(this.context)
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
    this.highlightedCoord = cell ? cell.coord : undefined
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
    this.game.onUserClick(cell.position, cell.coord)
  }

  /**
   * Get the cell start point (upper left).
   * @param  {number} row - Cell row.
   * @param  {number} col - Cell column.
   * @return {Point} Cell start point.
   */
  getCellUpperLeftPosition (row, col) {
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
