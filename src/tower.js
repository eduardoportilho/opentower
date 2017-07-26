import {buildSquarePath} from './square-path'

export default class Tower {
  constructor (position) {
    this.position = position
    this.path = buildSquarePath(position, 50)
  }
}
