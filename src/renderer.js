/* global requestAnimationFrame */

/**
 * @typedef {Object} Point
 * @property {number} x - The X Coordinate.
 * @property {number} y - The Y Coordinate.
 */

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
  }

  /**
   * Start the game loop.
   */
  start () {
    this.animationId = requestAnimationFrame(this.tick.bind(this))
  }

  /**
   * Update state, render and restart the game loop every X ms.
   */
  tick () {
    this.game.update()
    this.render()
    this.animationId = requestAnimationFrame(this.tick.bind(this))
  }

  /**
   * Draw the grid.
   */
  render () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
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
}

export default Renderer
