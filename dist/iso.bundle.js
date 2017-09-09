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
/******/ 	return __webpack_require__(__webpack_require__.s = 21);
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
/* 1 */,
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
/* 4 */
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
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  'meta': { maxWidth: 133 },
  'GRASS': { x: 1193, y: 0, width: 132, height: 99 },
  'PATH_SN': {
    x: 1325,
    y: 0,
    width: 132,
    height: 99,
    pathPoints: [{ x: 99, y: 20 }, { x: 34, y: 52 }]
  },
  'PATH_WE': { x: 928, y: 230, width: 132, height: 99 },
  'CURVE_SE': { x: 1720, y: 99, width: 132, height: 99 },
  'CURVE_NE': { x: 1060, y: 396, width: 132, height: 99 },
  'CURVE_WS': { x: 1060, y: 297, width: 132, height: 99 },
  'CURVE_WN': { x: 928, y: 329, width: 132, height: 99 },
  'crystal_l_r': { x: 1720, y: 198, width: 132, height: 112 },
  'crystal_b_t': { x: 1852, y: 114, width: 132, height: 121 },
  'crystal_t_b': { x: 0, y: 297, width: 133, height: 127 },
  'crystal_r_l': { x: 1852, y: 0, width: 132, height: 114 },
  'river_curve_tr_br': { x: 1192, y: 99, width: 132, height: 99 },
  'landscape_01': { x: 1061, y: 0, width: 132, height: 99 },
  'bridge_tl_br': { x: 1060, y: 198, width: 132, height: 99 },
  'landscape_05': { x: 1060, y: 99, width: 132, height: 99 },
  'landscape_06': { x: 929, y: 0, width: 132, height: 99 },
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
  'landscape_30': { x: 1456, y: 99, width: 132, height: 99 },
  'landscape_31': { x: 1324, y: 340, width: 132, height: 99 },
  'river_tr_bl': { x: 1588, y: 99, width: 132, height: 99 },
  'landscape_34': { x: 1588, y: 297, width: 132, height: 99 },
  'landscape_35': { x: 1588, y: 396, width: 132, height: 99 },
  'landscape_36': { x: 1589, y: 0, width: 132, height: 99 },
  'river_tl_br': { x: 0, y: 198, width: 133, height: 99 },
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
/* 8 */
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
  'tower_54': { x: 447, y: 307, width: 79, height: 79 },
  'spriteGroups': {
    'CASTLE': ['base_light-rect2x_dark_2br-left', 'middle_light-corner_dark-base_win-right', 'middle_light-corner_win-left', 'top_green-tri_white-top'],
    'TOWER': ['base_ld_3br', 'top_block_ld']
  }
};

/***/ }),
/* 9 */
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

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var GRASS = exports.GRASS = 'GRASS';
var PATH_SN = exports.PATH_SN = 'PATH_SN';
var PATH_WE = exports.PATH_WE = 'PATH_WE';
var CURVE_SE = exports.CURVE_SE = 'CURVE_SE';
var CURVE_WS = exports.CURVE_WS = 'CURVE_WS';
var CURVE_NE = exports.CURVE_NE = 'CURVE_NE';
var CURVE_WN = exports.CURVE_WN = 'CURVE_WN';
var CASTLE = exports.CASTLE = 'CASTLE';

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
    tile: GRASS,
    object: CASTLE,
    target: true
  }
};

/***/ }),
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* global requestAnimationFrame */

/**
 * @typedef {Object} Drawable
 * @property {Object} position
 * @property {number} position.x
 * @property {number} position.y
 * @property {function} draw
 */

var _imageCache = __webpack_require__(0);

var _isoGrid = __webpack_require__(22);

var _goon = __webpack_require__(28);

var _goon2 = _interopRequireDefault(_goon);

var _random = __webpack_require__(4);

var _random2 = _interopRequireDefault(_random);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CANVAS_WIDTH = 1400;
var CANVAS_HEIGHT = 800;

(0, _imageCache.loadImageCache)(init);

function init() {
  var canvas = document.getElementById('canvas');
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  var game = new Game(canvas);
  game.init();
}

var Game = function () {
  function Game(canvas) {
    _classCallCheck(this, Game);

    this.goons = [];
    this.context = canvas.getContext('2d');
    this.grid = new _isoGrid.IsoGrid(this, {
      width: canvas.width,
      height: canvas.height
    });
  }

  _createClass(Game, [{
    key: 'init',
    value: function init() {
      this.spanGoonOnRandomPosition();
      this.startLoop();
    }
  }, {
    key: 'startLoop',
    value: function startLoop() {
      this.lastTick = Date.now();
      this.animationId = requestAnimationFrame(this.tick.bind(this));
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

      this.update(delta);

      if (!this.animationId) {
        return;
      }
      this.lastTick = now;
      this.grid.drawGame(this.context);
      this.animationId = requestAnimationFrame(this.tick.bind(this));
    }
  }, {
    key: 'update',
    value: function update(delta) {
      this.goons.forEach(function (goon) {
        return goon.update(delta);
      });
    }
  }, {
    key: 'spanGoonOnRandomPosition',
    value: function spanGoonOnRandomPosition() {
      var spawnCell = _random2.default.getRandomElementFromArray(this.grid.getSpawnCells());
      var spawnPosition = this.grid.isoGridUtils.getCellSideCenter(spawnCell.row, spawnCell.col, _isoGrid.FLOOR_HEIGHT, 'south' // TODO: tiles can have different entry points
      );
      var goon = new _goon2.default();
      goon.position = spawnPosition;
      goon.cell = spawnCell;
      this.goons.push(goon);
    }
  }, {
    key: 'getDrawables',
    value: function getDrawables() {
      return this.goons;
    }
  }]);

  return Game;
}();

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IsoGrid = exports.FLOOR_HEIGHT = exports.CELL_HEIGHT = exports.CELL_WIDTH = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
// OR


var _imageCache = __webpack_require__(0);

var _drawingUtils = __webpack_require__(2);

var _isoGridUtils = __webpack_require__(23);

var _isoGridUtils2 = _interopRequireDefault(_isoGridUtils);

var _landscapeSheet = __webpack_require__(7);

var _landscapeSheet2 = _interopRequireDefault(_landscapeSheet);

var _towersGreySheet = __webpack_require__(8);

var _towersGreySheet2 = _interopRequireDefault(_towersGreySheet);

var _gameSheet = __webpack_require__(24);

var _gameSheet2 = _interopRequireDefault(_gameSheet);

var _landscape = __webpack_require__(25);

var _landscape2 = _interopRequireDefault(_landscape);

var _towersGrey = __webpack_require__(26);

var _towersGrey2 = _interopRequireDefault(_towersGrey);

var _gridConfig = __webpack_require__(10);

var _spriteSheet = __webpack_require__(9);

var _spriteSheet2 = _interopRequireDefault(_spriteSheet);

var _cell = __webpack_require__(27);

var _cell2 = _interopRequireDefault(_cell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// full: 128 x 64 x 32
var CELL_WIDTH = exports.CELL_WIDTH = 64;
var CELL_HEIGHT = exports.CELL_HEIGHT = 32;
var FLOOR_HEIGHT = exports.FLOOR_HEIGHT = -16;

var IsoGrid = exports.IsoGrid = function () {
  function IsoGrid(game, canvasSize) {
    _classCallCheck(this, IsoGrid);

    this.game = game;
    this.canvasSize = canvasSize;
    this.colCount = 10;
    this.rowCount = 8;
    this.origin = {
      x: canvasSize.width / 2,
      y: CELL_HEIGHT
    };
    this.isoGridUtils = new _isoGridUtils2.default(CELL_WIDTH, CELL_HEIGHT, this.origin);
    this.landscapeSheet = new _spriteSheet2.default(_imageCache.imageCache['landscape_sheet'], _landscapeSheet2.default, CELL_WIDTH);
    this.towersGreySheet = new _spriteSheet2.default(_imageCache.imageCache['towers_grey_sheet'], _towersGreySheet2.default, CELL_WIDTH);
    this.gameSheet = new _gameSheet2.default(CELL_WIDTH, FLOOR_HEIGHT);
    this._buildGrid();
  }

  _createClass(IsoGrid, [{
    key: '_buildGrid',
    value: function _buildGrid() {
      this.cells = [];
      for (var row = 0; row < this.rowCount; row++) {
        for (var col = 0; col < this.colCount; col++) {
          var tileConfig = _gridConfig.gridConfig[row + ',' + col];
          if (!tileConfig) {
            tileConfig = {
              tile: 'GRASS'
            };
          }
          this.cells.push(new _cell2.default({
            row: row,
            col: col,
            tile: tileConfig.tile,
            object: tileConfig.object,
            spawn: !!tileConfig.spawn,
            target: !!tileConfig.target
          }));
        }
      }
    }
  }, {
    key: 'drawGame',
    value: function drawGame(context) {
      var _this = this;

      this.cells.forEach(function (cell) {
        var row = cell.row,
            col = cell.col,
            tile = cell.tile,
            tileConfig = cell.tileConfig;
        // tile

        _this.gameSheet.draw(context, _this.isoGridUtils.getCellBottom(row, col), tile);

        // tile objects
        if (tileConfig && tileConfig.object) {
          _this.gameSheet.draw(context, _this.isoGridUtils.getCellBottom(row, col), tileConfig.object);
        }
      });

      // drawables
      var drawables = this.game.getDrawables();
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = drawables[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var drawable = _step.value;

          drawable.draw(context);
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
    key: 'drawSampleGrid',
    value: function drawSampleGrid(context) {
      // grid
      context.strokeStyle = '#cccccc';
      for (var row = 0; row < this.rowCount; row++) {
        for (var col = 0; col < this.colCount; col++) {
          var corners = this.isoGridUtils.getCellCorners(row, col);
          (0, _drawingUtils.polygon)(context, corners, false, true);
        }
      }

      // ladscape
      for (var _row = 0; _row < _landscape2.default.length; _row++) {
        var tileRow = _landscape2.default[_row];
        for (var _col = 0; _col < tileRow.length; _col++) {
          var tile = tileRow[_col];
          if (tile) {
            this.landscapeSheet.draw(context, this.isoGridUtils.getCellBottom(_row, _col), tile.spriteKey, tile.verticalOffset);
          }
        }
      }

      // tower
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = _towersGrey2.default[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var tower = _step2.value;

          this.towersGreySheet.drawStacked(context, this.isoGridUtils.getCellBottom(tower.row, tower.col), tower.tiles, FLOOR_HEIGHT);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }

    /**
     * @return {Cell[]} Array of spawn cell
     */

  }, {
    key: 'getSpawnCells',
    value: function getSpawnCells() {
      return this.cells.filter(function (cell) {
        return cell.spawn;
      });
    }
  }]);

  return IsoGrid;
}();

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var IsoGridUtils = function () {
  function IsoGridUtils(cellWidth, cellHeight, gridOrigin) {
    _classCallCheck(this, IsoGridUtils);

    this.cellWidth = cellWidth;
    this.cellHeight = cellHeight;
    this.gridOrigin = gridOrigin;
  }

  /**
   * Top (top-left) corner position for the cell.
   * @param  {number} row
   * @param  {number} col
   * @param  {number} verticalOffset - offset to added to the vertical coordinate (eg. floor height)
   * @return {Position} {x, y}
   */


  _createClass(IsoGridUtils, [{
    key: 'getCellOrigin',
    value: function getCellOrigin(row, col) {
      var verticalOffset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      // http://clintbellanger.net/articles/isometric_math/
      var halfHeigth = Math.round(this.cellHeight / 2);
      var halfWidth = Math.round(this.cellWidth / 2);
      return {
        x: (col - row) * halfWidth + this.gridOrigin.x,
        y: (col + row) * halfHeigth + this.gridOrigin.y + verticalOffset
      };
    }

    /**
     * Top, right, bottom and left corner positions for the cell.
     * @param  {number} row
     * @param  {number} col
     * @param  {number} verticalOffset - offset to added to the vertical coordinate (eg. floor height)
     * @return {Position[]} [{x, y}]
     */

  }, {
    key: 'getCellCorners',
    value: function getCellCorners(row, col) {
      var verticalOffset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      var cellOrigin = this.getCellOrigin(row, col, verticalOffset);
      var halfHeigth = Math.round(this.cellHeight / 2);
      var halfWidth = Math.round(this.cellWidth / 2);
      return [cellOrigin, { x: cellOrigin.x + halfWidth, y: cellOrigin.y + halfHeigth }, { x: cellOrigin.x, y: cellOrigin.y + this.cellHeight }, { x: cellOrigin.x - halfWidth, y: cellOrigin.y + halfHeigth }];
    }

    /**
     * Right (top-right) corner position for the cell.
     * @param  {number} row
     * @param  {number} col
     * @param  {number} verticalOffset - offset to added to the vertical coordinate (eg. floor height)
     * @return {Position} {x, y}
     */

  }, {
    key: 'getCellRight',
    value: function getCellRight(row, col) {
      var verticalOffset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      return this.getCellCorners(row, col, verticalOffset)[1];
    }

    /**
     * Bottom (bottom-right) corner position for the cell.
     * @param  {number} row
     * @param  {number} col
     * @param  {number} verticalOffset - offset to added to the vertical coordinate (eg. floor height)
     * @return {Position} {x, y}
     */

  }, {
    key: 'getCellBottom',
    value: function getCellBottom(row, col) {
      var verticalOffset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      return this.getCellCorners(row, col, verticalOffset)[2];
    }

    /**
     * Left (bottom-left) corner position for the cell.
     * @param  {number} row
     * @param  {number} col
     * @param  {number} verticalOffset - offset to added to the vertical coordinate (eg. floor height)
     * @return {Position} {x, y}
     */

  }, {
    key: 'getCellLeft',
    value: function getCellLeft(row, col) {
      var verticalOffset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      return this.getCellCorners(row, col, verticalOffset)[3];
    }

    /**
     * Center position for the cell.
     * @param  {number} row
     * @param  {number} col
     * @param  {number} verticalOffset - offset to added to the vertical coordinate (eg. floor height)
     * @return {Position} {x, y}
     */

  }, {
    key: 'getCellCenter',
    value: function getCellCenter(row, col) {
      var verticalOffset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      var origin = this.getCellOrigin(row, col, verticalOffset);
      return {
        x: origin.x,
        y: origin.y + Math.round(this.cellHeight / 2)
      };
    }

    /**
     * Get the position in the center of the cell side in the provided direction.
     * @param  {number} row
     * @param  {number} col
     * @param  {String} side - 'north', 'south', 'east' or 'west'
     * @return {Position} {x, y}
     */

  }, {
    key: 'getCellSideCenter',
    value: function getCellSideCenter(row, col) {
      var verticalOffset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var side = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'west';

      var origin = this.getCellOrigin(row, col, verticalOffset);
      if (side === 'north') {
        return {
          x: origin.x + Math.round(this.cellWidth / 4),
          y: origin.y + Math.round(this.cellHeight / 4)
        };
      } else if (side === 'east') {
        return {
          x: origin.x + Math.round(this.cellWidth / 4),
          y: origin.y + Math.round(3 * this.cellHeight / 4)
        };
      } else if (side === 'south') {
        return {
          x: origin.x - Math.round(this.cellWidth / 4),
          y: origin.y + Math.round(3 * this.cellHeight / 4)
        };
      } else if (side === 'west') {
        return {
          x: origin.x - Math.round(this.cellWidth / 4),
          y: origin.y - Math.round(this.cellHeight / 4)
        };
      }
    }
  }]);

  return IsoGridUtils;
}();

exports.default = IsoGridUtils;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _imageCache = __webpack_require__(0);

var _landscapeSheet = __webpack_require__(7);

var _landscapeSheet2 = _interopRequireDefault(_landscapeSheet);

var _towersGreySheet = __webpack_require__(8);

var _towersGreySheet2 = _interopRequireDefault(_towersGreySheet);

var _spriteSheet = __webpack_require__(9);

var _spriteSheet2 = _interopRequireDefault(_spriteSheet);

var _gridConfig = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var tilesConfig = {
  GRASS: {
    isLandscapeSheet: true,
    spriteKey: _gridConfig.GRASS
  },
  PATH_SN: {
    isLandscapeSheet: true,
    spriteKey: _gridConfig.PATH_SN
  },
  PATH_WE: {
    isLandscapeSheet: true,
    spriteKey: _gridConfig.PATH_WE
  },
  CURVE_SE: {
    isLandscapeSheet: true,
    spriteKey: _gridConfig.CURVE_SE
  },
  CURVE_WS: {
    isLandscapeSheet: true,
    spriteKey: _gridConfig.CURVE_WS
  },
  CURVE_NE: {
    isLandscapeSheet: true,
    spriteKey: _gridConfig.CURVE_NE
  },
  CURVE_WN: {
    isLandscapeSheet: true,
    spriteKey: _gridConfig.CURVE_WN
  },
  CASTLE: {
    isTowersSheet: true,
    spriteGroupKey: _gridConfig.CASTLE
  }
};

var GameSheet = function () {
  function GameSheet(cellWidth, floorHeight) {
    _classCallCheck(this, GameSheet);

    this.cellWidth = cellWidth;
    this.floorHeight = floorHeight;
    this.landscapeSheet = new _spriteSheet2.default(_imageCache.imageCache['landscape_sheet'], _landscapeSheet2.default, cellWidth);
    this.towersGreySheet = new _spriteSheet2.default(_imageCache.imageCache['towers_grey_sheet'], _towersGreySheet2.default, cellWidth);
  }

  _createClass(GameSheet, [{
    key: 'draw',
    value: function draw(context, bottomPoint, tileKey, verticalOffset) {
      var tileConfig = tilesConfig[tileKey];

      if (tileConfig.isLandscapeSheet) {
        this.landscapeSheet.draw(context, bottomPoint, tileConfig.spriteKey, verticalOffset);
      } else if (tileConfig.isTowersSheet) {
        var spriteKeys = _towersGreySheet2.default.spriteGroups[tileConfig.spriteGroupKey];
        this.towersGreySheet.drawStacked(context, bottomPoint, spriteKeys, this.floorHeight);
      }
    }
  }]);

  return GameSheet;
}();

exports.default = GameSheet;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = [[{ spriteKey: 'GRASS' }, { spriteKey: 'CURVE_SE' }, { spriteKey: 'PATH_WE' }, { spriteKey: 'PATH_WE' }, { spriteKey: 'CURVE_WS' }, { spriteKey: 'trees_2_t_b' }, { spriteKey: 'GRASS' }, { spriteKey: 'river_tr_bl' }, { spriteKey: 'GRASS' }, { spriteKey: 'GRASS' }], [{ spriteKey: 'trees_2_t_b' }, { spriteKey: 'PATH_SN' }, { spriteKey: 'GRASS' }, { spriteKey: 'rocks_2_r_l' }, { spriteKey: 'PATH_SN' }, { spriteKey: 'grass_ramp_tr_bl' }, { spriteKey: 'grass_ramp_diag_r_l' }, { spriteKey: 'river_tr_bl' }, { spriteKey: 'rocks_2_l_r' }, { spriteKey: 'PATH_SN' }], [{ spriteKey: 'GRASS' }, { spriteKey: 'PATH_SN' }, { spriteKey: 'GRASS' }, { spriteKey: 'GRASS' }, { spriteKey: 'PATH_SN' }, { spriteKey: 'grass_double_dirt' }, { spriteKey: 'grass_ramp_br_tl' }, { spriteKey: 'river_tr_bl' }, { spriteKey: 'trees_2_tr_tl' }, { spriteKey: 'PATH_SN' }], [{ spriteKey: 'GRASS' }, { spriteKey: 'PATH_SN' }, { spriteKey: 'GRASS' }, { spriteKey: 'crystal_b_t' }, { spriteKey: 'PATH_SN' }, { spriteKey: 'grass_ramp_bl_tr' }, { spriteKey: 'CURVE_SE' }, { spriteKey: 'bridge_tl_br' }, { spriteKey: 'PATH_WE' }, { spriteKey: 'CURVE_WN' }], [{ spriteKey: 'GRASS' }, { spriteKey: 'PATH_SN' }, { spriteKey: 'trees_2_t_b' }, { spriteKey: 'GRASS' }, { spriteKey: 'PATH_SN' }, { spriteKey: 'GRASS' }, { spriteKey: 'PATH_SN' }, { spriteKey: 'river_tr_bl' }, { spriteKey: 'crystal_r_l' }, { spriteKey: 'GRASS' }], [{ spriteKey: 'GRASS' }, { spriteKey: 'PATH_SN' }, { spriteKey: 'GRASS' }, { spriteKey: 'GRASS' }, { spriteKey: 'PATH_SN' }, { spriteKey: 'GRASS' }, { spriteKey: 'PATH_SN' }, { spriteKey: 'river_curve_tr_br' }, { spriteKey: 'river_tl_br' }, { spriteKey: 'river_tl_br' }], [{ spriteKey: 'GRASS' }, { spriteKey: 'PATH_SN' }, { spriteKey: 'GRASS' }, { spriteKey: 'GRASS' }, { spriteKey: 'PATH_SN' }, { spriteKey: 'GRASS' }, { spriteKey: 'PATH_SN' }, { spriteKey: 'trees_3_tr_tl_bl' }, { spriteKey: 'GRASS' }, { spriteKey: 'GRASS' }], [{ spriteKey: 'GRASS' }, { spriteKey: 'PATH_SN' }, { spriteKey: 'GRASS' }, { spriteKey: 'GRASS' }, { spriteKey: 'CURVE_NE' }, { spriteKey: 'PATH_WE' }, { spriteKey: 'CURVE_WN' }, { spriteKey: 'GRASS' }, { spriteKey: 'rocks_1_tl' }, { spriteKey: 'GRASS' }]];

/***/ }),
/* 26 */
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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cell = function Cell(_ref) {
  var row = _ref.row,
      col = _ref.col,
      tile = _ref.tile,
      object = _ref.object,
      _ref$spawn = _ref.spawn,
      spawn = _ref$spawn === undefined ? false : _ref$spawn,
      _ref$target = _ref.target,
      target = _ref$target === undefined ? false : _ref$target;

  _classCallCheck(this, Cell);

  this.row = row;
  this.col = col;
  this.tile = tile;
  this.object = object;
  this.spawn = spawn;
  this.target = target;
};

exports.default = Cell;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _imageCache = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GOON_IMAGE_SIZE = {
  width: 14,
  height: 20
};

var Goon = function () {
  function Goon() {
    _classCallCheck(this, Goon);

    // position of the bottom-left corner of the image
    this.position = null;
    this.cell = null;
  }

  _createClass(Goon, [{
    key: 'draw',
    value: function draw(context) {
      var img = _imageCache.imageCache['goon-1'];
      context.drawImage(img, this.position.x, this.position.y - GOON_IMAGE_SIZE.height);
    }
  }, {
    key: 'update',
    value: function update(delta) {}
  }]);

  return Goon;
}();

exports.default = Goon;

/***/ })
/******/ ]);
//# sourceMappingURL=iso.bundle.js.map