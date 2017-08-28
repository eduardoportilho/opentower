import {loadImageCache} from './image-cache.js'
import {imageCache} from './image-cache.js'
import {polygon} from './drawing-utils'
import SpriteSheet from './sprite-sheet'
import landscapeSheetMap from './spritesheets/landscape-sheet'

export const CELL_WIDTH = 128 // 132 =  2 + 128 + 2
export const CELL_HEIGHT = 64 // 83 2 + 64 + 15 + 2

class IsoGrid {
  constructor (canvasSize) {
    this.canvasSize = canvasSize
    this.colCount = 9
    this.rowCount = 9
    this.origin = {
      x: canvasSize.width / 2,
      y: 5
    }

    this.sprite = new SpriteSheet(imageCache['landscape_sheet'], landscapeSheetMap, CELL_WIDTH, CELL_HEIGHT)
  }

  draw (context) {
    // grid
    context.strokeStyle = '#cccccc'
    for (var row = 0; row < this.rowCount; row++) {
      for (var col = 0; col < this.colCount; col++) {
        const corners = this.getCellCorners(row, col)
        polygon(context, corners, false, true)
      }
    }

    // tiles
    this.sprite.draw(context, this.getCellOrigin(0, 0), 'grass_single_flat')
    this.sprite.draw(context, this.getCellOrigin(1, 1), 'grass_single_flat')
    this.sprite.draw(context, this.getCellOrigin(1, 2), 'grass_single_flat')
    this.sprite.draw(context, this.getCellOrigin(2, 1), 'dirt_single_flat')
    this.sprite.draw(context, this.getCellOrigin(2, 2), 'dirt_single_flat')
    this.sprite.draw(context, this.getCellOrigin(8, 8), 'grass_single_flat')
  }

  getCellCorners (row, col) {
    const cellOrigin = this.getCellOrigin(row, col)
    const halfHeigth = Math.round(CELL_HEIGHT / 2)
    const halfWidth = Math.round(CELL_WIDTH / 2)
    return [
      cellOrigin,
      {x: cellOrigin.x + halfWidth, y: cellOrigin.y + halfHeigth},
      {x: cellOrigin.x, y: cellOrigin.y + CELL_HEIGHT},
      {x: cellOrigin.x - halfWidth, y: cellOrigin.y + halfHeigth}
    ]
  }

  getCellOrigin (row, col) {
    // http://clintbellanger.net/articles/isometric_math/
    const halfHeigth = Math.round(CELL_HEIGHT / 2)
    const halfWidth = Math.round(CELL_WIDTH / 2)
    return {
      x: (col - row) * halfWidth + this.origin.x,
      y: (col + row) * halfHeigth + this.origin.y
    }
  }
}

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
  isoGrid.draw(context)
}

