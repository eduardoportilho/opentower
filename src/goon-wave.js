import Goon from './goon'
import wavesConfig from './waves-config.js'

export default class GoonWave {
  constructor (game) {
    this.game = game
    this.currentWave = null
    this.timeUntilNexWave = 0
    this.timeUntilNextSpawn = 0
    this.goonsLeft = 0
    this.config = wavesConfig.slice(0)
  }

  update (delta) {
    this.startOrStopWave(delta)
    this.deployGoons(delta)
  }

  startOrStopWave (delta) {
    if (this.currentWave) {
      // no more goons, end wave
      if (this.goonsLeft === 0) {
        this.timeUntilNexWave = this.currentWave.intervalAfterWave
        this.currentWave = null
      }
    } else {
      this.timeUntilNexWave -= delta
      // interval ended, start wave
      if (this.timeUntilNexWave <= 0) {
        if (this.config.length === 0) {
          // no more waves, quit
          return
        }
        this.currentWave = this.config.shift()
        this.timeUntilNextSpawn = this.currentWave.intervalBetweenSpawns
        this.goonsLeft = this.currentWave.numberOfGoons
      }
    }
  }

  deployGoons (delta) {
    // is wave running?
    if (!this.currentWave || this.goonsLeft === 0) {
      return
    }
    // is in interval between spawns? wait...
    if (this.timeUntilNextSpawn > 0) {
      this.timeUntilNextSpawn -= delta
      return
    }

    // spawn!
    this.timeUntilNextSpawn = this.currentWave.intervalBetweenSpawns
    this.goonsLeft--
    this.game.spawnGoon(this.newGoon())
  }

  newGoon () {
    const id = Date.now()
    const goon = new Goon(id, this.game)
    goon.speed = this.currentWave.goonSpeed
    goon.life = this.currentWave.goonLife
    return goon
  }
}
