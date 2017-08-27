import {loadImageCache} from './image-cache.js'
import {imageCache} from './image-cache.js'
import {polygon} from './drawing-utils'
import SpriteSheet from './sprite-sheet'
import landscapeSheetMap from './spritesheets/landscape-sheet'

export const CELL_EDGE_SIZE = 20

class IsoGrid {
  constructor (canvasSize) {
    this.canvasSize = canvasSize
    this.colCount = 20
    this.rowCount = 20
    this.origin = {
      x: canvasSize.width / 2,
      y: CELL_EDGE_SIZE
    }

    this.sprite = new SpriteSheet(imageCache['landscape_sheet'], landscapeSheetMap, 2 * CELL_EDGE_SIZE, CELL_EDGE_SIZE)
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
    const tileOrigin = this.getCellOrigin(1, 1)
    this.sprite.draw(context, tileOrigin, 'landscape_00')
  }

  getCellCorners (row, col) {
    const cellOrigin = this.getCellOrigin(row, col)
    const halfEdge = Math.round(CELL_EDGE_SIZE / 2)
    return [
      cellOrigin,
      {x: cellOrigin.x + CELL_EDGE_SIZE, y: cellOrigin.y + halfEdge},
      {x: cellOrigin.x, y: cellOrigin.y + CELL_EDGE_SIZE},
      {x: cellOrigin.x - CELL_EDGE_SIZE, y: cellOrigin.y + halfEdge}
    ]
  }

  getCellOrigin (row, col) {
    // http://clintbellanger.net/articles/isometric_math/
    return {
      x: (col - row) * CELL_EDGE_SIZE + this.origin.x,
      y: (col + row) * Math.round(CELL_EDGE_SIZE / 2) + this.origin.y
    }
  }
}

loadImageCache(init)

function init () {
  const canvas = document.getElementById('canvas')
  canvas.width = 1000
  canvas.height = 1000

  const context = canvas.getContext('2d')

  const isoGrid = new IsoGrid({
    width: 1000,
    height: 1000
  })
  isoGrid.draw(context)
}
