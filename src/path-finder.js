export default class PathFinder {
  constructor (grid) {
    this.grid = grid
    this.recalculate()
  }

  /**
   * Recalculate all paths
   */
  recalculate () {
    this.grid.reset()
    let targetCell = this.grid.getTarget()
    targetCell.dist = 0
    targetCell.reachable = true
    targetCell.isTarget = true
    targetCell.nextStep = undefined
    this.frontier = new PriorityQueue(false)
    this.frontier.push(targetCell, targetCell.dist)

    while (this.frontier.size() > 0) {
      let current = this.frontier.pop()

      // adjacent cells have cost of 1
      let adjacentCells = this.grid.getAdjacentNeighbours(current)
      for (let adjacentCell of adjacentCells) {
        let distFromCurrent = current.dist + 1
        if (adjacentCell.dist === undefined || adjacentCell.dist > distFromCurrent) {
          adjacentCell.dist = distFromCurrent
          adjacentCell.reachable = true
          adjacentCell.nextStep = current
          this.frontier.push(adjacentCell, distFromCurrent)
        }
      }

      // diagonal cells have cost of 1.5
      let diagonalCells = this.grid.getDiagonalNeighbours(current)
      for (let diagonalCell of diagonalCells) {
        let distFromCurrent = current.dist + 1.5
        if (diagonalCell.dist === undefined || diagonalCell.dist > distFromCurrent) {
          diagonalCell.dist = distFromCurrent
          diagonalCell.reachable = true
          diagonalCell.nextStep = current
          this.frontier.push(diagonalCell, distFromCurrent)
        }
      }
    }
  }

  /**
   * Get the next position in the path to the target.
   * @param  {Point} currentPosition - Current position.
   * @param  {Number} steps - Number of steps to perform.
   * @return {Point}
   */
  nextCell (currentCell, steps = 1) {
    let nextCell = currentCell.nextStep
    while (--steps > 0 && nextCell) {
      nextCell = nextCell.nextStep
    }
    return nextCell
  }
}

class PriorityQueue {
  constructor (higherPriorirtyFirst = true) {
    this.data = []
    this.higherPriorirtyFirst = higherPriorirtyFirst
  }

  push (value, priority) {
    let index = 0
    while (
      this.data.length > index &&
      !this.shouldComeFirst(priority, this.data[index].priority)
    ) {
      index++
    }
    this.data.splice(index, 0, {value: value, priority: priority})
  }

  pop () {
    return this.data.shift().value
  }

  size () {
    return this.data.length
  }

  shouldComeFirst (priorityA, priorityB) {
    return this.higherPriorirtyFirst ? priorityA > priorityB : priorityB > priorityA
  }
}
