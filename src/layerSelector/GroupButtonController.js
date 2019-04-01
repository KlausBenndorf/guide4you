import { ButtonController } from './ButtonController'

export class GroupButtonController extends ButtonController {
  constructor (props) {
    super(props)
    this.children_ = []
  }

  addChild (controller) {
    this.children_.push(controller)
    controller.on('change:active', () => {
      if (this.get('exclusive') && controller.getActive()) {
        for (const other of this.children_) {
          if (other !== controller && other.getActive()) {
            other.set('unselectable', true)
            other.toggleActive(false)
          }
        }
        controller.set('unselectable', this.get('unselectable'))
      }
      this.dispatchEvent('change:active')
    })
    if (controller.getActive()) {
      controller.set('unselectable', this.get('unselectable'))
    }
  }

  getActive () {
    return this.children_.some(c => c.getActive())
  }

  getAllActive () {
    return this.children_.every(c => c.getActive())
  }

  toggleActive (active) {
    active = active === undefined ? !this.getAllActive() : active
    if (this.get('unselectable') || active) {
      for (const child of this.children_) {
        child.toggleActive(active)
      }
      this.dispatchEvent('change:active')
    }
  }

  count () {
    return this.children_.reduce((p, n) => p + n.count(), 0)
  }
}
