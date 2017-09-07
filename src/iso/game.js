import {loadImageCache} from '../image-cache.js'
import {IsoGrid} from './iso-grid.js'

loadImageCache(init)

function init () {
  const canvas = document.getElementById('canvas')
  canvas.width = 1400
  canvas.height = 800

  const context = canvas.getContext('2d')

  const isoGrid = new IsoGrid({
    width: 1400,
    height: 800
  })
  isoGrid.drawGame(context)
}
