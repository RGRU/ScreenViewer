import { expect } from 'chai'
import Rx from 'rxjs'
import screenViewer from '../src/scripts/modules/screenViewer'

describe('Module screenViewer.', () => {
  describe('# Method getModuleName.', () => {
    it('Get module name', () => {
      expect(screenViewer.getModuleName()).to.equal('ScreenViewer')
    })
  })

  describe('# Method setup.', () => {
    it('Setup user screen map. Should return changed screen map', () => {
      const userScreenMap = {
        '768': 'mobile',
        '990': 'tablet',
        '1260': 'tabletLandscape',
        '1760': 'desktop',
        '1761': 'desktopFull'
      }

      screenViewer.setup(userScreenMap)

      expect(screenViewer.getScreenMap()).to.eql(userScreenMap)
    })
  })

  describe('# Method init.', () => {
    it('Init method expect an array.', () => {
      expect(screenViewer.init$(['obs1', 'obs2', 'obs3'])).to.be.an('object')
    })

    it('If do not pass an array to init method, throw error', () => {
      try {
        screenViewer.init$()
      } catch (error) {
        expect(error.message).to.equal(`Module ${screenViewer.getModuleName()}, to method init$, should pass an array with observables`)
      }
    });

    it('If pass not an array to init method, throw error', () => {
      try {
        screenViewer.init$({ msg: 'test' })
      } catch (error) {
        expect(error.message).to.equal(`Module ${screenViewer.getModuleName()}, to method init$, should pass an array with observables`)
      }
    });
  });

  describe('# Get screen type from getted value', () => {
    const screenMap = {
      '768': 'mobile',
      '990': 'tablet',
      '1260': 'tabletLandscape',
      '1760': 'desktop',
      '1761': 'desktopFull'
    }

    Object.keys(screenMap).forEach(width => {
      let type = screenMap[width]

      it(`If width less ${width}, so ${type}.`, () => {
        screenViewer

          // Setup observable
          .init$([ Rx.Observable.of(width - 1) ])

          // Expect getted values
          .subscribe(data => expect(data.type).to.equal(type))
      })
    })
  })
})