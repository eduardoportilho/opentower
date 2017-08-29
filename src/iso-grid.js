import {loadImageCache, imageCache} from './image-cache.js'
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

    // tiles
    const tiles = [
      ['grass', 'path_curve_bl_br', 'path_tl_br', 'path_tl_br', 'path_curve_tl_bl', 'grass', 'grass', 'river_tr_bl', 'grass'],
      ['trees_2_t_b', 'path_tr_bl', 'grass', 'rocks_2_r_l', 'path_tr_bl', 'grass_ramp_tr_bl', 'grass_ramp_diag_r_l', 'river_tr_bl', 'rocks_2_l_r'],
      ['grass', 'path_tr_bl', 'grass', 'grass', 'path_tr_bl', 'grass_double_dirt', 'grass_ramp_br_tl', 'river_tr_bl', 'trees_2_tr_tl'],
      ['grass', 'path_tr_bl', null, 'crystal_b_t']
    ]
    for (let row = 0; row < tiles.length; row++) {
      let tileRow = tiles[row]
      for (let col = 0; col < tileRow.length; col++) {
        if (tileRow[col]) {
          this.sprite.draw(context, this.getCellBottom(row, col), tileRow[col])
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
    // http://clintbellanger.net/articles/isometric_math/
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
