import {imageCache} from './image-cache.js'

export default class Goon {
  constructor (position) {
    this.position = position
  }

  draw (context) {
    var img = imageCache['goon-1']
    context.drawImage(img, this.position.x, this.position.y)
  }
}
