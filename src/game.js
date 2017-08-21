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
import ScoreBoard from './score-board.js'
import Renderer from './renderer.js'

let gameSingleton

export function initGame (canvas, scoreBoard) {
  if (!gameSingleton) {
    gameSingleton = new Game(canvas, scoreBoard)
  }
  return gameSingleton
}

export function getGame () {
  if (!gameSingleton) {
    throw new Error('Game not initialized')
  }
  return gameSingleton
}

class Game {
  constructor (canvas, scoreBoard) {
    this.canvas = canvas
    this.scoreBoard = scoreBoard
    this.towers = []
    this.goons = []
    this.highlight = undefined
    this.spawnedGoonCount = 0
    this.cash = gameConfig.initialCash
    this.goonsInside = 0
    this._isPaused = false
  }

  _init () {
    this.grid = new Grid({width: 1000, height: 600})
    this.pathFinder = new PathFinder(this.grid)
    this.goonWave = new GoonWave()
    this.scoreBoard = new ScoreBoard(this.scoreBoard)
    this.renderer = new Renderer(this.canvas)
    this.cellsWhereGoonCanSpawn = this.getCellsWhereGoonCanSpawn()
    this.gameInitialized = true
  }

  start () {
    if (!this.gameInitialized) {
      this._init()
    }
    this.renderer.start()
  }

  stop () {
    this.renderer.stop()
  }

  endGame (won) {
    this.stop()
    this.scoreBoard.updateMessage(won ? 'You won!' : 'You lost!')
  }

  onWavesEnd () {
    this.wavesEnded = true
  }

  pauseResume () {
    this._isPaused = !this._isPaused
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
      .concat(this.cellsWhereGoonCanSpawn)
    const isInvalidPosition = doNotTrapCells.some(cell => !cell.reachable)
    // 4: if trapped, rollback
    if (isInvalidPosition) {
      towerCells.forEach(cell => { cell.blocked = false })
      this.pathFinder.recalculate()
      return
    }

    const towerBoundaries = this._getCellsBoudaries(towerCells)
    const tower = new Tower(towerBoundaries)
    this.towers.push(tower)
    this.cash -= Tower.cost
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
    const spawnCell = random.getRandomElementFromArray(this.cellsWhereGoonCanSpawn)
    goon.setInitialCell(spawnCell)
    this.goons.push(goon)
  }

  killGoon (goon) {
    this.cash += goon.bounty
    this.removeGoon(goon)
  }

  goonArrived (goon) {
    this.goonsInside++
    this.removeGoon(goon)

    if (this.goonsInside >= 5) {
      this.endGame(false)
    }
  }

  removeGoon (goon) {
    const index = this.goons.findIndex((aGoon) => aGoon.id === goon.id)
    if (index >= 0) {
      this.goons.splice(index, 1)
    }
    if (this.goons.length <= 0 && this.wavesEnded) {
      this.endGame(true)
    }
  }

  /**
   * Update the state of the game entities.
   * @param  {number} delta - ms since last update.
   */
  update (delta) {
    if (!this._isPaused) {
      this.goonWave.update(delta)
      this.towers.forEach((tower) => tower.update(delta))
      this.goons.forEach((goon) => goon.update(delta))
    }
    this.updateHighlight()
    this.scoreBoard.update()
  }

  getCellsWhereGoonCanSpawn () {
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
