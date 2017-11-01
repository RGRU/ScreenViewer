import { expect } from 'chai';
import Rx from 'rxjs';
import screenViewer from '../src/scripts/modules/screenViewer';

describe('Модуль screenViewer.', () => {

    describe('# Метод getModuleName.', () => {

        it('Получить имя модуля.', () => {

            expect(screenViewer.getModuleName()).to.equal('ScreenViewer');

        });

    });

    describe('# Метод setup.', () => {

        it('Устанавливаем пользовательскую карту типов (screenMap). Должен вернуть новую карту', () => {

            const userScreenMap = {
                '768': 'mobile',
                '990': 'tablet',
                '1260': 'tabletLandscape',
                '1760': 'desktop',
                '1761': 'desktopFull'
            };

            screenViewer.setup(userScreenMap);

            expect(screenViewer.getScreenMap()).to.eql(userScreenMap);

        });

    });

    describe('# Метод init.', () => {

        it('Должен передаваться массив. Проверка на то, что это поток пока нет.', () => {

            expect(screenViewer.init$(['obs1', 'obs2', 'obs3'])).to.be.an('object');

        });

        it('Если ничего не передается, то ошибка.', () => {

            try {

                screenViewer.init$()

            } catch (error) {

                expect(error.message).to.equal(`Модуль ${screenViewer.getModuleName()}, в метод init$, должен передаваться массив с потоком`);

            }

        });

        it('Если передается не массив, то ошибка.', () => {

            try {

                screenViewer.init$({ msg: 'test' })

            } catch (error) {

                expect(error.message).to.equal(`Модуль ${screenViewer.getModuleName()}, в метод init$, должен передаваться массив с потоком`);

            }

        });

    });

    describe('# Определение типа экрана, по заданному значению.', () => {

        // Карта соответствия пограничных точек экрана и типов экрана
        const screenMap = {
                '768': 'mobile',
                '990': 'tablet',
                '1260': 'tabletLandscape',
                '1760': 'desktop',
                '1761': 'desktopFull'
            };

        Object.keys(screenMap).forEach(width => {

            let type = screenMap[width];

            it(`Если ширина меньше ${width}, значит ${type}.`, () => {

                screenViewer

                    // Задаем последовательность с шириной подходящей в отрезок
                    .init$([ Rx.Observable.of(width - 1) ])

                    // Сравниваем полученное и ожидаемое значениеs
                    .subscribe(data => expect(data.type).to.equal(type));

            });

        });

    });

});