/**
 * Point where the goons are heading to.
 * @type {Object}
 */
const TARGET_POS = {
  x: 600,
  y: 275
}

const GRID_SIZE_X = 600
const GRID_SIZE_Y = 600

class PathFinder {
  constructor () {
    this.recalculate()
  }

  recalculate () {
    // init grid
    this.grid = new Array(GRID_SIZE_X + 1)
    for (let i = 0; i <= GRID_SIZE_X; i++) {
      this.grid[i] = new Array(GRID_SIZE_Y + 1)
    }
    // init bfs
    this.frontier = [TARGET_POS]
    this.grid[TARGET_POS.x][TARGET_POS.y] = {dist: 0, nextStep: null, ...TARGET_POS}

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

  nextPosition (position) {
    return this.grid[position.x][position.y].nextStep
  }
}

export default new PathFinder()
