/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	__webpack_require__.p = "/codebase";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sass_app_scss__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sass_app_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__sass_app_scss__);

const calc = document.querySelector(".time");

const inputs = document.querySelectorAll("input[type=radio]");
const prices = {
    day: 3,
    three: 2,
    week: 1
};

const priceCont = document.querySelector("#price");
for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("change", e => {
        console.log(e.target);
        let id = e.target.id;
        let price = prices[id];
        priceCont.innerHTML = `${price} rub`;
    });
}

// accroditon

class Accord {
    constructor() {
        this.container = document.querySelector(".accordion");
        this.items = this.container.querySelectorAll(".accordion_item");
        this._init();
    }
    _init() {
        for (let i = 0; i < this.items.length; i++) {
            this.items[i].addEventListener("click", e => {
                this._hideOther(i);
                const item = this.items[i];
                const content = item.querySelector(".item_content");
                content.classList.toggle("open");
            });
        }
    }
    _hideOther(id) {
        for (let i = 0; i < this.items.length; i++) {
            if (id === i) continue;
            const item = this.items[i];
            const content = item.querySelector(".item_content");
            content.classList.toggle("open", false);
        }
    }
}
new Accord();

/***/ })
/******/ ]);