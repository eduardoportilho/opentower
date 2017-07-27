/**
 * @typedef {Object} Point
 * @property {number} x - The X Coordinate.
 * @property {number} y - The Y Coordinate.
 */

import Tower from './tower'
import Goon from './goon'

export default class Game {
  constructor () {
    this.towers = []
    this.goons = []
    this.occupiedCoords = []

    this.intervalId = window.setInterval(this.spawnGoon.bind(this), 800)
  }

  /**
   * When a user lick a cell.
   * @param  {Point} position - Cell upper-left position.
   * @param  {Coord} coord - Cell coordinates.
   */
  onUserClick (position, coord) {
    const isOccupied = this.occupiedCoords.some((occupied) => occupied.equals(coord))
    if (!isOccupied) {
      this.occupiedCoords.push(coord)
      this.towers.push(new Tower(position))
    }
  }

  /**
   * Spawn a new goon.
   */
  spawnGoon () {
    const spawnPosition = {
      x: 100 + Math.floor(Math.random() * 400),
      y: 0
    }
    this.goons.push(new Goon(spawnPosition))
    if (this.goons.length >= 10) {
      window.clearInterval(this.intervalId)
    }
  }

  /**
   * Update the state of the game entities.
   */
  update () {
    this.goons.forEach((goon) => goon.update())
  }
}
