/**
 * @typedef {Object} Point
 * @property {number} x - The X Coordinate.
 * @property {number} y - The Y Coordinate.
 */

import Tower from './tower'
import Goon from './goon'
import pathFinder from './path-finder'

export default class Game {
  constructor () {
    this.towers = []
    this.goons = []
    this.spawnedGoons = 0

    this.intervalId = window.setInterval(this.spawnGoon.bind(this), 800)
  }

  /**
   * When a user lick a cell.
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
    // TODO: replace position by cell
    const spawnPosition = {
      x: 0,
      y: 100 + Math.floor(Math.random() * 400)
    }
    const id = Date.now()
    this.goons.push(new Goon(id, spawnPosition, this))
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
