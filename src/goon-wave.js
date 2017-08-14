export default class GoonWave {
  constructor (game) {
    this.game = game
    this.goonCount = 5
    this.interval = 1500
    this.goonSpeed = 20
    this.goonLife = 100

    this.timeSinceLastSpawn = 0
  }

  update (delta) {
    if (this.goonCount === 0) {
      return
    }
    if (this.timeSinceLastSpawn < this.interval) {
      this.timeSinceLastSpawn += delta
      return
    }
    this.timeSinceLastSpawn = 0
    this.goonCount--
    this.game.spawnGoon(newGoon())
  }

  newGoon () {
    const id = Date.now()
    // TODO remove initialCell from ctor
    const goon = new Goon(id, null, this.game)
    goon.speed = this.goonSpeed
    goon.life = this.goonLife
    return goon
  }
}