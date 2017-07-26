/* global Image */

export default class Tower {
  constructor (position) {
    this.position = position
  }

  draw (context) {
    var img = new Image()
    img.onload = () => { context.drawImage(img, this.position.x, this.position.y) }
    img.src = '../images/tower-1.png'
  }
}
