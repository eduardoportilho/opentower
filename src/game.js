import Tower from './tower'

export default class Game {
  constructor () {
    this.towers = []
  }

  onUserClick (position) {
    this.towers.push(new Tower(position))
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
