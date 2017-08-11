/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cell = exports.CELL_EDGE_SIZE = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @typedef {Object} Point
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @property {number} x - The X Coordinate.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @property {number} y - The Y Coordinate.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _coord = __webpack_require__(6);

var _coord2 = _interopRequireDefault(_coord);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Size of the (square) cell edge.
 * @type {number}
 */
var CELL_EDGE_SIZE = exports.CELL_EDGE_SIZE = 20;

/**
 * Grid cell.
 */

var Cell = exports.Cell = function () {
  /**
   * @param {number} row - Row number.
   * @param {number} col - Column number.
   */
  function Cell(row, col) {
    _classCallCheck(this, Cell);

    this.coord = new _coord2.default(row, col);
    this.reachable = false;
    this.dist = undefined;
    this.nextStep = undefined;
    this.blocked = false;
  }

  /**
   * Check cell coordinates.
   * @param {Coord} coord
   * @return {Boolean}
   */


  _createClass(Cell, [{
    key: 'isOnCoord',
    value: function isOnCoord(coord) {
      return this.coord.equals(coord);
    }

    /**
     * Get the position of the center of the cell in pixels.
     * @return {Point}
     */

  }, {
    key: 'getCenterPosition',
    value: function getCenterPosition() {
      var x = Math.round(this.coord.col * CELL_EDGE_SIZE + CELL_EDGE_SIZE / 2);
      var y = Math.round(this.coord.row * CELL_EDGE_SIZE + CELL_EDGE_SIZE / 2);
      return { x: x, y: y };
    }

    /**
     * Get the top-left position of the cell in pixels.
     * @return {Point}
     */

  }, {
    key: 'getTopLeftPosition',
    value: function getTopLeftPosition() {
      var x = this.coord.col * CELL_EDGE_SIZE;
      var y = this.coord.row * CELL_EDGE_SIZE;
      return { x: x, y: y };
    }

    /**
     * Get the bottom-right position of the cell in pixels.
     * @return {Point}
     */

  }, {
    key: 'getBottomRightPosition',
    value: function getBottomRightPosition() {
      var x = (this.coord.col + 1) * CELL_EDGE_SIZE;
      var y = (this.coord.row + 1) * CELL_EDGE_SIZE;
      return { x: x, y: y };
    }

    /**
     * Get the offset of a point inside the cell from the cell's top-left corner.
     * @param  {Point} pointInCell
     * @return {Point} offset
     */

  }, {
    key: 'getOffset',
    value: function getOffset(pointInCell) {
      var zero = this.getTopLeftPosition();
      return {
        x: pointInCell.x - zero.x,
        y: pointInCell.y - zero.y
      };
    }
  }]);

  return Cell;
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadImageCache = loadImageCache;
/* global Image */

/**
 * List of images to load.
 * @type {Object}
 */
var imageUrls = {
  'tower-1': '../images/tower-1.png',
  'goon-1': '../images/goon-1.png'

  /**
   * Global image cache.
   * @type {Object}
   */
};var imageCache = exports.imageCache = {};

/**
 * Load the images on the cache and call the callback when ready.
 * @param  {function} onLoadComplete
 */
function loadImageCache(onLoadComplete) {
  var _loop = function _loop(key) {
    var url = imageUrls[key];
    var img = new Image();
    img.onload = function () {
      imageCache[key] = img;
      if (Object.keys(imageCache).length === Object.keys(imageUrls).length) {
        onLoadComplete();
      }
    };
    img.src = url;
  };

  for (var key in imageUrls) {
    _loop(key);
  }
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Calculate the distance between 2 points.
 * @param  {Point} pointA
 * @param  {Point} pointB
 * @return {number} distance
 */
var calculateDistance = exports.calculateDistance = function calculateDistance(pointA, pointB) {
  var dx = pointB.x - pointA.x;
  var dy = pointB.y - pointA.y;
  return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
};

/**
 * Let L be the line formed by the 2 given points `origin` and `anyPointInLine`.
 * Return the point in L with the given distance to `origin`.
 * @param  {Point} origin - Origin point.
 * @param  {Point} anyPointInLine - Another poin in the desired line (define direction).
 * @param  {number} distance - Distance from origin to the returned point in pixels.
 * @return {Point} Point in L with the given distance to `origin`.
 */
var getPointInLine = exports.getPointInLine = function getPointInLine(origin, anyPointInLine, distance) {
  var hyp = calculateDistance(origin, anyPointInLine);
  var dx = anyPointInLine.x - origin.x;
  var dy = anyPointInLine.y - origin.y;
  var sin = dy / hyp;
  var cos = dx / hyp;

  var dyStep = sin * distance;
  var dxStep = cos * distance;

  var nextX = origin.x + dxStep;
  var nextY = origin.y + dyStep;
  return { x: nextX, y: nextY };
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _imageCache = __webpack_require__(1);

var _game = __webpack_require__(4);

var _game2 = _interopRequireDefault(_game);

var _renderer = __webpack_require__(11);

var _renderer2 = _interopRequireDefault(_renderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _imageCache.loadImageCache)(init);

function init() {
  var canvas = document.getElementById('canvas');
  var game = new _game2.default();
  var renderer = new _renderer2.default(canvas, game);
  renderer.start();
  initCtrlPanel(game, renderer);
}

function initCtrlPanel(game, renderer) {
  document.getElementById('spawn').onclick = function (e) {
    e.stopPropagation();
    e.preventDefault();

    var x = document.getElementById('x').value;
    var y = document.getElementById('y').value;
    game.spawnGoon(x, y);
  };

  document.getElementById('speedUpdate').onclick = function (e) {
    e.stopPropagation();
    e.preventDefault();

    var speed = parseInt(document.getElementById('speed').value);
    game.goons.forEach(function (goon) {
      goon.speed = speed;
    });
  };

  document.getElementById('pause').onclick = function (e) {
    e.stopPropagation();
    e.preventDefault();

    if (renderer.isRunning()) {
      renderer.stop();
    } else {
      renderer.start();
    }
  };
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @typedef {Object} Point
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @property {number} x - The X Coordinate.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @property {number} y - The Y Coordinate.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _grid = __webpack_require__(5);

var _grid2 = _interopRequireDefault(_grid);

var _tower = __webpack_require__(7);

var _goon = __webpack_require__(8);

var _goon2 = _interopRequireDefault(_goon);

var _pathFinder = __webpack_require__(9);

var _pathFinder2 = _interopRequireDefault(_pathFinder);

var _random = __webpack_require__(10);

var _random2 = _interopRequireDefault(_random);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    this.grid = new _grid2.default({ width: 1000, height: 600 });
    this.pathFinder = new _pathFinder2.default(this.grid);
    this.towers = [];
    this.goons = [];
    this.highlight = undefined;
    this.spawnedGoons = 0;
    this.spawnCells = this.getSpawnCells();

    this.intervalId = window.setInterval(this.spawnGoons.bind(this), 800);
  }

  /**
   * When a user click a cell.
   * @param  {Point} position - Cell upper-left position.
   */


  _createClass(Game, [{
    key: 'onUserClick',
    value: function onUserClick(position) {
      var towerCells = this.grid.getCellsAround(position, _tower.TOWER_SIZE.rows, _tower.TOWER_SIZE.cols);
      // occupied ?
      if (!towerCells || towerCells.some(function (cell) {
        return cell.blocked || cell.hasGoon;
      })) {
        return;
      }
      // 1: block
      towerCells.forEach(function (cell) {
        cell.blocked = true;
      });
      // 2: recalculate paths
      this.pathFinder.recalculate();
      // 3: check for trapped goons and spawn locations
      var doNotTrapCells = this.goons.map(function (goon) {
        return goon.cell;
      }).concat(this.spawnCells);
      var isInvalidPosition = doNotTrapCells.some(function (cell) {
        return !cell.reachable;
      });
      // 4: if trapped, rollback
      if (isInvalidPosition) {
        towerCells.forEach(function (cell) {
          cell.blocked = false;
        });
        this.pathFinder.recalculate();
        return;
      }

      var towerBoundaries = this._getCellsBoudaries(towerCells);
      var tower = new _tower.Tower(towerBoundaries, this);
      this.towers.push(tower);
    }
  }, {
    key: 'onMouseMove',
    value: function onMouseMove(position) {
      this.mousePosition = position;
    }
  }, {
    key: 'updateHighlight',
    value: function updateHighlight() {
      if (!this.mousePosition) {
        return;
      }
      var towerCells = this.grid.getCellsAround(this.mousePosition, _tower.TOWER_SIZE.rows, _tower.TOWER_SIZE.cols);
      if (!towerCells) {
        this.highlight = undefined;
        return;
      }
      var towerBoundaries = this._getCellsBoudaries(towerCells);
      var isOcuppied = towerCells.some(function (cell) {
        return cell.blocked || cell.hasGoon;
      });
      this.highlight = {
        boundaries: towerBoundaries,
        valid: !isOcuppied
      };
    }

    /**
     * Spawn a new goon.
     */

  }, {
    key: 'spawnGoons',
    value: function spawnGoons() {
      var NUMBER_OF_GOONS_TO_SPAWN = 10;
      var location = _random2.default.getRandomElementFromArray(this.spawnCells).coord;
      this.spawnGoon(location.row, location.col);
      if (++this.spawnedGoons >= NUMBER_OF_GOONS_TO_SPAWN) {
        window.clearInterval(this.intervalId);
      }
    }
  }, {
    key: 'spawnGoon',
    value: function spawnGoon(row, col) {
      var spawnCell = this.grid.get(row, col);
      var id = Date.now();
      var goon = new _goon2.default(id, spawnCell, this, this.pathFinder);
      this.goons.push(goon);
    }
  }, {
    key: 'removeGoon',
    value: function removeGoon(goon) {
      var index = this.goons.findIndex(function (aGoon) {
        return aGoon.id === goon.id;
      });
      if (index >= 0) {
        this.goons.splice(index, 1);
      }
    }

    /**
     * Update the state of the game entities.
     * @param  {number} delta - ms since last update.
     */

  }, {
    key: 'update',
    value: function update(delta) {
      this.towers.forEach(function (tower) {
        return tower.update(delta);
      });
      this.goons.forEach(function (goon) {
        return goon.update(delta);
      });
      this.updateHighlight();
    }
  }, {
    key: 'getSpawnCells',
    value: function getSpawnCells() {
      var middle = Math.round(this.grid.rowCount / 2);
      var count = Math.min(10, Math.round(this.grid.rowCount / 3));
      var row = middle - Math.round(count / 2);
      var cells = [];
      while (count-- > 0) {
        cells.push(this.grid.get(row++, 0));
      }
      return cells;
    }
  }, {
    key: '_getCellsBoudaries',
    value: function _getCellsBoudaries(cells) {
      return {
        topLeft: cells[0].getTopLeftPosition(),
        bottomRight: cells[cells.length - 1].getBottomRightPosition()
      };
    }
  }]);

  return Game;
}();

exports.default = Game;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @typedef {Object} CellData
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @property {number} x - The X Coordinate.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @property {number} y - The Y Coordinate.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @property {number} dist - Number of steps until target.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @property {number} nextStep - Next cell on the path to target.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _cell = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Grid = function () {
  function Grid(canvasSize) {
    _classCallCheck(this, Grid);

    this.canvasSize = canvasSize;
    this.colCount = Math.floor(canvasSize.width / _cell.CELL_EDGE_SIZE);
    this.rowCount = Math.floor(canvasSize.height / _cell.CELL_EDGE_SIZE);
    this.init();
  }

  _createClass(Grid, [{
    key: 'init',
    value: function init() {
      this.grid = new Array(this.rowCount);
      for (var row = 0; row < this.rowCount; row++) {
        this.grid[row] = Array(this.colCount);
        for (var col = 0; col < this.colCount; col++) {
          this.grid[row][col] = new _cell.Cell(row, col);
        }
      }
      // flatten all cells on a single array
      this.allCells = [].concat.apply([], this.grid);
    }

    /**
     * Reset grid data.
     */

  }, {
    key: 'reset',
    value: function reset() {
      for (var row = 0; row < this.rowCount; row++) {
        for (var col = 0; col < this.colCount; col++) {
          this.grid[row][col].reachable = false;
          this.grid[row][col].dist = undefined;
          this.grid[row][col].nextStep = undefined;
        }
      }
    }

    /**
     * Get cell at position.
     * @param  {number} x - X coordinate.
     * @param  {number} y - Y coordinate.
     * @return {Cell}
     */

  }, {
    key: 'get',
    value: function get(row, col) {
      try {
        return this.grid[row][col];
      } catch (any) {
        return undefined;
      }
    }

    /**
     * Get target cell.
     * @return {Cell}
     */

  }, {
    key: 'getTarget',
    value: function getTarget() {
      var row = Math.round(this.rowCount / 2);
      var col = this.colCount - 1;
      return this.get(row, col);
    }

    /**
     * Get the unvisited neighbour cells of the position.
     * @param  {Cell} cell
     * @return {Cell[]}
     */

  }, {
    key: 'getUnvisitedNeighboursCells',
    value: function getUnvisitedNeighboursCells(cell) {
      var _this = this;

      var coord = cell.coord;
      var grid = this;
      return [{ row: coord.row, col: coord.col - 1 }, { row: coord.row - 1, col: coord.col }, { row: coord.row, col: coord.col + 1 }, { row: coord.row + 1, col: coord.col }].filter(function (coord) {
        return !_this._isOutOfGrid(coord);
      }).map(function (coord) {
        return grid.get(coord.row, coord.col);
      }).filter(function (cell) {
        return cell.dist === undefined && !cell.blocked;
      });
    }

    /**
     * Get the cell that contains the provided position.
     * @param  {Point} point
     * @return {Cell}
     */

  }, {
    key: 'getCellAtPosition',
    value: function getCellAtPosition(point) {
      if (point.x < 0 || point.x > this.canvasSize.width || point.y < 0 || point.y > this.canvasSize.height) {
        return undefined;
      }
      var col = Math.floor(point.x / _cell.CELL_EDGE_SIZE);
      var row = Math.floor(point.y / _cell.CELL_EDGE_SIZE);
      return this.get(row, col);
    }

    /**
     * Get the cells that contains the boundaries area.
     * @param  {Boundaries} boundaries
     * @return {Cell[]}
     */

  }, {
    key: 'getCellsInBoundaries',
    value: function getCellsInBoundaries(boundaries) {
      var topLeftCell = this.getCellAtPosition(boundaries.topLeft);
      var bottomRightCell = this.getCellAtPosition(boundaries.bottomRight);
      var cells = [];
      for (var row = topLeftCell.coord.row; row <= bottomRightCell.coord.row; row++) {
        for (var col = topLeftCell.coord.col; col <= bottomRightCell.coord.col; col++) {
          cells.push(this.get(row, col));
        }
      }
      return cells;
    }

    /**
     * Return an array containing all cells.
     * @return {Cell[]}
     */

  }, {
    key: 'getCells',
    value: function getCells() {
      return this.allCells;
    }

    /**
     * Return a block of cells containg the point approximately in the center
     * @param  {Point} point - Point contained in the block,
     * @param  {number} rowCount - Number of rows in the block.
     * @param  {number} colCount - Number of cols in the block.
     * @return {Cell[]}
     */

  }, {
    key: 'getCellsAround',
    value: function getCellsAround(point, rowCount, colCount) {
      var center = this.getCellAtPosition(point);
      if (!center) {
        return undefined;
      }
      var topRow = center.coord.row - Math.floor(rowCount / 2);
      var bottomRow = topRow + rowCount - 1;
      var leftCol = center.coord.col - Math.floor(colCount / 2);
      var rightCol = leftCol + colCount - 1;
      if (this._isOutOfGrid({ row: topRow, col: leftCol }) || this._isOutOfGrid({ row: bottomRow, col: rightCol })) {
        return undefined;
      }

      var cells = [];
      for (var row = topRow; row <= bottomRow; row++) {
        for (var col = leftCol; col <= rightCol; col++) {
          cells.push(this.get(row, col));
        }
      }
      return cells;
    }

    /**
     * Check if a coordinate is out of the grid.
     * @param  {Coord} coord
     * @return {Boolean}       [description]
     */

  }, {
    key: '_isOutOfGrid',
    value: function _isOutOfGrid(coord) {
      return coord.col < 0 || coord.col >= this.colCount || coord.row < 0 || coord.row >= this.rowCount;
    }
  }]);

  return Grid;
}();

exports.default = Grid;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Coord = function () {
  /**
   * @param {number} row
   * @param {number} col
   */
  function Coord(row, col) {
    _classCallCheck(this, Coord);

    this.row = row;
    this.col = col;
  }

  /**
   * Compare two coordinates.
   * @param {Coord} coord
   * @return {Boolean}
   */


  _createClass(Coord, [{
    key: "equals",
    value: function equals(coord) {
      return coord && this.row === coord.row && this.col === coord.col;
    }
  }]);

  return Coord;
}();

exports.default = Coord;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tower = exports.TOWER_SIZE = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _geometry = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @typedef {Object} Point
 * @property {number} x - The X Coordinate.
 * @property {number} y - The Y Coordinate.
 */

/**
 * @typedef {Object} Boundaries
 * @property {Point} topLeft - top-left point of the object.
 * @property {Point} bottomRight - bottom-right point of the object.
 */
var TOWER_SIZE = exports.TOWER_SIZE = {
  rows: 2,
  cols: 2
};

var Tower = exports.Tower = function () {
  function Tower(boundaries, game) {
    _classCallCheck(this, Tower);

    this.game = game;
    this.topLeftPosition = boundaries.topLeft;
    this.width = boundaries.bottomRight.x - boundaries.topLeft.x;
    this.height = boundaries.bottomRight.y - boundaries.topLeft.y;
    this.centerPosition = {
      x: Math.round(boundaries.topLeft.x + this.width / 2),
      y: Math.round(boundaries.topLeft.y + this.height / 2)
      // shooting consts
    };this.reloadTime = 2000;
    this.fireRange = 150;
    this.damage = 5;

    // shoting props
    this.timeUntilReloaded = 0;
  }

  /**
   * Draw the tower on position.
   * @param  {CanvasRenderingContext2D} context - Canvas renderering context.
   */


  _createClass(Tower, [{
    key: 'draw',
    value: function draw(context) {
      context.fillStyle = 'lightgray';
      context.strokeStyle = 'dimgray';
      context.fillRect(this.topLeftPosition.x, this.topLeftPosition.y, this.width, this.height);
      context.strokeRect(this.topLeftPosition.x, this.topLeftPosition.y, this.width, this.height);
    }
    /**
     * Update tower state.
     * @param  {number} delta - ms since last update.
     */

  }, {
    key: 'update',
    value: function update(delta) {
      if (this.isLoaded()) {
        this.shoot();
      } else {
        this.reload(delta);
      }
    }
  }, {
    key: 'reload',
    value: function reload(delta) {
      this.timeUntilReloaded -= delta;
    }
  }, {
    key: 'shoot',
    value: function shoot() {
      var goon = this.getClosestGoonInRange();
      if (goon) {
        goon.life -= this.damage;
        this.timeUntilReloaded = this.reloadTime;
      }
    }
  }, {
    key: 'isLoaded',
    value: function isLoaded() {
      return this.timeUntilReloaded <= 0;
    }
  }, {
    key: 'getClosestGoonInRange',
    value: function getClosestGoonInRange() {
      var _this = this;

      var towerCenter = this.centerPosition;
      var goonsInRange = this.game.goons.map(function (goon) {
        var dist = (0, _geometry.calculateDistance)(towerCenter, goon.position);
        return { goon: goon, dist: dist };
      }).filter(function (goonDist) {
        return goonDist.dist <= _this.fireRange;
      }).sort(function (a, b) {
        return a.dist - b.dist;
      });
      return goonsInRange.length > 0 ? goonsInRange[0].goon : undefined;
    }

    /**
     * Get to top-left and bottom-right points of the tower.
     * @return {Boundaries}
     */

  }, {
    key: 'getBoundaries',
    value: function getBoundaries() {
      return {
        'topLeft': this.topLeftPosition,
        'bottomRight': this.bottomRightPosition
      };
    }
  }]);

  return Tower;
}();

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _imageCache = __webpack_require__(1);

var _geometry = __webpack_require__(2);

var _cell = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GOON_IMAGE_SIZE = {
  width: 14,
  height: 20
};

var Goon = function () {
  function Goon(id, initialCell, game, pathFinder) {
    _classCallCheck(this, Goon);

    this.id = id;
    this.game = game;
    this.pathFinder = pathFinder;
    this.cell = initialCell;
    this.cell.hasGoon = true;
    this.position = this.cell.getTopLeftPosition();
    this.speed = 20; // px/sec
    this.life = 100;

    // store the decimals lost in the last step to maintain constant speed
    this._residualStep = 0;
  }

  /**
   * Draw the goon on position.
   * @param  {CanvasRenderingContext2D} context - Canvas renderering context.
   */


  _createClass(Goon, [{
    key: 'draw',
    value: function draw(context) {
      // _Paint cell base:
      // context.fillStyle = 'gold'
      // const cellOrigin = this.cell.getTopLeftPosition()
      // context.fillRect(cellOrigin.x, cellOrigin.y, CELL_EDGE_SIZE, CELL_EDGE_SIZE)

      var img = _imageCache.imageCache['goon-1'];
      context.drawImage(img, this.position.x, this.position.y - Math.round(GOON_IMAGE_SIZE.height / 2));
      this.drawLifeBar(context);
    }
  }, {
    key: 'drawLifeBar',
    value: function drawLifeBar(context) {
      var height = 3;
      var width = 20;
      var greenWidth = Math.max(0, Math.round(width * this.life / 100));
      var redWidth = width - greenWidth;

      var y = this.position.y - 20;
      var greenX = this.position.x;
      var redX = this.position.x + greenWidth;

      context.fillStyle = 'green';
      context.fillRect(greenX, y, greenWidth, height);
      context.fillStyle = 'red';
      context.fillRect(redX, y, redWidth, height);
    }

    /**
     * Update goon state.
     * @param  {number} delta - ms since last update.
     */

  }, {
    key: 'update',
    value: function update(delta) {
      this.updatePosition(delta);
      this.updateLife(delta);
    }
  }, {
    key: 'updateLife',
    value: function updateLife(delta) {
      if (this.life <= 0) {
        this.game.removeGoon(this);
      }
    }
  }, {
    key: 'updatePosition',
    value: function updatePosition(delta) {
      this.cell.hasGoon = false;
      var nextCell = this.pathFinder.nextCell(this.cell, 1);
      if (!nextCell) {
        this.game.removeGoon(this);
        return;
      }

      var offset = this.cell.getOffset(this.position);
      var targetPosition = {
        x: nextCell.getTopLeftPosition().x + offset.x,
        y: nextCell.getTopLeftPosition().y + offset.y
      };

      var step = this.speed * delta / 1000.0 + this._residualStep;
      var intStep = Math.floor(step);
      this._residualStep = step - intStep;

      var nextPosition = (0, _geometry.getPointInLine)(this.position, targetPosition, intStep);
      // Might happen that step is not enought to change cell
      var nextPositionCell = this.game.grid.getCellAtPosition(nextPosition);

      if (nextPositionCell) {
        this.cell = nextPositionCell;
        this.cell.hasGoon = true;
        this.position = nextPosition;
      } else {
        this.game.removeGoon(this);
      }
    }
  }]);

  return Goon;
}();

exports.default = Goon;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PathFinder = function () {
  function PathFinder(grid) {
    _classCallCheck(this, PathFinder);

    this.grid = grid;
    this.recalculate();
  }

  /**
   * Recalculate all paths
   */


  _createClass(PathFinder, [{
    key: "recalculate",
    value: function recalculate() {
      this.grid.reset();
      var targetCell = this.grid.getTarget();
      targetCell.dist = 0;
      targetCell.reachable = true;
      targetCell.nextStep = undefined;
      this.frontier = [targetCell];

      while (this.frontier.length > 0) {
        var current = this.frontier.shift();
        var neighboursCells = this.grid.getUnvisitedNeighboursCells(current);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = neighboursCells[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var neighbourCell = _step.value;

            neighbourCell.dist = current.dist + 1;
            neighbourCell.reachable = true;
            neighbourCell.nextStep = current;
            this.frontier.push(neighbourCell);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
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

  }, {
    key: "nextCell",
    value: function nextCell(currentCell) {
      var steps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      var nextCell = currentCell.nextStep;
      while (--steps > 0 && nextCell) {
        nextCell = nextCell.nextStep;
      }
      return nextCell;
    }
  }]);

  return PathFinder;
}();

exports.default = PathFinder;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Random = function () {
  function Random() {
    _classCallCheck(this, Random);
  }

  _createClass(Random, [{
    key: "yesOrNo",
    value: function yesOrNo(yesChance) {
      yesChance = yesChance || 0.5;
      return Math.random() < yesChance;
    }
  }, {
    key: "getRandomIntExclusive",
    value: function getRandomIntExclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      // The maximum is exclusive and the minimum is inclusive
      return Math.floor(Math.random() * (max - min)) + min;
    }
  }, {
    key: "getRandomIntInclusive",
    value: function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      // The maximum is inclusive and the minimum is inclusive
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }, {
    key: "getRandomElementFromArray",
    value: function getRandomElementFromArray(array) {
      var index = this.getRandomIntExclusive(0, array.length);
      return array[index];
    }
  }, {
    key: "shuffle",
    value: function shuffle(array) {
      var currentIndex = array.length;
      var temporaryValue = void 0,
          randomIndex = void 0;

      // While there remain elements to shuffle...
      while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
    }
  }]);

  return Random;
}();

exports.default = new Random();

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* global requestAnimationFrame */

/**
 * @typedef {Object} Point
 * @property {number} x - The X Coordinate.
 * @property {number} y - The Y Coordinate.
 */

var _cell = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Renderer = function () {
  /**
   * Grid constructor
   * @param  {HTMLCanvasElement} canvas - HTML canvas.
   */
  function Renderer(canvas, game) {
    _classCallCheck(this, Renderer);

    this.canvas = canvas;
    this.game = game;
    this.canvas.width = this.game.grid.canvasSize.width;
    this.canvas.height = this.game.grid.canvasSize.height;
    this.context = this.canvas.getContext('2d');
    this.animationId = null;

    // bind events
    this.canvas.onclick = this.onCanvasClick.bind(this);
    this.canvas.onmousemove = this.onMouseMove.bind(this);
    this.canvas.onmouseout = this.onMouseMove.bind(this);
  }

  /**
   * Start the game loop.
   */


  _createClass(Renderer, [{
    key: 'start',
    value: function start() {
      this.lastTick = Date.now();
      this.animationId = requestAnimationFrame(this.tick.bind(this));
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.animationId = null;
    }
  }, {
    key: 'isRunning',
    value: function isRunning() {
      return this.animationId !== null;
    }

    /**
     * Update state, render and restart the game loop every X ms.
     */

  }, {
    key: 'tick',
    value: function tick() {
      if (!this.animationId) {
        return;
      }

      var now = Date.now();
      var delta = now - this.lastTick;

      this.game.update(delta);
      this.lastTick = now;

      this.render();
      this.animationId = requestAnimationFrame(this.tick.bind(this));
    }

    /**
     * Draw the grid.
     */

  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      // 0: highlight
      if (this.game.highlight) {
        var stroke = 'green';
        var fill = 'lightgreen';
        if (!this.game.highlight.valid) {
          stroke = 'red';
          fill = 'lightcoral';
        }
        this._paintBoundaries(this.game.highlight.boundaries, stroke, fill);
      }

      // 1st layer: towers
      this.game.towers.forEach(function (tower) {
        tower.draw(_this.context);
      });

      // 2nd layer: goons
      this.game.goons.forEach(function (goon) {
        goon.draw(_this.context);
      });
    }

    /**
     * DEBUG: paint a blue square on blocked cells
     */

  }, {
    key: 'paintBlockedCells',
    value: function paintBlockedCells() {
      var _this2 = this;

      this.context.fillStyle = 'lightskyblue';
      this.context.strokeStyle = 'azure';
      var blockedCells = this.game.grid.getCells().filter(function (cell) {
        return cell.blocked;
      });
      blockedCells.forEach(function (cell) {
        var position = cell.getTopLeftPosition();
        _this2.context.strokeRect(position.x, position.y, _cell.CELL_EDGE_SIZE, _cell.CELL_EDGE_SIZE);
        _this2.context.fillRect(position.x, position.y, _cell.CELL_EDGE_SIZE, _cell.CELL_EDGE_SIZE);
      });

      this.game.towers.forEach(function (tower) {
        _this2._paintBoundaries(tower.getBoundaries(), 'red');
      });
    }

    /**
     * Trigger onclick on canvas click.
     * @param {MouseEvent} event
     */

  }, {
    key: 'onCanvasClick',
    value: function onCanvasClick(event) {
      var mousePosition = {
        x: event.clientX - event.target.offsetLeft,
        y: event.clientY - event.target.offsetTop
      };
      this.game.onUserClick(mousePosition);
    }
  }, {
    key: 'onMouseMove',
    value: function onMouseMove(event) {
      var mousePosition = {
        x: event.clientX - event.target.offsetLeft,
        y: event.clientY - event.target.offsetTop
      };
      this.game.onMouseMove(mousePosition);
    }
  }, {
    key: '_paintBoundaries',
    value: function _paintBoundaries(boundaries, stroke, fill) {
      var position = boundaries.topLeft;
      var w = boundaries.bottomRight.x - position.x;
      var h = boundaries.bottomRight.y - position.y;
      if (stroke) {
        this.context.strokeStyle = stroke;
        this.context.strokeRect(position.x, position.y, w, h);
      }
      if (fill) {
        this.context.fillStyle = fill;
        this.context.fillRect(position.x, position.y, w, h);
      }
    }
  }]);

  return Renderer;
}();

exports.default = Renderer;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map