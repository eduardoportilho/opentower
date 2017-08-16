# Roadmap:

## Bugs:
✔ - Chrome complaining about frozen tab (not happening any more...)
✔ - Deploy tower on top of another tower
    ✔ + Blocked tower cells not matching tower posistion  
✔ - Goon movement is not smooth
    + To be smooth, goon should move on pixel intervals (instead of cells)
        * The problem is that to recalculate the path for every pixel is taking to much time, making the movement "choke".
            - Is it possible to optimize path finder to work smoothly for all pixels?
            - Is it possible to move in pixels but to use a cell path? 
        * Another problem is that if we calculate the path in pixels, the goon might pass between two towers if there is 1 px space (and the goon image needs to be bigger than 1 px)
            - Is it possible to implement pathfinder with a goon that occupy more than 1 cell? Am I overcomplicating?
✔ - If you deploy a tower on top of a goon he disaper
✔ - Goons going out of grid
✔ - Goon stoping (ex. when they need to return)
✔ - Weird movement on speed 50

- Goon trapped exception

## Features:
✔︎ - expose grid draw method
✔︎ - draw grid
✔︎ - grid: on cell hover -> style
✔︎ - grid: on cell click -> event
✔ - deploy tower on click
    ✔ + Store deployed towers
    ✔ + grid draw external objects
    ✔ + grid draw layers
    ✔ + avoid deploying on occupied cell
    ✔ + Draw a tower
✔ - spawn goon (on timeout)
    ✔ + Draw a goon
    ✔ + make goon walk across arena
    ✔ + spawn goons on different positions
    ✔ + make goons walk to same target
✔ - make goon avoid towers
    ✔ + recalculate path (on clock? on deployed tower)
✔ - Represent tower with cells instead of image.
✔ - Highlight tower boundaries on hover.
✔ - Define goon speed in pixels/s (instead of pixels/step)
✔ - Detect if the path to target would be blocked before deploying a tower and avoid the deploy if so.
✔ - Redraw tower
✔ - Implement pause and step to debug
✔ - make tower shot
    ✔ + detect goons in range (on clock)
    ✔ + deduct goon life
        ✔ * Show goon life
    ✔ + kill goon on 0 life
    ✔ + reload gun
✔ - Deploy goons in waves
✔ - Control cash:
    ✔ + tower cost
    ✔ + goon bounty
✔ - Control goons that reach goal

- Config file to tweak game parameters (waves, etc)
- Fininsh the game in the end of the waves
- 2nd tower type
- 2nd goon type
- Draw target
- Animate shot?

## Refactor:
- Game as the object root and singleton
- MessageBoard component to handle updateCashDisplay, updateGoonsInsideDisplay, etc.
- General code review


