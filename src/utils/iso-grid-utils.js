export default class IsoGridUtils {
  constructor (cellWidth, cellHeight, gridOrigin) {
    this.cellWidth = cellWidth
    this.cellHeight = cellHeight
    this.gridOrigin = gridOrigin
  }

  /**
   * Top (top-left) corner position for the cell.
   * @param  {number} row
   * @param  {number} col
   * @return {Position} {x, y}
   */
  getCellOrigin (row, col) {
    // http://clintbellanger.net/articles/isometric_math/
    const halfHeigth = Math.round(this.cellHeight / 2)
    const halfWidth = Math.round(this.cellWidth / 2)
    return {
      x: (col - row) * halfWidth + this.gridOrigin.x,
      y: (col + row) * halfHeigth + this.gridOrigin.y
    }
  }

  /**
   * Top, right, bottom and left corner positions for the cell.
   * @param  {number} row
   * @param  {number} col
   * @return {Position[]} [{x, y}]
   */
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

  /**
   * Bottom (bottom-right) corner position for the cell.
   * @param  {number} row
   * @param  {number} col
   * @return {Position} {x, y}
   */
  getCellBottom (row, col) {
    const origin = this.getCellOrigin(row, col)
    return {
      x: origin.x,
      y: origin.y + this.cellHeight
    }
  }

  /**
   * Get the position in the center of the cell side in the provided direction.
   * @param  {number} row
   * @param  {number} col
   * @param  {String} side - 'north', 'south', 'east' or 'west'
   * @return {Position} {x, y}
   */
  getCellSideCenter (row, col, side = 'west') {
    const cellOrigin = this.getCellOrigin(row, col)
    if (side === 'north') {
      return {
        x: origin.x + Math.round(this.cellWidth / 4),
        y: origin.y + Math.round(this.cellHeight / 4)
      }
    } else if (side === 'east') {
      return {
        x: origin.x + Math.round(this.cellWidth / 4),
        y: origin.y + Math.round(3 * this.cellHeight / 4)
      }
    } else if (side === 'south') {
      return {
        x: origin.x - Math.round(this.cellWidth / 4),
        y: origin.y + Math.round(3 * this.cellHeight / 4)
      }
    } else if (side === 'west') {
      return {
        x: origin.x - Math.round(this.cellWidth / 4),
        y: origin.y - Math.round(this.cellHeight / 4)
      }
    }
  }
}
