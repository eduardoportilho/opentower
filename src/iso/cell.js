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

  getSidesWithConnection () {
    return getTileConnections(this.tile)
  }

  getCellConnectedAt (side) {}

  getEntryPointAt (side) {}

  getMiddlePathPoint () {}

  isSpawn () {}
}
