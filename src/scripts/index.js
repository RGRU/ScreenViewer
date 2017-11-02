import { Observable } from 'rxjs/Rx'
import screenViewer from './modules/screenViewer'

/**
 * Список потоков, по изменению ширины страницы
 * @type {Array}
 */
const targetEventList = [

  /**
   * Поток данных по событию полной загрузки страницы
   * с фильтрацией корректной ширины
   *
   * @type {Rx}
   */
  Observable
    .fromEvent(window, 'load')
    .map(() => window.innerWidth),

  /**
   * Поток данных по событию DOMContentLoaded,
   * когда весь DOM загружен
   * с фильтрацией корректной ширины
   *
   * @type {Rx}
   */
  Observable
    .fromEvent(document, 'DOMContentLoaded')
    .map(event => event.target.innerWidth),

  /**
   * Поток данных по событию ресайза страницы
   * с фильтрацией корректной ширины
   *
   * @type {Rx}
   */
  Observable
    .fromEvent(window, 'resize')
    .map(event => event.target.innerWidth)

]

/**
 * Инициализируем модуль, сохраняя поток изменения типов экрана
 * @type {Rx}
 */
let screen$ = screenViewer.init$(targetEventList)

// Listen changes
screen$.subscribe(console.log)
