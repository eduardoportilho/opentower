import {getOppositeSide} from '../utils/tile-utils'
import _ from 'lodash'

export function getPaths (targetCell) {
  const sidesWithConnection = targetCell.getSidesWithConnection()
  let allPaths = []
  for (let side of sidesWithConnection) {
    let connectedCell = targetCell.getCellConnectedAt(side)
    if (!connectedCell) {
      continue
    }
    let entryPoint = targetCell.getEntryPointAt(side)
    let paths = buildPaths(connectedCell, side, [entryPoint])
    allPaths = allPaths.concat(paths)
  }
  return allPaths.map(path => _.reverse(path))
}

export function buildPaths (cell, targetSide, pathSoFar) {
  const entrySide = getOppositeSide(targetSide)
  const newPath = _.clone(pathSoFar)
  newPath.push(cell.getEntryPointAt(entrySide))
  const middlePathPoint = cell.getMiddlePathPoint()
  if (middlePathPoint) {
    newPath.push(middlePathPoint)
  }
  if (cell.isSpawn()) {
    const spawnSide = cell.getSpawnSide()
    const spawnPoint = cell.getEntryPointAt(spawnSide)
    newPath.push(spawnPoint)
    return [newPath]
  }
  let allPaths = []
  const sidesWithConnection = cell.getSidesWithConnection()
    .filter(side => side !== entrySide)
  for (let side of sidesWithConnection) {
    let connectedCell = cell.getCellConnectedAt(side)
    if (!connectedCell) {
      continue
    }
    let entryPoint = cell.getEntryPointAt(side)
    let sidePath = _.clone(newPath)
    sidePath.push(entryPoint)

    let paths = buildPaths(connectedCell, side, sidePath)
    allPaths = allPaths.concat(paths)
  }
  return allPaths
}
