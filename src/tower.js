import {calculateDistance, getAngleRadians} from './geometry-utils'
import {roundRect, circle} from './drawing-utils'
/**
 * @typedef {Object} Point
 * @property {number} x - The X Coordinate.
 * @property {number} y - The Y Coordinate.
 */

/**
 * @typedef {Object} Boundaries
 * @property {Point} topLeft - top-left point of the object.
 * @property {Point} bottomRight - bottom-right point of the object.
 */
export const TOWER_SIZE = {
  rows: 2,
  cols: 2
}

export class Tower {
  constructor (boundaries, game) {
    this.game = game
    this.topLeftPosition = boundaries.topLeft
    this.width = boundaries.bottomRight.x - boundaries.topLeft.x
    this.height = boundaries.bottomRight.y - boundaries.topLeft.y
    this.centerPosition = {
      x: Math.round(boundaries.topLeft.x + (this.width / 2)),
      y: Math.round(boundaries.topLeft.y + (this.height / 2))
    }
    // shooting consts
    this.reloadTime = 2000
    this.fireRange = 150
    this.damage = 5

    // shoting props
    this.timeUntilReloaded = 0
    this.canonAngle = Math.PI
  }

  /**
   * Draw the tower on position.
   * @param  {CanvasRenderingContext2D} context - Canvas renderering context.
   */
  draw (context) {
    // grass
    let x = this.topLeftPosition.x
    let y = this.topLeftPosition.y
    let width = this.width
    let height = this.height
    context.fillStyle = '#B8E986'
    context.strokeStyle = '#7ED321'
    roundRect(context, x, y, width, height, true, true)

    // base
    const basePct = 3 / 5
    const baseWidth = Math.round(width * basePct)
    const baseHeight = Math.round(height * basePct)
    const baseX = x + Math.round((width - baseWidth) / 2)
    const baseY = y + Math.round((height - baseHeight) / 2)
    context.fillStyle = '#D3D3D3'
    context.strokeStyle = '#979797'
    context.fillRect(baseX, baseY, baseWidth, baseHeight)
    context.strokeRect(baseX, baseY, baseWidth, baseHeight)

    // Rotatory device
    const rotPct = 2 / 5
    const rotRadius = Math.round(width * rotPct / 2)
    const rotCenterX = x + Math.round(width / 2)
    const rotCenterY = y + Math.round(height / 2)
    context.fillStyle = '#9B9B9B'
    context.strokeStyle = '#979797'
    circle(context, rotCenterX, rotCenterY, rotRadius, true, true)

    // canon
    const canonPct = 22 / 50
    const canonWidth = Math.round(width * canonPct)
    const canonHeight = 8
    const canonX = 0
    const canonY = 0 - Math.round(canonHeight / 2)
    context.save()
    context.translate(rotCenterX, rotCenterY)
    context.rotate(this.canonAngle)
    context.fillStyle = '#9B9B9B'
    context.strokeStyle = '#979797'
    context.fillRect(canonX, canonY, canonWidth, canonHeight)
    context.restore()
  }

  /**
   * Update tower state.
   * @param  {number} delta - ms since last update.
   */
  update (delta) {
    if (this.isLoaded()) {
      this.shoot()
    } else {
      this.reload(delta)
    }
  }

  reload (delta) {
    this.timeUntilReloaded -= delta
  }

  shoot () {
    const goon = this.getClosestGoonInRange()
    if (goon) {
      goon.life -= this.damage
      this.timeUntilReloaded = this.reloadTime
      this.canonAngle = getAngleRadians(this.centerPosition, goon.position)
      if (goon.position.x < this.centerPosition.x) {
        this.canonAngle = Math.PI - this.canonAngle
      }
    }
  }

  isLoaded () {
    return this.timeUntilReloaded <= 0
  }

  getClosestGoonInRange () {
    let towerCenter = this.centerPosition
    const goonsInRange = this.game.goons
      .map(goon => {
        const dist = calculateDistance(towerCenter, goon.position)
        return {goon, dist}
      })
      .filter(goonDist => goonDist.dist <= this.fireRange)
      .sort((a, b) => a.dist - b.dist)
    return goonsInRange.length > 0 ? goonsInRange[0].goon : undefined
  }

  /**
   * Get to top-left and bottom-right points of the tower.
   * @return {Boundaries}
   */
  getBoundaries () {
    return {
      'topLeft': this.topLeftPosition,
      'bottomRight': this.bottomRightPosition
    }
  }
}
Tower.cost = 10
