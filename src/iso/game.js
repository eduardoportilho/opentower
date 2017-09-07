import {loadImageCache} from '../image-cache.js'
import {IsoGrid} from './iso-grid.js'
import random from '../utils/random'

const CANVAS_WIDTH = 1400
const CANVAS_HEIGHT = 800

loadImageCache(init)

function init () {
  const canvas = document.getElementById('canvas')
  canvas.width = CANVAS_WIDTH
  canvas.height = CANVAS_HEIGHT

  const game = new Game(canvas)
  game.init()
}

class Game {
  constructor (canvas) {
    this.goons = []
    this.context = canvas.getContext('2d')
    this.isoGrid = new IsoGrid({
      width: canvas.width,
      height: canvas.height
    })
  }

  init () {
    this.isoGrid.drawGame(this.context)
  }

  spanGoonOnRandomLocation () {
    const spawnLocation = random.getRandomElementFromArray(
      this.isoGrid.getSpawnLocations()
    )
    const goon = {
      loction: spawnLocation
    }
    this.goons.push(goon)
  }
}
