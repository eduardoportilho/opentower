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
    this.frontier = [targetCell]

    while (this.frontier.length > 0) {
      let current = this.frontier.shift()
      let neighboursCells = this.grid.getUnvisitedNeighboursCells(current)
      for (let neighbourCell of neighboursCells) {
        neighbourCell.dist = current.dist + 1
        neighbourCell.reachable = true
        neighbourCell.nextStep = current
        this.frontier.push(neighbourCell)
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
