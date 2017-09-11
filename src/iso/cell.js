import {getTileConnections} from '../config/grid-config'

export default class Cell {
  constructor ({grid, row, col, tile, object, spawn, target, pathPoints}) {
    this.grid = grid
    this.row = row
    this.col = col
    this.tile = tile
    this.object = object
    this.spawn = spawn
    this.target = target
    this.pathPoints = pathPoints
  }

  isSpawn () {
    return this.spawn
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

  getEntryPointAt (side) {}

  getMiddlePathPoint () {}
}
