import { debounce } from 'lodash/function'
import $ from 'jquery'
import { ButtonBox } from '../html/ButtonBox'
import { Element } from './Element'

export class GroupElement extends Element {
  constructor (layerSelector, config, map) {
    super(layerSelector, config, map)
    this.children_ = []
    this.makeExclusive_ = debounce(child => {
      for (const other of this.children_) {
        if (other !== child) {
          other.setActive(false)
        }
      }
    })
    this.deactivatable_ = config.deactivatable !== false
    this.buildGroup()
  }

  detach () {
    super.detach()
    for (const child of this.children_) {
      child.detach()
    }
  }

  addChild (child) {
    this.children_.push(child)
    child.on('update', () => {
      this.debouncedUpdate()
      if (this.config.hasOwnProperty('items') && this.config.items === 'exclusive' && child.getActive()) {
        this.makeExclusive_(child)
      }
    })
  }

  buildGroup () {
    if (this.config.hasOwnProperty('groupButton') && this.config.groupButton === 'noButton') {
      this.$element_ = $()
      for (const childConfig of this.config.buttons) {
        childConfig.deactivatable = this.deactivatable_
        const child = this.layerSelector.getElement(childConfig)
        this.addChild(child)
        this.$element_ = this.$element_.add(child.get$Element())
      }
    } else {
      this.activateChildren_ = this.config.hasOwnProperty('groupButton') && this.config.groupButton === 'activate'
      // TODO: where is categoryLayer.get('collapsed') used (or 'change:collapsed')

      const localiser = this.map.get('localiser')

      this.menu_ = new ButtonBox({
        className: 'g4u-layerselector-menu',
        title: localiser.selectL10N(this.config.title),
        rtl: localiser.isRtl(),
        titleButton: this.activateChildren_,
        collapsed: this.config.collapsed !== false,
        collapsible: this.config.collapsible !== false,
        addClass: this.config.addClass
      })

      this.$element_ = this.menu_.get$Element()

      this.listenAt(this.menu_).on('change:collapsed', () => {
        this.layerSelector.dispatchEvent('change:size')
      })

      if (this.activateChildren_) {
        this.listenAt(this.menu_).on('title:click', () => {
          this.setActive(!this.getAllActive())
        })
      }

      // TODO: menu set disabled ?

      for (const childConfig of this.config.buttons) {
        const child = this.layerSelector.getElement(childConfig)
        this.addChild(child)
        this.menu_.get$Body().append(child.get$Element())
      }

      this.debouncedUpdate()
    }
  }

  update () {
    if (this.menu_) {
      this.menu_.setCollapseButtonActive(this.getActive())
      if (this.activateChildren_) {
        this.menu_.setTitleButtonActive(this.getAllActive())
      }
    }
    super.update()
  }

  updateDisabled (zoom) {
    super.updateDisabled(zoom)
    for (const child of this.children_) {
      child.updateDisabled(zoom)
    }
    if (!this.deactivatable_ && !this.getActive()) {
      for (const child of this.children_) {
        if (!child.getDisabled()) {
          child.setActive(true)
          return
        }
      }
    }
  }

  getActive () {
    return this.children_.some(c => c.getActive())
  }

  getAllActive () {
    return this.children_.every(c => c.getActive())
  }

  getLoading () {
    return this.children_.some(c => c.getLoading())
  }

  setActive (active) {
    if (this.activateChildren_) {
      for (const child of this.children_) {
        child.setActive(active)
      }
    }
  }

  count () {
    return this.children_.reduce((p, n) => p + n.count(), 0)
  }
}
