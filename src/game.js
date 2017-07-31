/**
 * @typedef {Object} Point
 * @property {number} x - The X Coordinate.
 * @property {number} y - The Y Coordinate.
 */

import Grid from './grid'
import Tower from './tower'
import Goon from './goon'
import PathFinder from './path-finder'

export default class Game {
  constructor () {
    this.grid = new Grid({width: 600, height: 600})
    this.pathFinder = new PathFinder(this.grid)
    this.towers = []
    this.goons = []
    this.spawnedGoons = 0

    this.intervalId = window.setInterval(this.spawnGoon.bind(this), 800)
  }

  /**
   * When a user click a cell.
   * @param  {Point} position - Cell upper-left position.
   */
  onUserClick (position) {
    // TODO: get cell at position
    this.towers.push(new Tower(position))
    pathFinder.recalculate()
  }

  /**
   * Spawn a new goon.
   */
  spawnGoon () {
    const spawnCoords = {
      row: Math.floor(Math.random() * this.grid.rowCount),
      col: 0
    }
    const spawnCell = this.grid.get(spawnCoords.row, spawnCoords.col)
    const id = Date.now()
    const goon = new Goon(id, spawnCell, this, this.pathFinder)
    this.goons.push(goon)
    if (++this.spawnedGoons >= 10) {
      window.clearInterval(this.intervalId)
    }
  }

  removeGoon (goon) {
    const index = this.goons.findIndex((aGoon) => aGoon.id === goon.id)
    if (index >= 0) {
      this.goons.splice(index, 1)
    }
  }

  /**
   * Update the state of the game entities.
   */
  update () {
    this.goons.forEach((goon) => goon.update())
  }
}
