import {
  PATH_SN,
  PATH_WE,
  CURVE_SE,
  CURVE_WS,
  CURVE_NE,
  CURVE_WN
} from '../config/grid-config'

export function getTileConnections (tileKey) {
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

export function getOppositeSide (side) {
  switch (side) {
    case 'north': return 'south'
    case 'south': return 'north'
    case 'east': return 'west'
    case 'west': return 'east'
  }
}
