export default class IsoGridUtils {
  constructor (cellWidth, cellHeight, gridOrigin) {
    this.cellWidth = cellWidth
    this.cellHeight = cellHeight
    this.gridOrigin = gridOrigin
  }

  getCellOrigin (row, col) {
    // http://clintbellanger.net/articles/isometric_math/
    const halfHeigth = Math.round(this.cellHeight / 2)
    const halfWidth = Math.round(this.cellWidth / 2)
    return {
      x: (col - row) * halfWidth + this.gridOrigin.x,
      y: (col + row) * halfHeigth + this.gridOrigin.y
    }
  }

  getCellCorners (row, col) {
    const cellOrigin = this.getCellOrigin(row, col)
    const halfHeigth = Math.round(this.cellHeight / 2)
    const halfWidth = Math.round(this.cellWidth / 2)
    return [
      cellOrigin,
      {x: cellOrigin.x + halfWidth, y: cellOrigin.y + halfHeigth},
      {x: cellOrigin.x, y: cellOrigin.y + this.cellHeight},
      {x: cellOrigin.x - halfWidth, y: cellOrigin.y + halfHeigth}
    ]
  }

  getCellBottom (row, col) {
    const origin = this.getCellOrigin(row, col)
    return {
      x: origin.x,
      y: origin.y + this.cellHeight
    }
  }
}
