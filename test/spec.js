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
        map: {
          '768': 'mobile',
          '990': 'tablet'
        },
        default: 'desktop'
      }

      screenViewer.setup(userScreenMap)

      expect(screenViewer.getScreenMap()).to.eql(userScreenMap.map)
    })

    it('Setup user default type. Should return changed default type', () => {
      const userScreenMap = {
        map: {
          '768': 'mobile',
          '990': 'tablet'
        },
        default: 'desktop'
      }

      screenViewer.setup(userScreenMap)

      expect(screenViewer.getScreenMapDefault()).to.eql(userScreenMap.default)
    })

    // reset changes to default
    after(() => {
      screenViewer.setup({
        map: {
          '768': 'mobile',
          '990': 'tablet',
          '1260': 'tabletLandscape',
          '1760': 'desktop'
        },
        default: 'desktopFull'
      })
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
    [
      {
        width: '300',
        type: 'mobile'
      },
      {
        width: '800',
        type: 'tablet'
      },
      {
        width: '1100',
        type: 'tabletLandscape'
      },
      {
        width: '1300',
        type: 'desktop'
      },
      {
        width: '1800',
        type: 'desktopFull'
      }
    ].forEach(({ width, type }) => {

      it(`If width is ${width}, type expect is ${type}`, () => {
        screenViewer

          // Setup observable
          .init$([ Rx.Observable.of(width) ])

          // Expect getted values
          .subscribe(data => expect(data.type).to.equal(type))
      })
    })
  })
})