import {loadImageCache, imageCache} from '../image-cache.js'
import {polygon} from '../drawing-utils'
import landscapeSheetMap from '../spritesheets/landscape-sheet'
import towersGreySheetMap from '../spritesheets/towers-grey-sheet'

import landscapeTiles from '../config/landscape'
import towersGreyTiles from '../config/towers-grey'
// OR
import {gridConfig} from '../config/grid-config'

import SpriteSheet from './sprite-sheet'

// full: 128 x 64 x 32
export const CELL_WIDTH = 64
export const CELL_HEIGHT = 32
export const FLOOR_HEIGHT = 16

class IsoGrid {
  constructor (canvasSize) {
    this.canvasSize = canvasSize
    this.colCount = 10
    this.rowCount = 8
    this.origin = {
      x: canvasSize.width / 2,
      y: CELL_HEIGHT
    }
    this.landscapeSheet = new SpriteSheet(imageCache['landscape_sheet'], landscapeSheetMap, CELL_WIDTH)
    this.towersGreySheet = new SpriteSheet(imageCache['towers_grey_sheet'], towersGreySheetMap, CELL_WIDTH)
  }

  drawGame (context) {
    for (let row = 0; row < this.rowCount; row++) {
      for (let col = 0; col < this.colCount; col++) {
        let tile = 'GRASS'
        let tileConfig = gridConfig[`${row},${col}`]
        if (tileConfig) {
          tile = tileConfig.tile
        }
        this.landscapeSheet.draw(context, this.getCellBottom(row, col), tile)
      }
    }
  }

  drawSampleGrid (context) {
    // grid
    context.strokeStyle = '#cccccc'
    for (var row = 0; row < this.rowCount; row++) {
      for (var col = 0; col < this.colCount; col++) {
        const corners = this.getCellCorners(row, col)
        polygon(context, corners, false, true)
      }
    }

    // ladscape
    for (let row = 0; row < landscapeTiles.length; row++) {
      let tileRow = landscapeTiles[row]
      for (let col = 0; col < tileRow.length; col++) {
        let tile = tileRow[col]
        if (tile) {
          this.landscapeSheet.draw(context, this.getCellBottom(row, col), tile.spriteKey, tile.verticalOffset)
        }
      }
    }

    // tower
    const floorHeight = FLOOR_HEIGHT * -1
    for (let tower of towersGreyTiles) {
      this.towersGreySheet.drawStacked(context, this.getCellBottom(tower.row, tower.col), tower.tiles, floorHeight)
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
  isoGrid.drawSampleGrid(context)
}
