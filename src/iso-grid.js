import {loadImageCache, imageCache} from './image-cache.js'
import {polygon} from './drawing-utils'
import SpriteSheet from './sprite-sheet'
import landscapeSheetMap from './spritesheets/landscape-sheet'
import landscapeTiles from './config/landscape'

export const CELL_WIDTH = 128 // 132 =  2 + 128 + 2
export const CELL_HEIGHT = 64 // 83 2 + 64 + 15 + 2

class IsoGrid {
  constructor (canvasSize) {
    this.canvasSize = canvasSize
    this.colCount = 10
    this.rowCount = 8
    this.origin = {
      x: canvasSize.width / 2,
      y: CELL_HEIGHT
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

    for (let row = 0; row < landscapeTiles.length; row++) {
      let tileRow = landscapeTiles[row]
      for (let col = 0; col < tileRow.length; col++) {
        let tile = tileRow[col]
        if (tile) {
          this.sprite.draw(context, this.getCellBottom(row, col), tile.spriteKey, tile.verticalOffset)
        }
      }
    }
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

  getCellBottom (row, col) {
    const origin = this.getCellOrigin(row, col)
    return {
      x: origin.x,
      y: origin.y + CELL_HEIGHT
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
