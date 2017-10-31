// @flow

/**
 * @fileOverview Модуль отпределения типа экрана.
 * Метод init возвращает поток изменений типа на который можно подписаться.
 *
 * @author Alex
 */

import { Observable } from 'rxjs/Rx';

// Модуль потоков, в нем зашиты Observables через RxJS, подключается глобально

const

    /**
     * Имя модуля
     * @type {String}
     */
    __name__: string = 'ScreenViewer',

    /**
     * Карта типов разшенения, в зависимости от ширины экрана
     * @type {Object}
    */
    screenMap:  Object = { // ВСЕ ЧТО МЕНЬШЕ И РАВНО
        '768': 'mobile',
        '990': 'tablet',
        '1260': 'tabletLandscape',
        '1760': 'desktop',
        '1761': 'desktopFull'
    },

    /**
     * Массив точек перехода для экрана
     * @type {Array}
     */
    screenMapKeys: Array<string> = Object.keys(screenMap),

    /**
     * Поток из карты разрешений
     * @type {Rx}
     */
    screenMap$:  Object = Observable.from(screenMapKeys),

    /**
     * Получить имя модуля
     * @return {String} имя модуля
     */
    getModuleName = ():string => __name__;

export default {

    // Получить имя модуля
    getModuleName,

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
    init$: (observableList: Array<any>): Object => {

        if (!Array.isArray(observableList) || observableList.length < 1) {

            throw new Error(`Модуль ${__name__}, в метод init$, должен передаваться массив с потоком`);

        }

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

                    // Если после фильтрации, значения нет, подставляем по-умолчанию (desktopFull)
                    .defaultIfEmpty(screenMapKeys[screenMapKeys.length - 1])

                    // Забираем первое значение из потока
                    .first()

                    // Преобразуем в результирующий объект с параметрами
                    .map(widthOfMap => {

                        return {
                            width,
                            type: screenMap[widthOfMap]
                        };

                    });

            })

            // Фильтруем, пропуская только уникальные значения
            .distinctUntilChanged((prev, cur) => prev.type === cur.type);

    }

};