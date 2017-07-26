/* global Path2D */

/**
 * @typedef {Object} Point
 * @property {number} x - The X Coordinate.
 * @property {number} y - The Y Coordinate.
 */

/**
 * Build a square path.
 * @param  {Point} startPosition
 * @param  {number} edgeSize
 * @return {Path2D}
 */
export function buildSquarePath (startPosition, edgeSize) {
  const path = new Path2D()
  const startCorner = [startPosition.x, startPosition.y]
  const corners = [
    [startPosition.x + edgeSize, startPosition.y],
    [startPosition.x + edgeSize, startPosition.y + edgeSize],
    [startPosition.x, startPosition.y + edgeSize],
    [startPosition.x, startPosition.y]
  ]
  path.moveTo(...startCorner)
  corners.forEach((corner) => {
    path.lineTo(...corner)
  })
  return path
}
