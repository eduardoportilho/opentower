/**
 * Point where the goons are heading to.
 * @type {Object}
 */
const TARGET_POS = {
  x: 600,
  y: 275
}

/**
 * Grid size on X axis
 * @type {Number}
 */
const GRID_SIZE_X = 600

/**
 * Grid size on Y axis
 * @type {Number}
 */
const GRID_SIZE_Y = 600

class PathFinder {
  constructor () {
    this.recalculate()
  }

  /**
   * Recalculate all paths
   */
  recalculate () {
    // init grid
    this.grid = new Array(GRID_SIZE_X + 1)
    for (let i = 0; i <= GRID_SIZE_X; i++) {
      this.grid[i] = new Array(GRID_SIZE_Y + 1)
    }
    // init bfs
    this.frontier = [TARGET_POS]
    this.grid[TARGET_POS.x][TARGET_POS.y] = {dist: 0, nextStep: undefined, ...TARGET_POS}

    while (this.frontier.length > 0) {
      let current = this.frontier.shift()
      let neighbourPositions = this._neighbourPositions(current)
      for (let nPos of neighbourPositions) {
        let neighbour = {...nPos, dist: current.dist + 1, nextStep: current}
        this.grid[nPos.x][nPos.y] = neighbour
        this.frontier.push(neighbour)
      }
    }
  }

  /**
   * Get the coordinate of the neighbours of the position that are
   * in the grid and not initialized.
   * @param  {Point} position
   * @return {Point[]}
   */
  _neighbourPositions (position) {
    return [
      {x: position.x - 1, y: position.y},
      {x: position.x, y: position.y - 1},
      {x: position.x + 1, y: position.y},
      {x: position.x, y: position.y + 1}
    ].filter((nPos) => (
      nPos.x >= 0 &&
      nPos.x <= GRID_SIZE_X &&
      nPos.y >= 0 &&
      nPos.y <= GRID_SIZE_Y &&
      this.grid[nPos.x][nPos.y] === undefined
    ))
  }

  /**
   * Get the next position in the path to the target
   * @param  {Point} position - Current position.
   * @param  {Number} steps - Number of steps to perform.
   * @return {Point}
   */
  nextPosition (position, steps = 1) {
    let nextStep = this.grid[position.x][position.y]
    while (steps-- > 0 && nextStep.nextStep) {
      nextStep = nextStep.nextStep
    }
    return nextStep
  }
}

export default new PathFinder()
