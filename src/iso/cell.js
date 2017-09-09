export default class Cell {
  constructor ({row, col, tile, object, spawn = false, target = false}) {
    this.row = row
    this.col = col
    this.tile = tile
    this.object = object
    this.spawn = spawn
    this.target = target
  }
}
