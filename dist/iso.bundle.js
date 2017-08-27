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
/******/ ({

/***/ 1:
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
  'landscape_sheet': '../images/landscape_sheet.png'

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

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CELL_EDGE_SIZE = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _imageCache = __webpack_require__(1);

var _drawingUtils = __webpack_require__(2);

var _spriteSheet = __webpack_require__(18);

var _spriteSheet2 = _interopRequireDefault(_spriteSheet);

var _landscapeSheet = __webpack_require__(19);

var _landscapeSheet2 = _interopRequireDefault(_landscapeSheet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CELL_EDGE_SIZE = exports.CELL_EDGE_SIZE = 20;

var IsoGrid = function () {
  function IsoGrid(canvasSize) {
    _classCallCheck(this, IsoGrid);

    this.canvasSize = canvasSize;
    this.colCount = 20;
    this.rowCount = 20;
    this.origin = {
      x: canvasSize.width / 2,
      y: CELL_EDGE_SIZE
    };

    this.sprite = new _spriteSheet2.default(_imageCache.imageCache['landscape_sheet'], _landscapeSheet2.default, 2 * CELL_EDGE_SIZE, CELL_EDGE_SIZE);
  }

  _createClass(IsoGrid, [{
    key: 'draw',
    value: function draw(context) {
      // grid
      context.strokeStyle = '#cccccc';
      for (var row = 0; row < this.rowCount; row++) {
        for (var col = 0; col < this.colCount; col++) {
          var corners = this.getCellCorners(row, col);
          (0, _drawingUtils.polygon)(context, corners, false, true);
        }
      }

      // tiles
      var tileOrigin = this.getCellOrigin(1, 1);
      this.sprite.draw(context, tileOrigin, 'landscape_00');
    }
  }, {
    key: 'getCellCorners',
    value: function getCellCorners(row, col) {
      var cellOrigin = this.getCellOrigin(row, col);
      var halfEdge = Math.round(CELL_EDGE_SIZE / 2);
      return [cellOrigin, { x: cellOrigin.x + CELL_EDGE_SIZE, y: cellOrigin.y + halfEdge }, { x: cellOrigin.x, y: cellOrigin.y + CELL_EDGE_SIZE }, { x: cellOrigin.x - CELL_EDGE_SIZE, y: cellOrigin.y + halfEdge }];
    }
  }, {
    key: 'getCellOrigin',
    value: function getCellOrigin(row, col) {
      // http://clintbellanger.net/articles/isometric_math/
      return {
        x: (col - row) * CELL_EDGE_SIZE + this.origin.x,
        y: (col + row) * Math.round(CELL_EDGE_SIZE / 2) + this.origin.y
      };
    }
  }]);

  return IsoGrid;
}();

(0, _imageCache.loadImageCache)(init);

function init() {
  var canvas = document.getElementById('canvas');
  canvas.width = 1000;
  canvas.height = 1000;

  var context = canvas.getContext('2d');

  var isoGrid = new IsoGrid({
    width: 1000,
    height: 1000
  });
  isoGrid.draw(context);
}

/***/ }),

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SpriteSheet = function () {
  function SpriteSheet(spriteSheetImage, spriteSheetMap, tileWidth, tileHeight) {
    _classCallCheck(this, SpriteSheet);

    this.image = spriteSheetImage;
    this.spriteSheetMap = spriteSheetMap;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
  }

  _createClass(SpriteSheet, [{
    key: "draw",
    value: function draw(context, origin, spriteKey) {
      var sprite = this.spriteSheetMap[spriteKey];
      context.drawImage(this.image, sprite.x, sprite.y, sprite.width, sprite.height, origin.x, origin.y, this.tileWidth, // TODO: default values?
      this.tileHeight);
    }
  }]);

  return SpriteSheet;
}();

exports.default = SpriteSheet;

/***/ }),

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  'crystals_1': { x: '1720', y: '198', width: '132', height: '112' },
  'crystals_2': { x: '1852', y: '114', width: '132', height: '121' },
  'crystals_3': { x: '0', y: '297', width: '133', height: '127' },
  'crystals_4': { x: '1852', y: '0', width: '132', height: '114' },
  'landscape_00': { x: '1192', y: '99', width: '132', height: '99' },
  'landscape_01': { x: '1061', y: '0', width: '132', height: '99' },
  'landscape_02': { x: '1060', y: '396', width: '132', height: '99' },
  'landscape_03': { x: '1060', y: '297', width: '132', height: '99' },
  'landscape_04': { x: '1060', y: '198', width: '132', height: '99' },
  'landscape_05': { x: '1060', y: '99', width: '132', height: '99' },
  'landscape_06': { x: '929', y: '0', width: '132', height: '99' },
  'landscape_07': { x: '928', y: '329', width: '132', height: '99' },
  'landscape_08': { x: '1852', y: '235', width: '132', height: '115' },
  'landscape_09': { x: '1720', y: '409', width: '132', height: '99' },
  'landscape_10': { x: '1720', y: '310', width: '132', height: '99' },
  'landscape_11': { x: '1456', y: '198', width: '132', height: '99' },
  'landscape_12': { x: '796', y: '313', width: '132', height: '99' },
  'landscape_13': { x: '796', y: '214', width: '132', height: '99' },
  'landscape_14': { x: '665', y: '115', width: '132', height: '99' },
  'landscape_15': { x: '796', y: '412', width: '132', height: '99' },
  'landscape_16': { x: '664', y: '317', width: '132', height: '99' },
  'landscape_17': { x: '664', y: '234', width: '132', height: '83' },
  'landscape_18': { x: '665', y: '0', width: '132', height: '115' },
  'landscape_19': { x: '532', y: '234', width: '132', height: '99' },
  'landscape_20': { x: '532', y: '333', width: '132', height: '115' },
  'landscape_21': { x: '0', y: '424', width: '132', height: '83' },
  'landscape_22': { x: '928', y: '115', width: '132', height: '115' },
  'landscape_23': { x: '797', y: '0', width: '132', height: '115' },
  'landscape_24': { x: '1192', y: '198', width: '132', height: '99' },
  'landscape_25': { x: '1192', y: '297', width: '132', height: '99' },
  'landscape_26': { x: '1192', y: '396', width: '132', height: '99' },
  'landscape_27': { x: '1324', y: '225', width: '132', height: '115' },
  'landscape_28': { x: '1193', y: '0', width: '132', height: '99' },
  'landscape_29': { x: '1325', y: '0', width: '132', height: '99' },
  'landscape_30': { x: '1456', y: '99', width: '132', height: '99' },
  'landscape_31': { x: '1324', y: '340', width: '132', height: '99' },
  'landscape_32': { x: '928', y: '230', width: '132', height: '99' },
  'landscape_33': { x: '1588', y: '99', width: '132', height: '99' },
  'landscape_34': { x: '1588', y: '297', width: '132', height: '99' },
  'landscape_35': { x: '1588', y: '396', width: '132', height: '99' },
  'landscape_36': { x: '1589', y: '0', width: '132', height: '99' },
  'landscape_37': { x: '0', y: '198', width: '133', height: '99' },
  'landscape_38': { x: '1720', y: '99', width: '132', height: '99' },
  'landscape_39': { x: '1457', y: '0', width: '132', height: '99' },
  'rocks_1': { x: '0', y: '0', width: '133', height: '99' },
  'rocks_2': { x: '0', y: '99', width: '133', height: '99' },
  'rocks_3': { x: '133', y: '0', width: '133', height: '102' },
  'rocks_4': { x: '133', y: '102', width: '133', height: '102' },
  'rocks_5': { x: '133', y: '204', width: '133', height: '99' },
  'rocks_6': { x: '133', y: '303', width: '133', height: '99' },
  'rocks_7': { x: '1588', y: '198', width: '132', height: '99' },
  'rocks_8': { x: '133', y: '402', width: '133', height: '99' },
  'trees_1': { x: '266', y: '241', width: '133', height: '111' },
  'trees_10': { x: '1456', y: '297', width: '132', height: '130' },
  'trees_11': { x: '266', y: '0', width: '133', height: '118' },
  'trees_12': { x: '266', y: '118', width: '133', height: '123' },
  'trees_2': { x: '399', y: '127', width: '133', height: '121' },
  'trees_3': { x: '266', y: '352', width: '133', height: '113' },
  'trees_4': { x: '399', y: '0', width: '133', height: '127' },
  'trees_5': { x: '1324', y: '99', width: '132', height: '126' },
  'trees_6': { x: '399', y: '248', width: '133', height: '124' },
  'trees_7': { x: '399', y: '372', width: '133', height: '121' },
  'trees_8': { x: '532', y: '0', width: '133', height: '118' },
  'trees_9': { x: '532', y: '118', width: '133', height: '116' }
};

/***/ }),

/***/ 2:
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

/***/ })

/******/ });
//# sourceMappingURL=iso.bundle.js.map