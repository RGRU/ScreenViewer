window["ScreenViewer"] =
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
Object.defineProperty(exports,"__esModule",{value:true});function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}/**
 * Map of screen types dependensed of screen width
 * @type {Object}
*/var __screenMap__={// Common types
// Everything is less
map:{'768':'mobile','1280':'tablet'},// Value as default
default:'desktop'/**
 * Module name
 * @type {String}
 */};/**
 * @fileOverview Module for definition screen type by RxJS
 * For why? More comfortably using adaptive site created by screen types, than using particular sizes.
 * This addition absctract layer give to you flexible and maintainable.
 * How it works? Module define some kind of size (in this case it's screen width), that it receive and compare it with needed screen type.
 *
 * @author nanomen
 */// import Rx from 'rxjs'
/**
 * Type for screen map object
 */var __name__='ScreenViewer';/**
 * Get module name
 * @return {String} module name
 */var getModuleName=function getModuleName(){return __name__;};/**
 * Get common screen map
 * @return {Object} map
 */var getScreenMap=function getScreenMap(){return __screenMap__.map;};/**
 * Get default screen type
 * @return {Object} default type
 */var getScreenMapDefault=function getScreenMapDefault(){return __screenMap__.default;};/**
 * Setup user screen map
 *
 * @param  {Object} screenMap
 *
 * @return {Object} return new screen map
 */var __setScreenMap__=function __setScreenMap__(screenMap){__screenMap__=screenMap;return __screenMap__;};/**
 * Method for init module, call for init observer
 *
 * @param {Array} observableList список потоков, обрабатывая которые, нужно проверять ширину экрана
 *                               по-умолчанию, передаем
 *
 *                               observable.on('load').map(() => window.innerWidth)
 *                               observable.on('ready').map(event => event.target.innerWidth)
 *                               observable.on('ready').map(event => event.target.innerWidth)
 *
 * @return {Rx} Поток изменяемой ширины и типов (приходит от совмещения других потоков)
 *              изменяется только тогда, когда меняется значение типа
 */var __init__=function __init__(observableList){var _Rx$Observable;if(!Array.isArray(observableList)||observableList.length<1){throw new Error('Module '+__name__+', to method init$, should pass an array with observables');}/**
    * Map of screen types
    * @type {Object}
    */var screenMap=getScreenMap();/**
   * Screen type as default
   * @type {String}
   */var screenMapDefault=getScreenMapDefault();/**
    * Observable from screen map
    * @type {Rx}
    */var screenMap$=void 0;// Setup screen types flow
screenMap$=Rx.Observable.from(Object.keys(screenMap));/**
   * Association observable of widths (from merge passed observables)
   * @type {Rx}
   */return(_Rx$Observable=Rx.Observable// merge flows
).merge.apply(_Rx$Observable,_toConsumableArray(observableList))// Filter null values (passed from first render page)
.filter(function(width){return!!width;})// Переключаемся на поток из карты типов,
// передаем в него текущую ширину браузера
.switchMap(function(width){return screenMap$// Фильтруем всех, кто больше, чем ширина браузера
.filter(function(widthOfMap){return width<+widthOfMap;})// Преобразовываем значение в тип экрана,
// если передается значение пустое, значит нужно подставлять тип по-умолчанию
// говорит о том, что мы выше самой верхней границы типов
.map(function(widthOfMap){return widthOfMap?screenMap[widthOfMap]:widthOfMap;})// Если после фильтрации, значения нет, подставляем по-умолчанию (последний в списке)
.defaultIfEmpty(screenMapDefault)// Забираем первое значение из потока
.first()// Преобразуем в результирующий объект с параметрами
.map(function(type){return{width:width,type:type};});})// Фильтруем, пропуская только уникальные значения
.distinctUntilChanged(function(prev,cur){return prev.type===cur.type;});};var/**
   * Установить новую карту типов экрана
   *
   * @param  {Object} userScreenMap пользовательская карта разрешений
   *
   * @return {Function} возвращаем метод инициализации, формирую цепочку
   *
   */setup=function setup(userScreenMap){__setScreenMap__(userScreenMap);return __init__;};exports.default={// Get module name
getModuleName:getModuleName,// Get common screen map
getScreenMap:getScreenMap,// Get default screen type
getScreenMapDefault:getScreenMapDefault,// Setup user screen map
setup:setup,// module init
init$:__init__};

/***/ })
/******/ ])["default"];