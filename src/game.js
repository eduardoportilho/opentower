/**
 * @typedef {Object} Point
 * @property {number} x - The X Coordinate.
 * @property {number} y - The Y Coordinate.
 */

import Tower from './tower'

export default class Game {
  constructor () {
    this.towers = []
    this.occupiedCoords = []
  }

  /**
   * When a user lick a cell.
   * @param  {Point} position - Cell upper-left position.
   * @param  {Coord} coord - Cell coordinates.
   */
  onUserClick (position, coord) {
    const isOccupied = this.occupiedCoords.some((occupied) => occupied.equals(coord))
    if (!isOccupied) {
      this.occupiedCoords.push(coord)
      this.towers.push(new Tower(position))
    }
  }
}

// class Goon {
//   constructor() {
//     this.x = 0
//     this.y = 0
//     this.life = 100
//   }
//
//   move() {
//     //recalculate position
//   }
// }
//
// class Tower {
//   constructor() {
//     this.row = 0
//     this.col = 0
//     this.readyToFire = true
//   }
//
//   patrol() {
//     // if ready,
//     // get the closest goon in range
//     // fire
//     // start reloading
//   }
// }
