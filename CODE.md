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

### GameSheet (src/spritesheets/game-sheet.js)
- Map sprite key to landscape-sheet.js or towers-grey-sheet.js
- Has 2 instances of SpriteSheet for landscape-sheet.js and towers-grey-sheet.js
- Has `draw(context)` method
  - Delegate draw calls to SpriteSheet

### SpriteSheet (src/iso/sprite-sheet.js)
- Has a reference to a sprite image file and it's map
- Has `draw(context)` method (and drawStacked)
- Scale tile before drawing (scaleToFit)


## Proposed refactors:

- Move landscape-sheet.js and towers-grey-sheet.js to config
- Merge SpriteSheet and GameSheet
