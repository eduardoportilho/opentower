import Grid from './grid.js'

const canvas = document.getElementById('canvas')
const gridDimensions = {
  width: 600,
  heigth: 600,
  cellSize: 50
}
const grid = new Grid(canvas, gridDimensions)
grid.draw()
