import Grid from './grid'

class PathFinder {
  constructor () {
    this.grid = new Grid({width: 600, height: 600})
    this.recalculate()
  }

  /**
   * Recalculate all paths
   */
  recalculate () {
    this.grid.reset()
    let targetCell = this.grid.getTarget()
    targetCell.dist = 0
    this.frontier = [targetCell]

    while (this.frontier.length > 0) {
      let current = this.frontier.shift()
      let getUnvisitedNeighboursCells = this.grid.getUnvisitedNeighboursCoords(current)
      for (let neighbourCell of getUnvisitedNeighboursCells) {
        neighbourCell.dist = current.dist + 1
        neighbourCell.nextStep = current
        this.frontier.push(neighbourCell)
      }
    }
  }

  /**
   * Get the next position in the path to the target
   * @param  {Point} currentPosition - Current position.
   * @param  {Number} steps - Number of steps to perform.
   * @return {Point}
   */
  nextPosition (currentPosition, steps = 1) {
    // TODO: rename to get next cell, use coords
    let nextPosition = this.grid.get(currentPosition.x, currentPosition.y)
    while (steps-- > 0 && nextPosition.nextStep) {
      nextPosition = nextPosition.nextStep
    }
    return nextPosition
  }
}

export default new PathFinder()
