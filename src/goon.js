import {imageCache} from './image-cache.js'

export default class Goon {
  constructor (position) {
    this.position = position
  }

  /**
   * Draw the goon on position.
   * @param  {CanvasRenderingContext2D} context - Canvas renderering context.
   */
  draw (context) {
    var img = imageCache['goon-1']
    context.drawImage(img, this.position.x, this.position.y)
  }

  /**
   * Update goon state.
   */
  update () {
    this.position = {
      x: this.position.x + 3,
      y: this.position.y
    }
  }
}
