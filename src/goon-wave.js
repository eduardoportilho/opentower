import Goon from './goon'

export default class GoonWave {
  constructor (game) {
    // const
    this.game = game
    this.intervalBetweenWaves = 20000
    this.numberOfGoonPerWave = 5
    this.intervalBetweenSpawns = 1500
    this.goonSpeed = 20
    this.goonLife = 100

    // let
    this.waveStarted = false
    this.timeSinceLastWave = this.intervalBetweenWaves // start imediatelly
    this.timeSinceLastSpawn = 0
    this.goonsLeft = this.numberOfGoonPerWave
  }

  update (delta) {
    this.startOrStopWave(delta)
    this.deployGoons(delta)
  }

  startOrStopWave (delta) {
    if (this.waveStarted) {
      // no more goons, end wave
      if (this.goonsLeft === 0) {
        this.waveStarted = false
        this.timeSinceLastWave = 0
      }
    } else {
      this.timeSinceLastWave += delta
      // interval ended, start wave
      if (this.timeSinceLastWave >= this.intervalBetweenWaves) {
        this.waveStarted = true
        this.timeSinceLastSpawn = 0
        this.goonsLeft = this.numberOfGoonPerWave
      }
    }
  }

  deployGoons (delta) {
    // is wave running?
    if (!this.waveStarted || this.goonsLeft === 0) {
      return
    }
    // is in interval between spawns? wait...
    if (this.timeSinceLastSpawn < this.intervalBetweenSpawns) {
      this.timeSinceLastSpawn += delta
      return
    }

    // spawn!
    this.timeSinceLastSpawn = 0
    this.goonsLeft--
    this.game.spawnGoon(this.newGoon())
  }

  newGoon () {
    const id = Date.now()
    const goon = new Goon(id, this.game)
    goon.speed = this.goonSpeed
    goon.life = this.goonLife
    return goon
  }
}
