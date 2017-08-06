/**
 * @typedef {Object} Point
 * @property {number} x - The X Coordinate.
 * @property {number} y - The Y Coordinate.
 */

import Grid from './grid'
import {Tower, TOWER_SIZE} from './tower'
import Goon from './goon'
import PathFinder from './path-finder'

export default class Game {
  constructor () {
    this.grid = new Grid({width: 1000, height: 600})
    this.pathFinder = new PathFinder(this.grid)
    this.towers = []
    this.goons = []
    this.highlight = undefined
    this.spawnedGoons = 0

    this.intervalId = window.setInterval(this.spawnGoons.bind(this), 800)
  }

  /**
   * When a user click a cell.
   * @param  {Point} position - Cell upper-left position.
   */
  onUserClick (position) {
    const towerCells = this.grid.getCellsAround(position, TOWER_SIZE.rows, TOWER_SIZE.cols)
    // occupied ?
    if (!towerCells || towerCells.some(cell => cell.blocked || cell.hasGoon)) {
      return
    }
    // 1: block
    towerCells.forEach(cell => { cell.blocked = true })
    // 2: recalculate paths
    this.pathFinder.recalculate()
    // 3: check if there is any goon trapped
    const goonCells = this.goons.map(goon => goon.cell)
    // TODO: check the spawn locations as well
    const trapped = goonCells.some(cell => !cell.reachable)
    // 4: if trapped, rollback
    if (trapped) {
      towerCells.forEach(cell => { cell.blocked = false })
      this.pathFinder.recalculate()
      return
    }

    const towerBoundaries = this._getCellsBoudaries(towerCells)
    const tower = new Tower(towerBoundaries)
    this.towers.push(tower)
  }

  onMouseMove (position) {
    this.mousePosition = position
  }

  updateHighlight () {
    if (!this.mousePosition) {
      return
    }
    const towerCells = this.grid.getCellsAround(this.mousePosition, TOWER_SIZE.rows, TOWER_SIZE.cols)
    if (!towerCells) {
      this.highlight = undefined
      return
    }
    const towerBoundaries = this._getCellsBoudaries(towerCells)
    const isOcuppied = towerCells.some(cell => cell.blocked || cell.hasGoon)
    this.highlight = {
      boundaries: towerBoundaries,
      valid: !isOcuppied
    }
  }

  /**
   * Spawn a new goon.
   */
  spawnGoons () {
    const NUMBER_OF_GOONS_TO_SPAWN = 10
    // TODO: Use fixed spawn locations
    const row = Math.floor(Math.random() * this.grid.rowCount)
    const col = 0
    this.spawnGoon(row, col)
    if (++this.spawnedGoons >= NUMBER_OF_GOONS_TO_SPAWN) {
      window.clearInterval(this.intervalId)
    }
  }

  spawnGoon (row, col) {
    const spawnCell = this.grid.get(row, col)
    const id = Date.now()
    const goon = new Goon(id, spawnCell, this, this.pathFinder)
    this.goons.push(goon)
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
    this.updateHighlight()
  }

  _getCellsBoudaries (cells) {
    return {
      topLeft: cells[0].getTopLeftPosition(),
      bottomRight: cells[cells.length - 1].getBottomRightPosition()
    }
  }
}
