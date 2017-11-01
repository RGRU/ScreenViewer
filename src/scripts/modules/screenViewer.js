// @flow

/**
 * @fileOverview Модуль отпределения типа экрана.
 * Метод init возвращает поток изменений типа на который можно подписаться.
 *
 * @author Alex
 */

import { Observable } from 'rxjs/Rx'

let

  /**
   * Карта типов разшенения, в зависимости от ширины экрана
   * @type {Object}
  */
  __screenMap__: Object = { // ВСЕ ЧТО МЕНЬШЕ И РАВНО
    '768': 'mobile',
    '990': 'tablet',
    '1260': 'tabletLandscape',
    '1760': 'desktop',
    '1761': 'desktopFull'
  }

const

  /**
   * Имя модуля
   * @type {String}
   */
  __name__: string = 'ScreenViewer'

const

  /**
   * Получить имя модуля
   * @return {String} имя модуля
   */
  getModuleName = ():string => __name__

const

  /**
   * Получить карту типов
   *
   * @return {Object} возвращаем карту типов
   */
  getScreenMap = (): Object => __screenMap__

const

  /**
   * Перезаписать карту типов
   *
   * @param  {Object} screenMap карта типов
   *
   * @return {Object} возвращаем обновленную карта типов
   */
  __setScreenMap__ = (screenMap: Object): Object => {
    __screenMap__ = screenMap

    return __screenMap__
  }

const

  /**
   * Инициализация модуля, вызываем при первом использовании
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
  __init__ = (observableList: Array<any>): Object => {
    if (!Array.isArray(observableList) || observableList.length < 1) {
      throw new Error(`Модуль ${__name__}, в метод init$, должен передаваться массив с потоком`)
    }

    let

      /**
        * Карта типов экрана
        * @type {Object}
        */
      screenMap = getScreenMap()

    let

      /**
        * Массив точек перехода для экрана
        * @type {Array}
        */
      screenMapKeys

    let

      /**
        * Поток из карты разрешений
        * @type {Rx}
        */
      screenMap$

    // Устанавливаем значения
    screenMapKeys = Object.keys(screenMap)
    screenMap$ = Observable.from(screenMapKeys)

    /**
     * Поток изменяемой ширины (приходит от совмещения других потоков)
     * @type {Rx}
     */
    return Observable

      // Совмещаем потоки
      .merge(...observableList)

      // Фильтруем пустые значения (появляются при первом событии браузера)
      .filter(width => !!width)

      // Переключаемся на поток из карты типов,
      // передаем в него текущую ширину браузера
      .switchMap(width => {
        return screenMap$

          // Фильтруем всех, кто больше, чем ширина браузера
          .filter(widthOfMap => width < +widthOfMap)

          // Если после фильтрации, значения нет, подставляем по-умолчанию (последний в списке)
          .defaultIfEmpty(screenMapKeys[screenMapKeys.length - 1])

          // Забираем первое значение из потока
          .first()

          // Преобразуем в результирующий объект с параметрами
          .map(widthOfMap => {
            return {
              width,
              type: screenMap[widthOfMap]
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

  // Получить имя модуля
  getModuleName,

  // Получить карту типов
  getScreenMap,

  // Установка пользовательской карты типов
  setup,

  // Инициализация модуля
  init$: __init__

}
