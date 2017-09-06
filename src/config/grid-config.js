export const PATH_SN = 'PATH_SN'
export const PATH_WE = 'PATH_WE'
export const CURVE_SE = 'CURVE_SE'
export const CURVE_WS = 'CURVE_WS'
export const CURVE_NE = 'CURVE_NE'
export const CURVE_WN = 'CURVE_WN'

export default {
  '7,1': {
    type: PATH_SN,
    spawn: true
  },
  '6,1': { type: PATH_SN },
  '5,1': { type: PATH_SN },
  '4,1': { type: PATH_SN },
  '3,1': { type: PATH_SN },
  '2,1': { type: PATH_SN },
  '1,1': { type: PATH_SN },
  '0,1': { type: CURVE_SE },
  '0,2': { type: PATH_WE },
  '0,3': { type: PATH_WE },
  '0,4': { type: CURVE_WS },
  '1,4': { type: PATH_SN },
  '2,4': { type: PATH_SN },
  '3,4': { type: PATH_SN },
  '4,4': { type: PATH_SN },
  '5,4': { type: PATH_SN },
  '6,4': { type: PATH_SN },
  '7,4': { type: CURVE_NE },
  '7,5': { type: PATH_WE },
  '7,6': { type: CURVE_WN },
  '6,6': { type: PATH_SN },
  '5,6': { type: PATH_SN },
  '4,6': { type: PATH_SN },
  '3,6': { type: CURVE_SE },
  '3,7': { type: PATH_WE },
  '3,8': { type: PATH_WE },
  '3,9': { type: CURVE_WN },
  '2,9': { type: PATH_SN },
  '1,9': { type: PATH_SN },
  '0,9': {
    type: PATH_SN,
    target: true
  }
}
