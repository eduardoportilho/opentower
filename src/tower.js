import {calculateDistance} from './geometry-utils'
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
  }

  /**
   * Draw the tower on position.
   * @param  {CanvasRenderingContext2D} context - Canvas renderering context.
   */
  draw (context) {
    context.fillStyle = 'lightgray'
    context.strokeStyle = 'dimgray'
    context.fillRect(this.topLeftPosition.x, this.topLeftPosition.y, this.width, this.height)
    context.strokeRect(this.topLeftPosition.x, this.topLeftPosition.y, this.width, this.height)
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
