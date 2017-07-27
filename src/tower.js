import {imageCache} from './image-cache.js'

export default class Tower {
  constructor (position) {
    this.position = position
  }

  /**
   * Draw the goon on position.
   * @param  {CanvasRenderingContext2D} context - Canvas renderering context.
   */
  draw (context) {
    var img = imageCache['tower-1']
    context.drawImage(img, this.position.x, this.position.y)
  }
}
