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
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
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
  'goon-1': '../images/goon-1.png',
  'landscape_sheet': '../images/landscape_sheet.png',
  'towers_grey_sheet': '../images/towers_grey_sheet.png'

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
exports.buildSquarePath = buildSquarePath;
exports.roundRect = roundRect;
exports.circle = circle;
exports.polygon = polygon;

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

/**
 * Draws a rounded rectangle using the current state of the canvas.
 * If you omit the last three params, it will draw a rectangle
 * outline with a 5 pixel border radius
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate
 * @param {Number} width The width of the rectangle
 * @param {Number} height The height of the rectangle
 * @param {Boolean} [fill = false] Whether to fill the rectangle.
 * @param {Boolean} [stroke = true] Whether to stroke the rectangle.
 * @param {Number} [radius = 5] The corner radius; It can also be an object
 *                 to specify different radii for corners
 * @param {Number} [radius.tl = 0] Top left
 * @param {Number} [radius.tr = 0] Top right
 * @param {Number} [radius.br = 0] Bottom right
 * @param {Number} [radius.bl = 0] Bottom left
 */
function roundRect(ctx, x, y, width, height, fill, stroke, radius) {
  if (typeof stroke === 'undefined') {
    stroke = true;
  }
  if (typeof radius === 'undefined') {
    radius = 5;
  }
  if (typeof radius === 'number') {
    radius = { tl: radius, tr: radius, br: radius, bl: radius };
  } else {
    var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
    for (var side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }
}

function circle(ctx, x, y, radius, fill, stroke) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  fill && ctx.fill();
  stroke && ctx.stroke();
}

function polygon(ctx, corners, fill, stroke) {
  ctx.beginPath();
  ctx.moveTo(corners[0].x, corners[0].y);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = corners[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var corner = _step.value;

      ctx.lineTo(corner.x, corner.y);
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

  ctx.closePath();
  fill && ctx.fill();
  stroke && ctx.stroke();
}

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FLOOR_HEIGHT = exports.CELL_HEIGHT = exports.CELL_WIDTH = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
// OR


var _imageCache = __webpack_require__(1);

var _drawingUtils = __webpack_require__(2);

var _landscapeSheet = __webpack_require__(18);

var _landscapeSheet2 = _interopRequireDefault(_landscapeSheet);

var _towersGreySheet = __webpack_require__(19);

var _towersGreySheet2 = _interopRequireDefault(_towersGreySheet);

var _landscape = __webpack_require__(20);

var _landscape2 = _interopRequireDefault(_landscape);

var _towersGrey = __webpack_require__(21);

var _towersGrey2 = _interopRequireDefault(_towersGrey);

var _gridConfig = __webpack_require__(22);

var _spriteSheet = __webpack_require__(23);

var _spriteSheet2 = _interopRequireDefault(_spriteSheet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// full: 128 x 64 x 32
var CELL_WIDTH = exports.CELL_WIDTH = 64;
var CELL_HEIGHT = exports.CELL_HEIGHT = 32;
var FLOOR_HEIGHT = exports.FLOOR_HEIGHT = 16;

var IsoGrid = function () {
  function IsoGrid(canvasSize) {
    _classCallCheck(this, IsoGrid);

    this.canvasSize = canvasSize;
    this.colCount = 10;
    this.rowCount = 8;
    this.origin = {
      x: canvasSize.width / 2,
      y: CELL_HEIGHT
    };
    this.landscapeSheet = new _spriteSheet2.default(_imageCache.imageCache['landscape_sheet'], _landscapeSheet2.default, CELL_WIDTH);
    this.towersGreySheet = new _spriteSheet2.default(_imageCache.imageCache['towers_grey_sheet'], _towersGreySheet2.default, CELL_WIDTH);
  }

  _createClass(IsoGrid, [{
    key: 'drawGame',
    value: function drawGame(context) {
      for (var row = 0; row < this.rowCount; row++) {
        for (var col = 0; col < this.colCount; col++) {
          var tile = 'GRASS';
          var tileConfig = _gridConfig.gridConfig[row + ',' + col];
          if (tileConfig) {
            tile = tileConfig.tile;
          }
          this.landscapeSheet.draw(context, this.getCellBottom(row, col), tile);
        }
      }
    }
  }, {
    key: 'drawSampleGrid',
    value: function drawSampleGrid(context) {
      // grid
      context.strokeStyle = '#cccccc';
      for (var row = 0; row < this.rowCount; row++) {
        for (var col = 0; col < this.colCount; col++) {
          var corners = this.getCellCorners(row, col);
          (0, _drawingUtils.polygon)(context, corners, false, true);
        }
      }

      // ladscape
      for (var _row = 0; _row < _landscape2.default.length; _row++) {
        var tileRow = _landscape2.default[_row];
        for (var _col = 0; _col < tileRow.length; _col++) {
          var tile = tileRow[_col];
          if (tile) {
            this.landscapeSheet.draw(context, this.getCellBottom(_row, _col), tile.spriteKey, tile.verticalOffset);
          }
        }
      }

      // tower
      var floorHeight = FLOOR_HEIGHT * -1;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _towersGrey2.default[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var tower = _step.value;

          this.towersGreySheet.drawStacked(context, this.getCellBottom(tower.row, tower.col), tower.tiles, floorHeight);
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
  }, {
    key: 'getCellCorners',
    value: function getCellCorners(row, col) {
      var cellOrigin = this.getCellOrigin(row, col);
      var halfHeigth = Math.round(CELL_HEIGHT / 2);
      var halfWidth = Math.round(CELL_WIDTH / 2);
      return [cellOrigin, { x: cellOrigin.x + halfWidth, y: cellOrigin.y + halfHeigth }, { x: cellOrigin.x, y: cellOrigin.y + CELL_HEIGHT }, { x: cellOrigin.x - halfWidth, y: cellOrigin.y + halfHeigth }];
    }
  }, {
    key: 'getCellOrigin',
    value: function getCellOrigin(row, col) {
      // http://clintbellanger.net/articles/isometric_math/
      var halfHeigth = Math.round(CELL_HEIGHT / 2);
      var halfWidth = Math.round(CELL_WIDTH / 2);
      return {
        x: (col - row) * halfWidth + this.origin.x,
        y: (col + row) * halfHeigth + this.origin.y
      };
    }
  }, {
    key: 'getCellBottom',
    value: function getCellBottom(row, col) {
      var origin = this.getCellOrigin(row, col);
      return {
        x: origin.x,
        y: origin.y + CELL_HEIGHT
      };
    }
  }]);

  return IsoGrid;
}();

(0, _imageCache.loadImageCache)(init);

function init() {
  var canvas = document.getElementById('canvas');
  canvas.width = 1400;
  canvas.height = 800;

  var context = canvas.getContext('2d');

  var isoGrid = new IsoGrid({
    width: 1400,
    height: 800
  });
  isoGrid.drawSampleGrid(context);
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  'meta': { maxWidth: 133 },
  'crystal_l_r': { x: 1720, y: 198, width: 132, height: 112 },
  'crystal_b_t': { x: 1852, y: 114, width: 132, height: 121 },
  'crystal_t_b': { x: 0, y: 297, width: 133, height: 127 },
  'crystal_r_l': { x: 1852, y: 0, width: 132, height: 114 },
  'river_curve_tr_br': { x: 1192, y: 99, width: 132, height: 99 },
  'landscape_01': { x: 1061, y: 0, width: 132, height: 99 },
  'CURVE_NE': { x: 1060, y: 396, width: 132, height: 99 },
  'CURVE_WS': { x: 1060, y: 297, width: 132, height: 99 },
  'bridge_tl_br': { x: 1060, y: 198, width: 132, height: 99 },
  'landscape_05': { x: 1060, y: 99, width: 132, height: 99 },
  'landscape_06': { x: 929, y: 0, width: 132, height: 99 },
  'CURVE_WN': { x: 928, y: 329, width: 132, height: 99 },
  'landscape_08': { x: 1852, y: 235, width: 132, height: 115 },
  'landscape_09': { x: 1720, y: 409, width: 132, height: 99 },
  'landscape_10': { x: 1720, y: 310, width: 132, height: 99 },
  'landscape_11': { x: 1456, y: 198, width: 132, height: 99 },
  'landscape_12': { x: 796, y: 313, width: 132, height: 99 },
  'grass_double': { x: 796, y: 214, width: 132, height: 99 },
  'landscape_14': { x: 665, y: 115, width: 132, height: 99 },
  'landscape_15': { x: 796, y: 412, width: 132, height: 99 },
  'grass_ramp_tr_bl': { x: 664, y: 317, width: 132, height: 99 },
  'dirt_single': { x: 664, y: 234, width: 132, height: 83 },
  'landscape_18': { x: 665, y: 0, width: 132, height: 115 },
  'landscape_19': { x: 532, y: 234, width: 132, height: 99 },
  'grass_ramp_bl_tr': { x: 532, y: 333, width: 132, height: 115 },
  'grass_single': { x: 0, y: 424, width: 132, height: 83 },
  'grass_double_dirt': { x: 928, y: 115, width: 132, height: 115 },
  'grass_ramp_br_tl': { x: 797, y: 0, width: 132, height: 115 },
  'landscape_24': { x: 1192, y: 198, width: 132, height: 99 },
  'landscape_25': { x: 1192, y: 297, width: 132, height: 99 },
  'grass_ramp_diag_r_l': { x: 1192, y: 396, width: 132, height: 99 },
  'landscape_27': { x: 1324, y: 225, width: 132, height: 115 },
  'GRASS': { x: 1193, y: 0, width: 132, height: 99 },
  'PATH_SN': { x: 1325, y: 0, width: 132, height: 99 },
  'landscape_30': { x: 1456, y: 99, width: 132, height: 99 },
  'landscape_31': { x: 1324, y: 340, width: 132, height: 99 },
  'PATH_WE': { x: 928, y: 230, width: 132, height: 99 },
  'river_tr_bl': { x: 1588, y: 99, width: 132, height: 99 },
  'landscape_34': { x: 1588, y: 297, width: 132, height: 99 },
  'landscape_35': { x: 1588, y: 396, width: 132, height: 99 },
  'landscape_36': { x: 1589, y: 0, width: 132, height: 99 },
  'river_tl_br': { x: 0, y: 198, width: 133, height: 99 },
  'CURVE_SE': { x: 1720, y: 99, width: 132, height: 99 },
  'landscape_39': { x: 1457, y: 0, width: 132, height: 99 },
  'rocks_2_r_l': { x: 0, y: 0, width: 133, height: 99 },
  'rocks_1_tl': { x: 0, y: 99, width: 133, height: 99 },
  'rocks_3': { x: 133, y: 0, width: 133, height: 102 },
  'rocks_4': { x: 133, y: 102, width: 133, height: 102 },
  'rocks_2_l_r': { x: 133, y: 204, width: 133, height: 99 },
  'rocks_6': { x: 133, y: 303, width: 133, height: 99 },
  'rocks_7': { x: 1588, y: 198, width: 132, height: 99 },
  'rocks_8': { x: 133, y: 402, width: 133, height: 99 },
  'trees_1': { x: 266, y: 241, width: 133, height: 111 },
  'trees_10': { x: 1456, y: 297, width: 132, height: 130 },
  'trees_11': { x: 266, y: 0, width: 133, height: 118 },
  'trees_2_t_b': { x: 266, y: 118, width: 133, height: 123 },
  'trees_3_tr_tl_bl': { x: 399, y: 127, width: 133, height: 121 },
  'trees_3': { x: 266, y: 352, width: 133, height: 113 },
  'trees_4': { x: 399, y: 0, width: 133, height: 127 },
  'trees_5': { x: 1324, y: 99, width: 132, height: 126 },
  'trees_6': { x: 399, y: 248, width: 133, height: 124 },
  'trees_7': { x: 399, y: 372, width: 133, height: 121 },
  'trees_2_tr_tl': { x: 532, y: 0, width: 133, height: 118 },
  'trees_9': { x: 532, y: 118, width: 133, height: 116 }
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  'meta': { maxWidth: 103 },
  'tower_00': { x: 187, y: 150, width: 89, height: 100 },
  'tower_01': { x: 447, y: 235, width: 79, height: 72 },
  'tower_02': { x: 684, y: 72, width: 79, height: 72 },
  'tower_03': { x: 0, y: 232, width: 95, height: 76 },
  'tower_04': { x: 0, y: 156, width: 95, height: 76 },
  'tower_05': { x: 103, y: 75, width: 90, height: 75 },
  'base_ld_3br': { x: 103, y: 0, width: 90, height: 75, offsetToTop: 35 },
  'tower_07': { x: 0, y: 0, width: 103, height: 78 },
  'tower_08': { x: 526, y: 217, width: 79, height: 72 },
  'tower_09': { x: 0, y: 78, width: 103, height: 78 },
  'tower_10': { x: 93, y: 308, width: 92, height: 75 },
  'tower_11': { x: 685, y: 286, width: 79, height: 72 },
  'tower_12': { x: 606, y: 307, width: 79, height: 70 },
  'tower_13': { x: 93, y: 383, width: 92, height: 75 },
  'tower_14': { x: 95, y: 156, width: 92, height: 75 },
  'tower_15': { x: 447, y: 156, width: 79, height: 79 },
  'tower_16': { x: 763, y: 149, width: 79, height: 72 },
  'tower_17': { x: 763, y: 79, width: 79, height: 70 },
  'tower_18': { x: 363, y: 229, width: 84, height: 73 },
  'tower_19': { x: 95, y: 231, width: 92, height: 75 },
  'tower_20': { x: 362, y: 424, width: 86, height: 74 },
  'tower_21': { x: 276, y: 103, width: 87, height: 82 },
  'tower_22': { x: 684, y: 214, width: 79, height: 72 },
  'tower_23': { x: 684, y: 144, width: 79, height: 70 },
  'base_lgrect_dk_2br': { x: 363, y: 302, width: 84, height: 73 },
  'middle_light-corner': { x: 610, y: 0, width: 79, height: 72, offsetToTop: 32 },
  'base_light-rect2x_dark_2br-left': { x: 363, y: 82, width: 86, height: 74, offsetToTop: 34 },
  'tower_27': { x: 274, y: 350, width: 89, height: 74 },
  'tower_28': { x: 605, y: 228, width: 79, height: 79 },
  'tower_29': { x: 605, y: 149, width: 79, height: 79 },
  'tower_30': { x: 605, y: 79, width: 79, height: 70 },
  'tower_31': { x: 363, y: 156, width: 84, height: 73 },
  'tower_32': { x: 527, y: 433, width: 79, height: 72 },
  'tower_33': { x: 527, y: 361, width: 79, height: 72 },
  'tower_34': { x: 185, y: 306, width: 89, height: 74 },
  'tower_35': { x: 185, y: 380, width: 89, height: 98 },
  'top_block_ld': { x: 282, y: 0, width: 87, height: 82 },
  'base_light-rect_dark_winl': { x: 369, y: 0, width: 83, height: 73, offsetToTop: 33 },
  'middle_light-corner_win-left': { x: 449, y: 73, width: 79, height: 72, offsetToTop: 31 },
  'tower_39': { x: 448, y: 386, width: 79, height: 72 },
  'tower_40': { x: 764, y: 221, width: 78, height: 72 },
  'top_green-tri_white-top': { x: 193, y: 0, width: 89, height: 103 },
  'tower_42': { x: 763, y: 0, width: 79, height: 79 },
  'tower_43': { x: 526, y: 289, width: 79, height: 72 },
  'middle_light-corner_dark-base_win-left': { x: 685, y: 430, width: 79, height: 72, offsetToTop: 31 },
  'tower_45': { x: 685, y: 358, width: 79, height: 72 },
  'tower_46': { x: 0, y: 308, width: 93, height: 98 },
  'tower_47': { x: 531, y: 0, width: 79, height: 79 },
  'middle_light-corner_dark-base_win-right': { x: 606, y: 377, width: 79, height: 72, offsetToTop: 31 },
  'tower_49': { x: 526, y: 145, width: 79, height: 72 },
  'tower_50': { x: 0, y: 406, width: 93, height: 98 },
  'tower_51': { x: 274, y: 424, width: 88, height: 82 },
  'tower_52': { x: 452, y: 0, width: 79, height: 72 },
  'tower_53': { x: 274, y: 250, width: 89, height: 100 },
  'tower_54': { x: 447, y: 307, width: 79, height: 79 }
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = [[{ spriteKey: 'GRASS' }, { spriteKey: 'CURVE_SE' }, { spriteKey: 'PATH_WE' }, { spriteKey: 'PATH_WE' }, { spriteKey: 'CURVE_WS' }, { spriteKey: 'trees_2_t_b' }, { spriteKey: 'GRASS' }, { spriteKey: 'river_tr_bl' }, { spriteKey: 'GRASS' }, { spriteKey: 'GRASS' }], [{ spriteKey: 'trees_2_t_b' }, { spriteKey: 'PATH_SN' }, { spriteKey: 'GRASS' }, { spriteKey: 'rocks_2_r_l' }, { spriteKey: 'PATH_SN' }, { spriteKey: 'grass_ramp_tr_bl' }, { spriteKey: 'grass_ramp_diag_r_l' }, { spriteKey: 'river_tr_bl' }, { spriteKey: 'rocks_2_l_r' }, { spriteKey: 'PATH_SN' }], [{ spriteKey: 'GRASS' }, { spriteKey: 'PATH_SN' }, { spriteKey: 'GRASS' }, { spriteKey: 'GRASS' }, { spriteKey: 'PATH_SN' }, { spriteKey: 'grass_double_dirt' }, { spriteKey: 'grass_ramp_br_tl' }, { spriteKey: 'river_tr_bl' }, { spriteKey: 'trees_2_tr_tl' }, { spriteKey: 'PATH_SN' }], [{ spriteKey: 'GRASS' }, { spriteKey: 'PATH_SN' }, { spriteKey: 'GRASS' }, { spriteKey: 'crystal_b_t' }, { spriteKey: 'PATH_SN' }, { spriteKey: 'grass_ramp_bl_tr' }, { spriteKey: 'CURVE_SE' }, { spriteKey: 'bridge_tl_br' }, { spriteKey: 'PATH_WE' }, { spriteKey: 'CURVE_WN' }], [{ spriteKey: 'GRASS' }, { spriteKey: 'PATH_SN' }, { spriteKey: 'trees_2_t_b' }, { spriteKey: 'GRASS' }, { spriteKey: 'PATH_SN' }, { spriteKey: 'GRASS' }, { spriteKey: 'PATH_SN' }, { spriteKey: 'river_tr_bl' }, { spriteKey: 'crystal_r_l' }, { spriteKey: 'GRASS' }], [{ spriteKey: 'GRASS' }, { spriteKey: 'PATH_SN' }, { spriteKey: 'GRASS' }, { spriteKey: 'GRASS' }, { spriteKey: 'PATH_SN' }, { spriteKey: 'GRASS' }, { spriteKey: 'PATH_SN' }, { spriteKey: 'river_curve_tr_br' }, { spriteKey: 'river_tl_br' }, { spriteKey: 'river_tl_br' }], [{ spriteKey: 'GRASS' }, { spriteKey: 'PATH_SN' }, { spriteKey: 'GRASS' }, { spriteKey: 'GRASS' }, { spriteKey: 'PATH_SN' }, { spriteKey: 'GRASS' }, { spriteKey: 'PATH_SN' }, { spriteKey: 'trees_3_tr_tl_bl' }, { spriteKey: 'GRASS' }, { spriteKey: 'GRASS' }], [{ spriteKey: 'GRASS' }, { spriteKey: 'PATH_SN' }, { spriteKey: 'GRASS' }, { spriteKey: 'GRASS' }, { spriteKey: 'CURVE_NE' }, { spriteKey: 'PATH_WE' }, { spriteKey: 'CURVE_WN' }, { spriteKey: 'GRASS' }, { spriteKey: 'rocks_1_tl' }, { spriteKey: 'GRASS' }]];

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = [{
  row: 0,
  col: 9,
  tiles: ['base_light-rect2x_dark_2br-left', 'middle_light-corner_dark-base_win-right', 'middle_light-corner_win-left', 'top_green-tri_white-top']
}, {
  row: 6,
  col: 2,
  tiles: ['base_ld_3br', 'top_block_ld']
}];

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var PATH_SN = exports.PATH_SN = 'PATH_SN';
var PATH_WE = exports.PATH_WE = 'PATH_WE';
var CURVE_SE = exports.CURVE_SE = 'CURVE_SE';
var CURVE_WS = exports.CURVE_WS = 'CURVE_WS';
var CURVE_NE = exports.CURVE_NE = 'CURVE_NE';
var CURVE_WN = exports.CURVE_WN = 'CURVE_WN';

var gridConfig = exports.gridConfig = {
  '7,1': {
    tile: PATH_SN,
    spawn: true
  },
  '6,1': { tile: PATH_SN },
  '5,1': { tile: PATH_SN },
  '4,1': { tile: PATH_SN },
  '3,1': { tile: PATH_SN },
  '2,1': { tile: PATH_SN },
  '1,1': { tile: PATH_SN },
  '0,1': { tile: CURVE_SE },
  '0,2': { tile: PATH_WE },
  '0,3': { tile: PATH_WE },
  '0,4': { tile: CURVE_WS },
  '1,4': { tile: PATH_SN },
  '2,4': { tile: PATH_SN },
  '3,4': { tile: PATH_SN },
  '4,4': { tile: PATH_SN },
  '5,4': { tile: PATH_SN },
  '6,4': { tile: PATH_SN },
  '7,4': { tile: CURVE_NE },
  '7,5': { tile: PATH_WE },
  '7,6': { tile: CURVE_WN },
  '6,6': { tile: PATH_SN },
  '5,6': { tile: PATH_SN },
  '4,6': { tile: PATH_SN },
  '3,6': { tile: CURVE_SE },
  '3,7': { tile: PATH_WE },
  '3,8': { tile: PATH_WE },
  '3,9': { tile: CURVE_WN },
  '2,9': { tile: PATH_SN },
  '1,9': { tile: PATH_SN },
  '0,9': {
    tile: PATH_SN,
    target: true
  }
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SpriteSheet = function () {
  function SpriteSheet(spriteSheetImage, spriteSheetMap, tileWidth) {
    _classCallCheck(this, SpriteSheet);

    this.image = spriteSheetImage;
    this.spriteSheetMap = spriteSheetMap;

    var meta = this.spriteSheetMap['meta'];
    var maxWidth = meta.maxWidth;
    this.scale = tileWidth / maxWidth;
  }

  _createClass(SpriteSheet, [{
    key: 'draw',
    value: function draw(context, bottomPoint, spriteKey) {
      var verticalOffset = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

      var sprite = this.spriteSheetMap[spriteKey];
      var dimensions = this.scaleToFit(sprite);

      var x = bottomPoint.x - Math.round(dimensions.width / 2);
      var y = bottomPoint.y - dimensions.height + verticalOffset;
      context.drawImage(this.image, sprite.x, sprite.y, sprite.width, sprite.height, x, y, dimensions.width, dimensions.height);
      return dimensions;
    }
  }, {
    key: 'drawStacked',
    value: function drawStacked(context, bottomPoint, spriteKeys) {
      var verticalOffset = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

      var stackHeight = verticalOffset;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = spriteKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var spriteKey = _step.value;

          var dimensions = this.draw(context, bottomPoint, spriteKey, stackHeight);
          stackHeight -= dimensions.offsetToTop;
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
  }, {
    key: 'scaleToFit',
    value: function scaleToFit(sprite) {
      var offsetToTop = sprite.offsetToTop || 0;
      return {
        width: Math.round(sprite.width * this.scale),
        height: Math.round(sprite.height * this.scale),
        offsetToTop: Math.round(offsetToTop * this.scale)
      };
    }
  }]);

  return SpriteSheet;
}();

exports.default = SpriteSheet;

/***/ })
/******/ ]);
//# sourceMappingURL=iso.bundle.js.map