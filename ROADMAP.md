# Roadmap:

## Bugs:
- Chrome complaining about frozen tab

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
- spawn goon (on timeout)
    ✔ + Draw a goon
    ✔ + make goon walk across arena
    + spawn goon on different location
    + make goon walk to same destination
        * Calculate path
- make goon avoid towers
    + recalculate path (on clock? on deployed tower)
    + detect blocked goon
- make tower shot
    + detect goons in range (on clock)
    + deduct goon life
        * Show goon life
    + kill goon on 0 life
    + reload gun
    + Animate shot?
- Deploy goons in waves
- Control cash:
    + tower cost
    + goon bounty
- Control goons that reach goal