import {getGame} from './game.js'

export default class ScoreBoard {
  constructor (containerEl) {
    this.game = getGame()
    this.cashDisplay = containerEl.querySelector('#cashDisplay')
    this.goonsInsideDisplay = containerEl.querySelector('#goonsInsideDisplay')
    this.waveNumberDisplay = containerEl.querySelector('#waveNumberDisplay')
    this.update()
  }

  updateCash (cash) {
    if (this.cash !== cash) {
      this.cash = cash
      this.cashDisplay.textContent = cash
    }
  }

  updateGoonsInside (goonsInside) {
    if (this.goonsInside !== goonsInside) {
      this.goonsInside = goonsInside
      this.goonsInsideDisplay.textContent = goonsInside
    }
  }

  updateWaveNumber (waveNumber) {
    if (this.waveNumber !== waveNumber) {
      this.waveNumber = waveNumber
      this.waveNumberDisplay.textContent = waveNumber
    }
  }

  update () {
    this.updateCash(this.game.cash)
    this.updateGoonsInside(this.game.goonsInside)
    this.updateWaveNumber(this.game.goonWave.waveNumber)
  }
}
