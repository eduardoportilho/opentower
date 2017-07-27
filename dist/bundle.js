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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _imageCache = __webpack_require__(0);

var _game = __webpack_require__(2);

var _game2 = _interopRequireDefault(_game);

var _grid = __webpack_require__(4);

var _grid2 = _interopRequireDefault(_grid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _imageCache.loadImageCache)(init);

function init() {
  var canvas = document.getElementById('canvas');
  var game = new _game2.default();
  var grid = new _grid2.default(canvas, game);
  grid.draw();
}

/***/ }),
/* 2 */
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

var _tower = __webpack_require__(3);

var _tower2 = _interopRequireDefault(_tower);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    this.towers = [];
    this.occupiedCoords = [];
  }

  /**
   * When a user lick a cell.
   * @param  {Point} position - Cell upper-left position.
   * @param  {Coord} coord - Cell coordinates.
   */


  _createClass(Game, [{
    key: 'onUserClick',
    value: function onUserClick(position, coord) {
      var isOccupied = this.occupiedCoords.some(function (occupied) {
        return occupied.equals(coord);
      });
      if (!isOccupied) {
        this.occupiedCoords.push(coord);
        this.towers.push(new _tower2.default(position));
      }
    }
  }]);

  return Game;
}();

// class Goon {
//   constructor() {
//     this.x = 0
//     this.y = 0
//     this.life = 100
//   }
//
//   move() {
//     //recalculate position
//   }
// }
//
// class Tower {
//   constructor() {
//     this.row = 0
//     this.col = 0
//     this.readyToFire = true
//   }
//
//   patrol() {
//     // if ready,
//     // get the closest goon in range
//     // fire
//     // start reloading
//   }
// }


exports.default = Game;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _imageCache = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tower = function () {
  function Tower(position) {
    _classCallCheck(this, Tower);

    this.position = position;
  }

  _createClass(Tower, [{
    key: 'draw',
    value: function draw(context) {
      var img = _imageCache.imageCache['tower-1'];
      context.drawImage(img, this.position.x, this.position.y);
    }
  }]);

  return Tower;
}();

exports.default = Tower;

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

var _cell = __webpack_require__(5);

var _cell2 = _interopRequireDefault(_cell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Size of the (square) cell edge.
 * @type {number}
 */
var CELL_EDGE_SIZE = 50;

/**
 * Style for cell type
 * @type {Object}
 */
var CELL_STYLES = {
  'cell': {
    'fill': 'lightgray',
    'stroke': 'gray',
    'lineWidth': 0.5
  },
  'cellHighlighted': {
    'fill': 'gray',
    'stroke': 'lightgray',
    'lineWidth': 0.5
  },
  'tower': {
    'fill': 'lightblue',
    'stroke': 'blue',
    'lineWidth': 1.5
  }
};

var Grid = function () {
  /**
   * Grid constructor
   * @param  {HTMLCanvasElement} canvas - HTML canvas.
   */
  function Grid(canvas, game) {
    _classCallCheck(this, Grid);

    this.canvas = canvas;
    this.game = game;
    this.context = this.canvas.getContext('2d');
    this.rowCount = Math.floor(canvas.height / CELL_EDGE_SIZE);
    this.colCount = Math.floor(canvas.width / CELL_EDGE_SIZE);
    this.cells = this.createCells();
    this.highlightedCoord = undefined;

    // bind events
    this.canvas.onclick = this.onCanvasClick.bind(this);
    this.canvas.onmousemove = this.onMouseMove.bind(this);
    this.canvas.onmouseout = this.onMouseMove.bind(this);
  }

  /**
   * Create cells for all coordinates.
   * @return {Cell[]} cells.
   */


  _createClass(Grid, [{
    key: 'createCells',
    value: function createCells() {
      var cells = [];
      for (var row = 0; row < this.rowCount; row++) {
        for (var col = 0; col < this.colCount; col++) {
          var position = this.getCellUpperLeftPosition(row, col);
          cells.push(new _cell2.default(row, col, position));
        }
      }
      return cells;
    }

    /**
     * Draw the grid.
     */

  }, {
    key: 'draw',
    value: function draw() {
      var _this = this;

      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      // 1st layer: cells
      this.cells.forEach(function (cell) {
        if (cell.isOnCoord(_this.highlightedCoord)) {
          _this.setContextStyle(CELL_STYLES.cellHighlighted);
        } else {
          _this.setContextStyle(CELL_STYLES.cell);
        }
        _this.context.fill(cell.path);
        _this.context.stroke(cell.path);
      });

      // 2nd layer: towers
      this.setContextStyle(CELL_STYLES.tower);
      this.game.towers.forEach(function (tower) {
        tower.draw(_this.context);
      });
    }

    /**
     * Set highlighted cell on mouse move.
     * @param {MouseEvent} event
     */

  }, {
    key: 'onMouseMove',
    value: function onMouseMove(event) {
      var mousePosition = {
        x: event.clientX - event.target.offsetLeft,
        y: event.clientY - event.target.offsetTop
      };
      var cell = this.getCellAtPosition(mousePosition);
      this.highlightedCoord = cell ? cell.coord : undefined;
      this.draw();
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
      var cell = this.getCellAtPosition(mousePosition);
      this.game.onUserClick(cell.position, cell.coord);
      this.draw();
    }

    /**
     * Get the cell start point (upper left).
     * @param  {number} row - Cell row.
     * @param  {number} col - Cell column.
     * @return {Point} Cell start point.
     */

  }, {
    key: 'getCellUpperLeftPosition',
    value: function getCellUpperLeftPosition(row, col) {
      return {
        x: col * CELL_EDGE_SIZE,
        y: row * CELL_EDGE_SIZE
      };
    }

    /**
     * Get cell at position.
     * @param  {number} x
     * @param  {number} y
     * @return {Cell} Cell or undefined.
     */

  }, {
    key: 'getCellAtPosition',
    value: function getCellAtPosition(_ref) {
      var _this2 = this;

      var x = _ref.x,
          y = _ref.y;

      return this.cells.find(function (cell) {
        return _this2.context.isPointInPath(cell.path, x, y);
      });
    }

    /**
     * Set context style.
     * @param {string} fill - Fill color.
     * @param {string} stroke - Stroke color.
     * @param {number} lineWidth - Line width.
     */

  }, {
    key: 'setContextStyle',
    value: function setContextStyle(_ref2) {
      var fill = _ref2.fill,
          stroke = _ref2.stroke,
          lineWidth = _ref2.lineWidth;

      this.context.lineWidth = lineWidth;
      this.context.fillStyle = fill;
      this.context.strokeStyle = stroke;
    }
  }]);

  return Grid;
}();

exports.default = Grid;

/***/ }),
/* 5 */
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

var _squarePath = __webpack_require__(6);

var _coord = __webpack_require__(7);

var _coord2 = _interopRequireDefault(_coord);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Size of the (square) cell edge.
 * @type {number}
 */
var CELL_EDGE_SIZE = 50;

/**
 * Grid cell.
 */

var Cell = function () {
  /**
   * @param {number} row - Row number.
   * @param {number} col - Column number.
   * @param {Path2D} path - Cell path.
   * @param {Point} position - Cell position (upper left).
   */
  function Cell(row, col, position) {
    _classCallCheck(this, Cell);

    this.coord = new _coord2.default(row, col);
    this.position = position;
    this.path = (0, _squarePath.buildSquarePath)(position, CELL_EDGE_SIZE);
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
  }]);

  return Cell;
}();

exports.default = Cell;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildSquarePath = buildSquarePath;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/* global Path2D */

/**
 * @typedef {Object} Point
 * @property {number} x - The X Coordinate.
 * @property {number} y - The Y Coordinate.
 */

/**
 * Build a square path.
 * @param  {Point} startPosition
 * @param  {number} edgeSize
 * @return {Path2D}
 */
function buildSquarePath(startPosition, edgeSize) {
  var path = new Path2D();
  var startCorner = [startPosition.x, startPosition.y];
  var corners = [[startPosition.x + edgeSize, startPosition.y], [startPosition.x + edgeSize, startPosition.y + edgeSize], [startPosition.x, startPosition.y + edgeSize], [startPosition.x, startPosition.y]];
  path.moveTo.apply(path, startCorner);
  corners.forEach(function (corner) {
    path.lineTo.apply(path, _toConsumableArray(corner));
  });
  return path;
}

/***/ }),
/* 7 */
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

/***/ })
/******/ ]);