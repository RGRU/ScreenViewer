// @flow

/**
 * @fileOverview Module for definition screen type by RxJS
 * For why? More comfortably using adaptive site created by screen types, than using particular sizes.
 * This addition absctract layer give to you flexible and maintainable.
 * How it works? Module define some kind of size (in this case it's screen width), that it receive and compare it with needed screen type.
 *
 * @author nanomen
 */

import { Observable } from 'rxjs/Rx'

/**
 * Type for screen map object
 */
type ScreenMapType = {
  map: Object,
  default: string
}

/**
 * Map of screen types dependensed of screen width
 * @type {Object}
*/
let __screenMap__: ScreenMapType = {

  // Common types
  // Everything is less
  map: {
    '768': 'mobile',
    '1280': 'tablet'
  },

  // Value as default
  default: 'desktop'
}

/**
 * Module name
 * @type {String}
 */
const __name__: string = 'ScreenViewer'

/**
 * Get module name
 * @return {String} module name
 */
const getModuleName = ():string => __name__

/**
 * Get common screen map
 * @return {Object} map
 */
const getScreenMap = (): Object => __screenMap__.map

/**
 * Get default screen type
 * @return {Object} default type
 */
const getScreenMapDefault = (): string => __screenMap__.default

/**
 * Setup user screen map
 *
 * @param  {Object} screenMap
 *
 * @return {Object} return new screen map
 */
const __setScreenMap__ = (screenMap: Object): Object => {
  __screenMap__ = screenMap

  return __screenMap__
}

/**
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
 */
const __init__ = (observableList: Array<any>): Object => {
  if (!Array.isArray(observableList) || observableList.length < 1) {
    throw new Error(`Module ${__name__}, to method init$, should pass an array with observables`)
  }

  /**
    * Map of screen types
    * @type {Object}
    */
  let screenMap = getScreenMap()

  /**
   * Screen type as default
   * @type {String}
   */
  let screenMapDefault = getScreenMapDefault()

  /**
    * Observable from screen map
    * @type {Rx}
    */
  let screenMap$

  // Setup screen types flow
  screenMap$ = Observable.from(
    Object.keys(screenMap)
  )

  /**
   * Association observable of widths (from merge passed observables)
   * @type {Rx}
   */
  return Observable

    // merge flows
    .merge(...observableList)

    // Filter null values (passed from first render page)
    .filter(width => !!width)

    // Переключаемся на поток из карты типов,
    // передаем в него текущую ширину браузера
    .switchMap(width => {
      return screenMap$

        // Фильтруем всех, кто больше, чем ширина браузера
        .filter(widthOfMap => width < +widthOfMap)

        // Преобразовываем значение в тип экрана,
        // если передается значение пустое, значит нужно подставлять тип по-умолчанию
        // говорит о том, что мы выше самой верхней границы типов
        .map(widthOfMap => widthOfMap ? screenMap[widthOfMap] : widthOfMap)

        // Если после фильтрации, значения нет, подставляем по-умолчанию (последний в списке)
        .defaultIfEmpty(screenMapDefault)

        // Забираем первое значение из потока
        .first()

        // Преобразуем в результирующий объект с параметрами
        .map(type => {
          return {
            width,
            type
          }
        })
    })

    // Фильтруем, пропуская только уникальные значения
    .distinctUntilChanged((prev, cur) => prev.type === cur.type)
}

const

  /**
   * Установить новую карту типов экрана
   *
   * @param  {Object} userScreenMap пользовательская карта разрешений
   *
   * @return {Function} возвращаем метод инициализации, формирую цепочку
   *
   */
  setup = (userScreenMap: Object): Object => {
    __setScreenMap__(userScreenMap)

    return __init__
  }

export default {

  // Get module name
  getModuleName,

  // Get common screen map
  getScreenMap,

  // Get default screen type
  getScreenMapDefault,

  // Setup user screen map
  setup,

  // module init
  init$: __init__

}
