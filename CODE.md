# ⛵ Navigating through the code

> This document shouldn't exist and will hopfully be deleted after some refactorings.

## Entry points:

There are two:
- `src/index.js`: for the open arena 
- `src/iso/game.js`: for the iso path arena

## Isometric path arena

### Game (`src/iso/game.js`): 
- Object tree root (has drawables, goons, grid)
- Control game loop
- (Need to move) Calculate paths

### Grid (`src/iso/iso-grid.js`):
- Grid data structure (Cell[][])
- Has cells, provide access to cells
- Has `draw(context)` method
  - Uses **GameSheet** to draw tiles and objects stored in cells
  - Get drawables from grid and call draw
