import {imageCache} from './image-cache.js'

export default class Tower {
  constructor (position) {
    this.position = position
  }

  draw (context) {
    var img = imageCache['tower-1']
    context.drawImage(img, this.position.x, this.position.y)
  }
}
