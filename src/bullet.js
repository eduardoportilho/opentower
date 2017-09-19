import {getPointInLine, isEqualPoints} from './utils/geometry-utils'
import {circle} from './utils/drawing-utils'
import {getGame} from './game.js'

const SPEED = 200
const RADIUS = 2

export default class Bullet {
  constructor (initialPosition, targetGoon) {
    this.id = Date.now()
    this.position = initialPosition
    this.targetGoon = targetGoon
    this.game = getGame()
  }

  update (delta) {
    const step = Math.round(SPEED * delta / 1000.0)
    const target = this.targetGoon.position
    this.position = getPointInLine(this.position, target, step, true)
    if (isEqualPoints(target, this.position)) {
      this.game.removeBullet(this)
    }
  }

  draw (context) {
    context.fillStyle = '#525252'
    circle(context, this.position.x, this.position.y, RADIUS, true, false)
  }
}
