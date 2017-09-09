import {imageCache} from '../image-cache.js'
import {polygon} from '../drawing-utils'
import IsoGridUtils from '../utils/iso-grid-utils'
import landscapeSheetMap from '../spritesheets/landscape-sheet'
import towersGreySheetMap from '../spritesheets/towers-grey-sheet'
import GameSheet from '../spritesheets/game-sheet'

import landscapeTiles from '../config/landscape'
import towersGreyTiles from '../config/towers-grey'
// OR
import {gridConfig} from '../config/grid-config'

import SpriteSheet from './sprite-sheet'
import Cell from './cell'

// full: 128 x 64 x 32
export const CELL_WIDTH = 64
export const CELL_HEIGHT = 32
export const FLOOR_HEIGHT = -16

export class IsoGrid {
  constructor (game, canvasSize) {
    this.game = game
    this.canvasSize = canvasSize
    this.colCount = 10
    this.rowCount = 8
    this.origin = {
      x: canvasSize.width / 2,
      y: CELL_HEIGHT
    }
    this.isoGridUtils = new IsoGridUtils(CELL_WIDTH, CELL_HEIGHT, this.origin)
    this.landscapeSheet = new SpriteSheet(imageCache['landscape_sheet'], landscapeSheetMap, CELL_WIDTH)
    this.towersGreySheet = new SpriteSheet(imageCache['towers_grey_sheet'], towersGreySheetMap, CELL_WIDTH)
    this.gameSheet = new GameSheet(CELL_WIDTH, FLOOR_HEIGHT)
    this._buildGrid()
  }

  _buildGrid () {
    this.cells = []
    for (let row = 0; row < this.rowCount; row++) {
      for (let col = 0; col < this.colCount; col++) {
        let tileConfig = gridConfig[`${row},${col}`]
        if (!tileConfig) {
          tileConfig = {
            tile: 'GRASS'
          }
        }
        this.cells.push(new Cell({
          row: row,
          col: col,
          tile: tileConfig.tile,
          object: tileConfig.object,
          spawn: !!tileConfig.spawn,
          target: !!tileConfig.target
        }))
      }
    }
  }

  drawGame (context) {
    this.cells.forEach(cell => {
      const {row, col, tile, tileConfig} = cell
      // tile
      this.gameSheet.draw(context, this.isoGridUtils.getCellBottom(row, col), tile)

      // tile objects
      if (tileConfig && tileConfig.object) {
        this.gameSheet.draw(context, this.isoGridUtils.getCellBottom(row, col), tileConfig.object)
      }
    })

    // drawables
    const drawables = this.game.getDrawables()
    for (let drawable of drawables) {
      drawable.draw(context)
    }
  }

  drawSampleGrid (context) {
    // grid
    context.strokeStyle = '#cccccc'
    for (var row = 0; row < this.rowCount; row++) {
      for (var col = 0; col < this.colCount; col++) {
        const corners = this.isoGridUtils.getCellCorners(row, col)
        polygon(context, corners, false, true)
      }
    }

    // ladscape
    for (let row = 0; row < landscapeTiles.length; row++) {
      let tileRow = landscapeTiles[row]
      for (let col = 0; col < tileRow.length; col++) {
        let tile = tileRow[col]
        if (tile) {
          this.landscapeSheet.draw(context, this.isoGridUtils.getCellBottom(row, col), tile.spriteKey, tile.verticalOffset)
        }
      }
    }

    // tower
    for (let tower of towersGreyTiles) {
      this.towersGreySheet.drawStacked(context, this.isoGridUtils.getCellBottom(tower.row, tower.col), tower.tiles, FLOOR_HEIGHT)
    }
  }

  /**
   * @return {Cell[]} Array of spawn cell
   */
  getSpawnCells () {
    return this.cells.filter(cell => cell.spawn)
  }
}
