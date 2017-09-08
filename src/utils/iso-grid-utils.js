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
   * @param  {number} verticalOffset - offset to added to the vertical coordinate (eg. floor height)
   * @return {Position} {x, y}
   */
  getCellOrigin (row, col, verticalOffset = 0) {
    // http://clintbellanger.net/articles/isometric_math/
    const halfHeigth = Math.round(this.cellHeight / 2)
    const halfWidth = Math.round(this.cellWidth / 2)
    return {
      x: (col - row) * halfWidth + this.gridOrigin.x,
      y: (col + row) * halfHeigth + this.gridOrigin.y + verticalOffset
    }
  }

  /**
   * Top, right, bottom and left corner positions for the cell.
   * @param  {number} row
   * @param  {number} col
   * @param  {number} verticalOffset - offset to added to the vertical coordinate (eg. floor height)
   * @return {Position[]} [{x, y}]
   */
  getCellCorners (row, col, verticalOffset = 0) {
    const cellOrigin = this.getCellOrigin(row, col, verticalOffset)
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
   * Right (top-right) corner position for the cell.
   * @param  {number} row
   * @param  {number} col
   * @param  {number} verticalOffset - offset to added to the vertical coordinate (eg. floor height)
   * @return {Position} {x, y}
   */
  getCellLeft (row, col, verticalOffset = 0) {
    return this.getCellCorners(row, col, verticalOffset)[1]
  }

  /**
   * Bottom (bottom-right) corner position for the cell.
   * @param  {number} row
   * @param  {number} col
   * @param  {number} verticalOffset - offset to added to the vertical coordinate (eg. floor height)
   * @return {Position} {x, y}
   */
  getCellBottom (row, col, verticalOffset = 0) {
    return this.getCellCorners(row, col, verticalOffset)[2]
  }

  /**
   * Left (bottom-left) corner position for the cell.
   * @param  {number} row
   * @param  {number} col
   * @param  {number} verticalOffset - offset to added to the vertical coordinate (eg. floor height)
   * @return {Position} {x, y}
   */
  getCellLeft (row, col, verticalOffset = 0) {
    return this.getCellCorners(row, col, verticalOffset)[3]
  }

  /**
   * Center position for the cell.
   * @param  {number} row
   * @param  {number} col
   * @param  {number} verticalOffset - offset to added to the vertical coordinate (eg. floor height)
   * @return {Position} {x, y}
   */
  getCellCenter (row, col, verticalOffset = 0) {
    const origin = this.getCellOrigin(row, col, verticalOffset)
    return {
      x: origin.x,
      y: origin.y + Math.round(this.cellHeight / 2)
    }
  }

  /**
   * Get the position in the center of the cell side in the provided direction.
   * @param  {number} row
   * @param  {number} col
   * @param  {String} side - 'north', 'south', 'east' or 'west'
   * @return {Position} {x, y}
   */
  getCellSideCenter (row, col, verticalOffset = 0, side = 'west') {
    const origin = this.getCellOrigin(row, col, verticalOffset)
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
