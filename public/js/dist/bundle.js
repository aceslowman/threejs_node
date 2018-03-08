/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1]
/******/ 		var executeModules = data[2];
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fullfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fullfilled = false;
/******/ 			}
/******/ 			if(fullfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./public/js/main.js","common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/js/SceneManager.js":
/*!***********************************!*\
  !*** ./public/js/SceneManager.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _three = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");

var THREE = _interopRequireWildcard(_three);

var _SceneSubject = __webpack_require__(/*! ./sceneSubjects/SceneSubject */ "./public/js/sceneSubjects/SceneSubject.js");

var _SceneSubject2 = _interopRequireDefault(_SceneSubject);

var _BoundBox = __webpack_require__(/*! ./sceneSubjects/BoundBox */ "./public/js/sceneSubjects/BoundBox.js");

var _BoundBox2 = _interopRequireDefault(_BoundBox);

var _PointLight = __webpack_require__(/*! ./sceneSubjects/PointLight */ "./public/js/sceneSubjects/PointLight.js");

var _PointLight2 = _interopRequireDefault(_PointLight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/*
  This file is responsible for high level actions

  1. create Scene, Renderer, and Camera
  2. Initialize SceneSubjects
  3. Update everything every frame
*/

var SceneManager = function SceneManager() {
  var scene = buildScene();
  var renderer = buildRenderer();
  var camera = buildCamera();
  var sceneSubjects = createSceneSubjects();

  function buildScene() {
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    return scene;
  }

  function buildRenderer() {
    var renderer = new THREE.WebGLRenderer({
      'antialias': true,
      'alpha': true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    return renderer;
  }

  function buildCamera() {
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 2;

    return camera;
  }

  function createSceneSubjects() {
    var sceneSubjects = [];
    sceneSubjects.push(new _PointLight2.default(scene));
    sceneSubjects.push(new _BoundBox2.default(scene));

    return sceneSubjects;
  }

  this.update = function () {
    for (var i = 0; i < sceneSubjects.length; i++) {
      sceneSubjects[i].update();
    }

    renderer.render(scene, camera);
  };

  this.onWindowResize = function () {
    var width = window.innerWidth;
    var height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
  };
};

exports.default = SceneManager;

/***/ }),

/***/ "./public/js/main.js":
/*!***************************!*\
  !*** ./public/js/main.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _three = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");

var THREE = _interopRequireWildcard(_three);

var _SceneManager = __webpack_require__(/*! ./SceneManager */ "./public/js/SceneManager.js");

var _SceneManager2 = _interopRequireDefault(_SceneManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var canvas = document.getElementById('canvas');
var sceneManager = new _SceneManager2.default(canvas);

bindEventListeners();
render();

function render() {
  requestAnimationFrame(render);
  sceneManager.update();
}

function bindEventListeners() {
  window.addEventListener('resize', sceneManager.onWindowResize, false);
}

/***/ }),

/***/ "./public/js/sceneSubjects/BoundBox.js":
/*!*********************************************!*\
  !*** ./public/js/sceneSubjects/BoundBox.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _three = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");

var THREE = _interopRequireWildcard(_three);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var BoundBox = function BoundBox(scene) {
  var geometry = setGeometry();
  var material = setMaterial();

  var mesh = new THREE.Mesh(geometry, material);

  function setGeometry() {
    var geometry = new THREE.BoxBufferGeometry(1, 1, 1);

    return geometry;
  }

  function setMaterial() {
    var material = new THREE.MeshNormalMaterial();

    return material;
  }

  this.update = function () {
    mesh.rotation.x += 0.009;
    mesh.rotation.y += 0.009;
  };

  scene.add(mesh);
};

exports.default = BoundBox;

/***/ }),

/***/ "./public/js/sceneSubjects/PointLight.js":
/*!***********************************************!*\
  !*** ./public/js/sceneSubjects/PointLight.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _three = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");

var THREE = _interopRequireWildcard(_three);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var PointLight = function PointLight(scene) {
  var light = new THREE.PointLight(0xffffff, 1.5);
  light.position.set(1, 1, 1);

  this.update = function () {
    // do something
  };

  scene.add(light);
};

exports.default = PointLight;

/***/ }),

/***/ "./public/js/sceneSubjects/SceneSubject.js":
/*!*************************************************!*\
  !*** ./public/js/sceneSubjects/SceneSubject.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _three = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");

var THREE = _interopRequireWildcard(_three);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var SceneSubject = function SceneSubject(scene) {
  var mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);

  this.update = function () {
    // do something
  };
};

exports.default = SceneSubject;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map