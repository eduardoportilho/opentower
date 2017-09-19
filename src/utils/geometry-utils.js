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
 * @param  {Point} secondPointInLine - Another point in the desired line (define direction).
 * @param  {number} distance - Distance from origin to the returned point in pixels.
 * @param  {boolean} maxOnSecondPoint - If true, returns the second point if the result is beyond it in the line..
 * @return {Point} Point in L with the given distance to `origin`.
 */
export const getPointInLine = (origin, secondPointInLine, distance, maxOnSecondPoint = false) => {
  const hyp = calculateDistance(origin, secondPointInLine)
  const dx = secondPointInLine.x - origin.x
  const dy = secondPointInLine.y - origin.y
  const sin = dy / hyp
  const cos = dx / hyp

  let dyStep = sin * distance
  let dxStep = cos * distance

  if (maxOnSecondPoint) {
    if (Math.abs(dxStep) > Math.abs(dx)) {
      dxStep = dx
    }
    if (Math.abs(dyStep) > Math.abs(dy)) {
      dyStep = dy
    }
  }
  const nextX = origin.x + dxStep
  const nextY = origin.y + dyStep
  return {x: nextX, y: nextY}
}

/**
 * Return the angle between the line conecting 2 points and the horizontal axis.
 *
 * Angle signal:
 *  B     |     B
 *    (-) | (-)
 * -------A-------
 *    (+) | (+)
 *  B     |     B
 *
 * @param  {Point} pointA
 * @param  {Point} pointB
 * @return {number} Angle in radians.
 */
export const getAngleRadians = (pointA, pointB) => {
  const dy = pointB.y - pointA.y
  const hyp = calculateDistance(pointA, pointB)
  const sin = dy / hyp
  return Math.asin(sin)
}

/**
 * Check is two points are in the same position given th tolerance.
 * @param  {Point} pointA
 * @param  {Point} pointB
 * @param  {number} tolerance
 * @return {boolean}
 */
export const isEqualPoints = (pointA, pointB, tolerance = 1) => {
  return Math.abs(pointA.x - pointB.x) <= tolerance &&
    Math.abs(pointA.y - pointB.y) <= tolerance
}
