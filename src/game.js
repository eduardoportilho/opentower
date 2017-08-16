/**
 * @typedef {Object} Point
 * @property {number} x - The X Coordinate.
 * @property {number} y - The Y Coordinate.
 */

import Grid from './grid'
import Tower from './tower'
import GoonWave from './goon-wave'
import PathFinder from './path-finder'
import random from './random'
import gameConfig from './game-config.js'

export default class Game {
  constructor () {
    this.grid = new Grid({width: 1000, height: 600})
    this.pathFinder = new PathFinder(this.grid)
    this.towers = []
    this.goons = []
    this.highlight = undefined
    this.spawnedGoonCount = 0
    this.spawnCells = this.getSpawnCells()

    this.cash = gameConfig.initialCash
    this.updateCashDisplay()

    this.goonsInside = 0
    this.updateGoonsInsideDisplay()

    this.goonWave = new GoonWave(this)
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
    const towerCells = this.grid.getCellsAround(position, Tower.sizeInCells.rows, Tower.sizeInCells.cols)
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
    const towerCells = this.grid.getCellsAround(
      this.mousePosition,
      Tower.sizeInCells.rows,
      Tower.sizeInCells.cols
    )
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
  spawnGoon (goon) {
    const spawnCell = random.getRandomElementFromArray(this.spawnCells)
    goon.setInitialCell(spawnCell)
    this.goons.push(goon)
  }

  killGoon (goon) {
    this.cash += goon.bounty
    this.removeGoon(goon)
    this.updateCashDisplay()
  }

  goonArrived (goon) {
    this.goonsInside++
    this.updateGoonsInsideDisplay()
    this.removeGoon(goon)
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
    this.goonWave.update(delta)
    this.towers.forEach((tower) => tower.update(delta))
    this.goons.forEach((goon) => goon.update(delta))
    this.updateHighlight()
  }

  updateCashDisplay () {
    document.getElementById('cash').textContent = this.cash
  }

  updateGoonsInsideDisplay () {
    document.getElementById('goons-inside').textContent = this.goonsInside
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
