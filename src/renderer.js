/* global requestAnimationFrame */

/**
 * @typedef {Object} Point
 * @property {number} x - The X Coordinate.
 * @property {number} y - The Y Coordinate.
 */

import {CELL_EDGE_SIZE} from './cell'

class Renderer {
  /**
   * Grid constructor
   * @param  {HTMLCanvasElement} canvas - HTML canvas.
   */
  constructor (canvas, game) {
    this.canvas = canvas
    this.game = game
    this.canvas.width = this.game.grid.canvasSize.width
    this.canvas.height = this.game.grid.canvasSize.height
    this.context = this.canvas.getContext('2d')

    // bind events
    this.canvas.onclick = this.onCanvasClick.bind(this)
    this.canvas.onmousemove = this.onMouseMove.bind(this)
    this.canvas.onmouseout = this.onMouseMove.bind(this)
  }

  /**
   * Start the game loop.
   */
  start () {
    this.lastTick = Date.now()
    this.animationId = requestAnimationFrame(this.tick.bind(this))
  }

  /**
   * Update state, render and restart the game loop every X ms.
   */
  tick () {
    const now = Date.now()
    const delta = (now - this.lastTick) / 1000.0

    this.game.update(delta)
    this.lastTick = now

    this.render()
    this.animationId = requestAnimationFrame(this.tick.bind(this))
  }

  /**
   * Draw the grid.
   */
  render () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    // 0: highlight
    if (this.game.highlight) {
      let stroke = 'green'
      let fill = 'lightgreen'
      if (!this.game.highlight.valid) {
        stroke = 'red'
        fill = 'lightcoral'
      }
      this._paintBoundaries(this.game.highlight.boundaries, stroke, fill)
    }

    // 1st layer: towers
    this.game.towers.forEach((tower) => {
      tower.draw(this.context)
    })

    // 2nd layer: goons
    this.game.goons.forEach((goon) => {
      goon.draw(this.context)
    })
  }

  /**
   * DEBUG: paint a blue square on blocked cells
   */
  paintBlockedCells () {
    this.context.fillStyle = 'lightskyblue'
    this.context.strokeStyle = 'azure'
    const blockedCells = this.game.grid.getCells().filter((cell) => cell.blocked)
    blockedCells.forEach((cell) => {
      let position = cell.getTopLeftPosition()
      this.context.strokeRect(position.x, position.y, CELL_EDGE_SIZE, CELL_EDGE_SIZE)
      this.context.fillRect(position.x, position.y, CELL_EDGE_SIZE, CELL_EDGE_SIZE)
    })

    this.game.towers.forEach((tower) => {
      this._paintBoundaries(tower.getBoundaries(), 'red')
    })
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
    this.game.onUserClick(mousePosition)
  }

  onMouseMove (event) {
    var mousePosition = {
      x: event.clientX - event.target.offsetLeft,
      y: event.clientY - event.target.offsetTop
    }
    this.game.onHover(mousePosition)
  }

  _paintBoundaries (boundaries, stroke, fill) {
    let position = boundaries.topLeft
    let w = boundaries.bottomRight.x - position.x
    let h = boundaries.bottomRight.y - position.y
    if (stroke) {
      this.context.strokeStyle = stroke
      this.context.strokeRect(position.x, position.y, w, h)
    }
    if (fill) {
      this.context.fillStyle = fill
      this.context.fillRect(position.x, position.y, w, h)
    }
  }
}

export default Renderer
