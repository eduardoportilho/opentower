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
    this.grid = new Grid({width: 1000, height: 800})
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
    // TODO:
    // (tower should be measured in cells)
    // towerCenter = position
    // cellBounds = grid.getCellBoundaries(towerCenter, TOWER_SIZE_IN_CELLS)
    // if (isOcuppied(cellBounds)) return;
    // towerBounds = {cellBounds.topLeftPos, cellBounds.bottomRightPos}
    // tower = new Tower(towerBounds)
    const tower = new Tower(position)
    const towerBoundaries = tower.getBoundaries()
    const cells = this.grid.getCellsInBoundaries(towerBoundaries)
    // occupied ?
    if (cells.some(cell => cell.blocked)) {
      return
    }
    cells.forEach((cell) => { cell.blocked = true })
    tower.cells = cells
    this.towers.push(tower)
    this.pathFinder.recalculate()
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
   * @param  {number} delta - ms since last update.
   */
  update (delta) {
    this.goons.forEach((goon) => goon.update(delta))
  }
}
