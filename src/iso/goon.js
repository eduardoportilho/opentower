import {imageCache} from '../image-cache.js'

const GOON_IMAGE_SIZE = {
  width: 14,
  height: 20
}

export default class Goon {
  constructor () {
    // position of the bottom-left corner of the image
    this.position = null
  }

  draw (context) {
    const img = imageCache['goon-1']
    context.drawImage(img, this.position.x, this.position.y - GOON_IMAGE_SIZE.height)
  }
}
