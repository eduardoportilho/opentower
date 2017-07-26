import Grid from './grid.js'

const canvas = document.getElementById('canvas')
const grid = new Grid(canvas)
grid.onclick = (cell) => console.log(`Click on cel [${cell.row}, ${cell.col}]`)
grid.draw()
