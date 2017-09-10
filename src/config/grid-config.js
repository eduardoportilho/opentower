export const GRASS = 'GRASS'
export const PATH_SN = 'PATH_SN'
export const PATH_WE = 'PATH_WE'
export const CURVE_SE = 'CURVE_SE'
export const CURVE_WS = 'CURVE_WS'
export const CURVE_NE = 'CURVE_NE'
export const CURVE_WN = 'CURVE_WN'
export const CASTLE = 'CASTLE'

export const gridConfig = {
  '7,1': {
    tile: PATH_SN,
    spawn: true
  },
  '6,1': { tile: PATH_SN },
  '5,1': { tile: PATH_SN },
  '4,1': { tile: PATH_SN },
  '3,1': { tile: PATH_SN },
  '2,1': { tile: PATH_SN },
  '1,1': { tile: PATH_SN },
  '0,1': { tile: CURVE_SE },
  '0,2': { tile: PATH_WE },
  '0,3': { tile: PATH_WE },
  '0,4': { tile: CURVE_WS },
  '1,4': { tile: PATH_SN },
  '2,4': { tile: PATH_SN },
  '3,4': { tile: PATH_SN },
  '4,4': { tile: PATH_SN },
  '5,4': { tile: PATH_SN },
  '6,4': { tile: PATH_SN },
  '7,4': { tile: CURVE_NE },
  '7,5': { tile: PATH_WE },
  '7,6': { tile: CURVE_WN },
  '6,6': { tile: PATH_SN },
  '5,6': { tile: PATH_SN },
  '4,6': { tile: PATH_SN },
  '3,6': { tile: CURVE_SE },
  '3,7': { tile: PATH_WE },
  '3,8': { tile: PATH_WE },
  '3,9': { tile: CURVE_WN },
  '2,9': { tile: PATH_SN },
  '1,9': { tile: PATH_SN },
  '0,9': {
    tile: PATH_SN,
    object: CASTLE,
    target: true
  }
}

export function getTileConnections(tileKey) {
  switch (tileKey) {
    case PATH_SN:
      return ['south', 'north']
    case PATH_WE:
      return ['west', 'east']
    case CURVE_SE:
      return ['south', 'east']
    case CURVE_WS:
      return ['west', 'south']
    case CURVE_NE:
      return ['north', 'east']
    case CURVE_WN:
      return ['west', 'north']
  }
}
