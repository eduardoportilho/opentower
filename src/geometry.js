/**
 * Calculate the distance between 2 points.
 * @param  {Point} pointA
 * @param  {Point} pointB
 * @return {number} distance
 */
export const calculateDistance = (pointA, pointB) => {
  const dx = pointB.x - pointA.x
  const dy = pointB.y - pointA.y
  return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
}

/**
 * Let L be the line formed by the 2 given points `origin` and `anyPointInLine`.
 * Return the point in L with the given distance to `origin`.
 * @param  {Point} origin - Origin point.
 * @param  {Point} anyPointInLine - Another poin in the desired line (define direction).
 * @param  {number} distance - Distance from origin to the returned point in pixels.
 * @return {Point} Point in L with the given distance to `origin`.
 */
export const getPointInLine = (origin, anyPointInLine, distance) => {
  const hyp = calculateDistance(origin, anyPointInLine)
  const dx = anyPointInLine.x - origin.x
  const dy = anyPointInLine.y - origin.y
  const sin = dy / hyp
  const cos = dx / hyp

  const dyStep = sin * distance
  const dxStep = cos * distance

  const nextX = origin.x + dxStep
  const nextY = origin.y + dyStep
  return {x: nextX, y: nextY}
}
