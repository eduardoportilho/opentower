import {getTileConnections} from '../config/grid-config'

export default class Cell {
  constructor ({grid, row, col, tile, object, spawnSide, target, pathPoints}) {
    this.grid = grid
    this.row = row
    this.col = col
    this.tile = tile
    this.object = object
    this.spawnSide = spawnSide
    this.target = target
    this.pathPoints = pathPoints
  }

  isSpawn () {
    return this.spawnSide !== undefined
  }

  isTarget () {
    return this.target === true
  }

  getSpawnSide () {
    return this.spawnSide
  }

  getSidesWithConnection () {
    return getTileConnections(this.tile)
  }

  getCellConnectedAt (side) {
    let row = this.row
    let col = this.col
    if (side === 'north') {
      row -= 1
    } else if (side === 'south') {
      row += 1
    } else if (side === 'east') {
      col += 1
    } else if (side === 'west') {
      col -= 1
    }
    return this.grid.getCell(row, col)
  }

  getEntryPointAt (side) {
    return this.pathPoints[side]
  }

  getMiddlePathPoint () {
    return this.pathPoints['middle']
  }
}
