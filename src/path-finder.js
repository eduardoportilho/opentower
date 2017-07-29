import Grid from './grid'

/**
 * Point where the goons are heading to.
 * @type {Object}
 */
const TARGET_POS = {
  x: 600,
  y: 275
}

class PathFinder {
  constructor () {
    this.grid = new Grid(600, 600)
    this.recalculate()
  }

  /**
   * Recalculate all paths
   */
  recalculate () {
    // init grid
    this.grid.reset()
    // init bfs
    let target = {
      x: TARGET_POS.x,
      y: TARGET_POS.y,
      dist: 0,
      nextStep: undefined
    }
    this.frontier = [target]
    this.grid.set(target)

    while (this.frontier.length > 0) {
      let current = this.frontier.shift()
      let unvisitedNeighboursCoords = this.grid.getUnvisitedNeighboursCoords(current)
      for (let nPos of unvisitedNeighboursCoords) {
        let neighbour = {...nPos, dist: current.dist + 1, nextStep: current}
        this.grid.set(neighbour)
        this.frontier.push(neighbour)
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
    let nextPosition = this.grid.get(currentPosition.x, currentPosition.y)
    while (steps-- > 0 && nextPosition.nextStep) {
      nextPosition = nextPosition.nextStep
    }
    return nextPosition
  }
}

export default new PathFinder()
