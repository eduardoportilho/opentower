import {getTileConnections} from '../utils/tile-utils'
import {FLOOR_HEIGHT} from  './iso-grid'

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
    this.origin = this.grid.isoGridUtils.getCellOrigin(this.row, this.col, FLOOR_HEIGHT)
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
    if (
      row < 0 ||
      row >= this.grid.rowCount ||
      col < 0 ||
      col >= this.grid.colCount
      ) {
      return undefined
    }
    return this.grid.getCell(row, col)
  }

  getEntryPointAt (side) {
    const entryPoint = this.pathPoints[side]
    return {
      x: entryPoint.x + this.origin.x,
      y: entryPoint.y + this.origin.y
    }
  }

  getMiddlePathPoint () {
    return this.pathPoints['middle']
  }
}
