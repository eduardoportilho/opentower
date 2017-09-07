import {imageCache} from '../image-cache.js'
import landscapeSheetMap from './landscape-sheet'
import towersGreySheetMap from './towers-grey-sheet'
import SpriteSheet from '../iso/sprite-sheet'
import {
  GRASS,
  PATH_SN,
  PATH_WE,
  CURVE_SE,
  CURVE_WS,
  CURVE_NE,
  CURVE_WN,
  CASTLE
} from '../config/grid-config'

const tilesConfig = {
  GRASS: {
    isLandscapeSheet: true,
    spriteKey: GRASS
  },
  PATH_SN: {
    isLandscapeSheet: true,
    spriteKey: PATH_SN
  },
  PATH_WE: {
    isLandscapeSheet: true,
    spriteKey: PATH_WE
  },
  CURVE_SE: {
    isLandscapeSheet: true,
    spriteKey: CURVE_SE
  },
  CURVE_WS: {
    isLandscapeSheet: true,
    spriteKey: CURVE_WS
  },
  CURVE_NE: {
    isLandscapeSheet: true,
    spriteKey: CURVE_NE
  },
  CURVE_WN: {
    isLandscapeSheet: true,
    spriteKey: CURVE_WN
  },
  CASTLE: {
    isTowersSheet: true,
    spriteGroupKey: CASTLE
  }
}

export default class GameSheet {
  constructor (cellWidth, floorHeight) {
    this.cellWidth = cellWidth
    this.floorHeight = floorHeight
    this.landscapeSheet = new SpriteSheet(imageCache['landscape_sheet'], landscapeSheetMap, cellWidth)
    this.towersGreySheet = new SpriteSheet(imageCache['towers_grey_sheet'], towersGreySheetMap, cellWidth)
  }

  draw (context, bottomPoint, tileKey, verticalOffset) {
    const tileConfig = tilesConfig[tileKey]

    if (tileConfig.isLandscapeSheet) {
      this.landscapeSheet.draw(
        context,
        bottomPoint,
        tileConfig.spriteKey,
        verticalOffset
      )
    } else if (tileConfig.isTowersSheet) {
      const spriteKeys = towersGreySheetMap.spriteGroups[tileConfig.spriteGroupKey]
      this.towersGreySheet.drawStacked(
        context,
        bottomPoint,
        spriteKeys,
        this.floorHeight
      )
    }
  }
}
