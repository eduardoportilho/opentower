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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _grid = __webpack_require__(1);

var _grid2 = _interopRequireDefault(_grid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.getElementById('canvas');
var grid = new _grid2.default(canvas);
grid.draw();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // ✔︎ - expose draw method
// draw grid
// draw object's paths (or call object draw)
// - towers
// - goons
// - bullets?
// receive user click and call game methods

/**
 * @typedef {Object} Point
 * @property {number} x The X Coordinate
 * @property {number} y The Y Coordinate
 */

var _squarePath = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Size of the (square) cell edge.
 * @type {number}
 */
var CELL_EDGE_SIZE = 50;

var Grid = function () {
  /**
   * Grid constructor
   * @param  {HTMLCanvasElement} canvas - HTML canvas.
   */
  function Grid(canvas) {
    _classCallCheck(this, Grid);

    this.canvas = canvas;
    this.rowCount = Math.floor(canvas.height / CELL_EDGE_SIZE);
    this.colCount = Math.floor(canvas.width / CELL_EDGE_SIZE);
  }

  /**
   * Draw the grid.
   */


  _createClass(Grid, [{
    key: 'draw',
    value: function draw() {
      var context = this.canvas.getContext('2d');

      context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      context.lineWidth = 0.5;
      context.fillStyle = 'lightgray';
      context.strokeStyle = 'gray';
      for (var row = 0; row < this.rowCount; row++) {
        for (var col = 0; col < this.rowCount; col++) {
          var cellStartPosition = this.getCellStartPoint(row, col);
          var path = (0, _squarePath.buildSquarePath)(cellStartPosition, CELL_EDGE_SIZE);
          context.fill(path);
          context.stroke(path);
        }
      }
    }

    /**
     * Get the cell start point (upper left).
     * @param  {number} row - Cell row.
     * @param  {number} col - Cell column.
     * @return {Point} Cell start point.
     */

  }, {
    key: 'getCellStartPoint',
    value: function getCellStartPoint(row, col) {
      return {
        x: col * CELL_EDGE_SIZE,
        y: row * CELL_EDGE_SIZE
      };
    }
  }]);

  return Grid;
}();

exports.default = Grid;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildSquarePath = buildSquarePath;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/* global Path2D */

function buildSquarePath(startPosition, edgeSize) {
  var path = new Path2D();
  var startCorner = [startPosition.x, startPosition.y];
  var corners = [[startPosition.x + edgeSize, startPosition.y], [startPosition.x + edgeSize, startPosition.y - edgeSize], [startPosition.x, startPosition.y - edgeSize], [startPosition.x, startPosition.y]];
  path.moveTo.apply(path, startCorner);
  corners.forEach(function (corner) {
    path.lineTo.apply(path, _toConsumableArray(corner));
  });
  return path;
}

/***/ })
/******/ ]);