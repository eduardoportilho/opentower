import {imageCache} from '../image-cache.js'
import {getPointInLine} from './utils/geometry-utils'

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
    this.currentPathPoint index = -1
  }

  draw (context) {
    const img = imageCache['goon-1']
    context.drawImage(img, this.position.x, this.position.y - GOON_IMAGE_SIZE.height)
  }

  update (delta) {
    const step = (this.speed * delta / 1000.0) + this._residualStep
  }
}
