import {imageCache} from '../image-cache.js'
import {getPointInLine, calculateDistance, isEqualPoints} from '../utils/geometry-utils'

const GOON_IMAGE_SIZE = {
  width: 14,
  height: 20
}

export default class Goon {
  constructor () {
    // position of the bottom-left corner of the image
    this.position = null
    this.cell = null

    this.speed = 20
    this._residualStep = 0
    this.pathPoints = [] // list of points
    this.currentPathPointIndex = -1
  }

  draw (context) {
    const img = imageCache['goon-1']
    context.drawImage(img, this.position.x, this.position.y - GOON_IMAGE_SIZE.height)
  }

  update (delta) {
    if (!this.pathPoints || this.currentPathPointIndex >= this.pathPoints.length - 1) {
      return
    }
    const step = (this.speed * delta / 1000.0) + this._residualStep
    const stepRounded = Math.floor(step)
    this._residualStep = step - stepRounded
    let traveledDistance = 0

    while (Math.floor(traveledDistance) < stepRounded && this.currentPathPointIndex < this.pathPoints.length) {
      let nextPathPoint = this.pathPoints[this.currentPathPointIndex + 1]
      let nextPosition = getPointInLine(this.position, nextPathPoint, stepRounded, true)
      traveledDistance += calculateDistance(this.position, nextPosition)
      this.position = nextPosition

      if (isEqualPoints(nextPosition, nextPathPoint)) {
        this.currentPathPointIndex += 1
      }
    }
  }
}
