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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
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


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Point where the goons are heading to.
 * @type {Object}
 */
var TARGET_POS = {
  x: 600,
  y: 275

  /**
   * Grid size on X axis
   * @type {Number}
   */
};var GRID_SIZE_X = 600;

/**
 * Grid size on Y axis
 * @type {Number}
 */
var GRID_SIZE_Y = 600;

var PathFinder = function () {
  function PathFinder() {
    _classCallCheck(this, PathFinder);

    this.recalculate();
  }

  /**
   * Recalculate all paths
   */


  _createClass(PathFinder, [{
    key: "recalculate",
    value: function recalculate() {
      // init grid
      this.grid = new Array(GRID_SIZE_X + 1);
      for (var i = 0; i <= GRID_SIZE_X; i++) {
        this.grid[i] = new Array(GRID_SIZE_Y + 1);
      }
      // init bfs
      this.frontier = [TARGET_POS];
      this.grid[TARGET_POS.x][TARGET_POS.y] = _extends({ dist: 0, nextStep: undefined }, TARGET_POS);

      while (this.frontier.length > 0) {
        var current = this.frontier.shift();
        var neighbourPositions = this._neighbourPositions(current);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = neighbourPositions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var nPos = _step.value;

            var neighbour = _extends({}, nPos, { dist: current.dist + 1, nextStep: current });
            this.grid[nPos.x][nPos.y] = neighbour;
            this.frontier.push(neighbour);
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
     * Get the coordinate of the neighbours of the position that are
     * in the grid and not initialized.
     * @param  {Point} position
     * @return {Point[]}
     */

  }, {
    key: "_neighbourPositions",
    value: function _neighbourPositions(position) {
      var _this = this;

      return [{ x: position.x - 1, y: position.y }, { x: position.x, y: position.y - 1 }, { x: position.x + 1, y: position.y }, { x: position.x, y: position.y + 1 }].filter(function (nPos) {
        return nPos.x >= 0 && nPos.x <= GRID_SIZE_X && nPos.y >= 0 && nPos.y <= GRID_SIZE_Y && _this.grid[nPos.x][nPos.y] === undefined;
      });
    }

    /**
     * Get the next position in the path to the target
     * @param  {Point} position - Current position.
     * @param  {Number} steps - Number of steps to perform.
     * @return {Point}
     */

  }, {
    key: "nextPosition",
    value: function nextPosition(position) {
      var steps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      var nextStep = this.grid[position.x][position.y];
      while (steps-- > 0 && nextStep.nextStep) {
        nextStep = nextStep.nextStep;
      }
      return nextStep;
    }
  }]);

  return PathFinder;
}();

exports.default = new PathFinder();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _imageCache = __webpack_require__(0);

var _game = __webpack_require__(3);

var _game2 = _interopRequireDefault(_game);

var _grid = __webpack_require__(6);

var _grid2 = _interopRequireDefault(_grid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _imageCache.loadImageCache)(init);

function init() {
  var canvas = document.getElementById('canvas');
  var game = new _game2.default();
  var grid = new _grid2.default(canvas, game);
  grid.start();
}

/***/ }),
/* 3 */
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

var _tower = __webpack_require__(4);

var _tower2 = _interopRequireDefault(_tower);

var _goon = __webpack_require__(5);

var _goon2 = _interopRequireDefault(_goon);

var _pathFinder = __webpack_require__(1);

var _pathFinder2 = _interopRequireDefault(_pathFinder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    this.towers = [];
    this.goons = [];
    this.spawnedGoons = 0;

    this.intervalId = window.setInterval(this.spawnGoon.bind(this), 800);
  }

  /**
   * When a user lick a cell.
   * @param  {Point} position - Cell upper-left position.
   */


  _createClass(Game, [{
    key: 'onUserClick',
    value: function onUserClick(position) {
      this.towers.push(new _tower2.default(position));
      _pathFinder2.default.recalculate();
    }

    /**
     * Spawn a new goon.
     */

  }, {
    key: 'spawnGoon',
    value: function spawnGoon() {
      var spawnPosition = {
        x: 0,
        y: 100 + Math.floor(Math.random() * 400)
      };
      var id = Date.now();
      this.goons.push(new _goon2.default(id, spawnPosition, this));
      if (++this.spawnedGoons >= 10) {
        window.clearInterval(this.intervalId);
      }
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
     */

  }, {
    key: 'update',
    value: function update() {
      this.goons.forEach(function (goon) {
        return goon.update();
      });
    }
  }]);

  return Game;
}();

exports.default = Game;

/***/ }),
/* 4 */
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

  /**
   * Draw the goon on position.
   * @param  {CanvasRenderingContext2D} context - Canvas renderering context.
   */


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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _imageCache = __webpack_require__(0);

var _pathFinder = __webpack_require__(1);

var _pathFinder2 = _interopRequireDefault(_pathFinder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Goon = function () {
  function Goon(id, position, game) {
    _classCallCheck(this, Goon);

    this.id = id;
    this.position = position;
    this.game = game;
    this.stepsPerUpdate = 3;
  }

  /**
   * Draw the goon on position.
   * @param  {CanvasRenderingContext2D} context - Canvas renderering context.
   */


  _createClass(Goon, [{
    key: 'draw',
    value: function draw(context) {
      var img = _imageCache.imageCache['goon-1'];
      context.drawImage(img, this.position.x, this.position.y);
    }

    /**
     * Update goon state.
     */

  }, {
    key: 'update',
    value: function update() {
      var newPosition = _pathFinder2.default.nextPosition(this.position, this.stepsPerUpdate);
      if (newPosition) {
        this.position = newPosition;
      } else {
        this.game.removeGoon(this);
      }
    }
  }]);

  return Goon;
}();

exports.default = Goon;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* global requestAnimationFrame */

/**
 * @typedef {Object} Point
 * @property {number} x - The X Coordinate.
 * @property {number} y - The Y Coordinate.
 */

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

    // bind events
    this.canvas.onclick = this.onCanvasClick.bind(this);
  }

  /**
   * Start the game loop.
   */


  _createClass(Grid, [{
    key: 'start',
    value: function start() {
      this.animationId = requestAnimationFrame(this.tick.bind(this));
    }

    /**
     * Update state, render and restart the game loop every X ms.
     */

  }, {
    key: 'tick',
    value: function tick() {
      this.game.update();
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
  }]);

  return Grid;
}();

exports.default = Grid;

/***/ })
/******/ ]);