/**
 * @typedef {Object} Point
 * @property {number} x - The X Coordinate.
 * @property {number} y - The Y Coordinate.
 */

import Grid from './grid'
import {Tower, TOWER_SIZE} from './tower'
import Goon from './goon'
import PathFinder from './path-finder'
import random from './random'

export default class Game {
  constructor () {
    this.grid = new Grid({width: 1000, height: 600})
    this.pathFinder = new PathFinder(this.grid)
    this.towers = []
    this.goons = []
    this.highlight = undefined
    this.spawnedGoons = 0
    this.spawnCells = this.getSpawnCells()
    this.cash = 50
    this.updateCashDisplay()

    this.intervalId = window.setInterval(this.spawnGoons.bind(this), 800)
  }

  /**
   * When a user click a cell.
   * @param  {Point} position - Cell upper-left position.
   */
  onUserClick (position) {
    if (this.cash < Tower.cost) {
      // no money, no tower
      return
    }
    const towerCells = this.grid.getCellsAround(position, TOWER_SIZE.rows, TOWER_SIZE.cols)
    // occupied ?
    if (!towerCells || towerCells.some(cell => cell.blocked || cell.hasGoon)) {
      return
    }
    // 1: block
    towerCells.forEach(cell => { cell.blocked = true })
    // 2: recalculate paths
    this.pathFinder.recalculate()
    // 3: check for trapped goons and spawn locations
    const doNotTrapCells = this.goons.map(goon => goon.cell)
      .concat(this.spawnCells)
    const isInvalidPosition = doNotTrapCells.some(cell => !cell.reachable)
    // 4: if trapped, rollback
    if (isInvalidPosition) {
      towerCells.forEach(cell => { cell.blocked = false })
      this.pathFinder.recalculate()
      return
    }

    const towerBoundaries = this._getCellsBoudaries(towerCells)
    const tower = new Tower(towerBoundaries, this)
    this.towers.push(tower)
    this.cash -= Tower.cost
    this.updateCashDisplay()
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
    const location = random.getRandomElementFromArray(this.spawnCells).coord
    this.spawnGoon(location.row, location.col)
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
    this.towers.forEach((tower) => tower.update(delta))
    this.goons.forEach((goon) => goon.update(delta))
    this.updateHighlight()
  }

  updateCashDisplay () {
    document.getElementById('cash').textContent = this.cash
  }

  getSpawnCells () {
    const middle = Math.round(this.grid.rowCount / 2)
    let count = Math.min(10, Math.round(this.grid.rowCount / 3))
    let row = middle - Math.round(count / 2)
    const cells = []
    while (count-- > 0) {
      cells.push(
        this.grid.get(row++, 0)
      )
    }
    return cells
  }

  _getCellsBoudaries (cells) {
    return {
      topLeft: cells[0].getTopLeftPosition(),
      bottomRight: cells[cells.length - 1].getBottomRightPosition()
    }
  }
}
