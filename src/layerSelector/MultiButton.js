import { difference, uniq, zip } from 'lodash/array'
import { isEmpty } from 'lodash/lang'
import { CheckGroup } from '../html/CheckGroup'
import { Button } from './Button'

export class MultiButton extends Button {
  constructor (layerSelector, config, map) {
    super(layerSelector, config, map)
    this.layers_ = {}
    this.config.accordion = this.config.accordion || []
    this.checkedParams_ = {}
    this.currentConfig_ = {}
    this.checkGroups_ = {}
    this.active_ = false

    const refIds = uniq(this.config.configs.map(c => c.refId).filter(r => r !== undefined))
    for (const refId of refIds) {
      const layer = map.getLayerGroup().getLayerById(refId)
      this.listenAt(layer).on(['change:visible', 'loadcountstart', 'loadcountend'], () => {
        this.debouncedUpdate()
      })
      this.listenAt(layer.getSource()).on(['change:layers', 'change:queryLayers'], () => {
        this.debouncedUpdate()
      })
      this.layers_[refId] = layer
    }

    this.buildButton(this.config.title)
    this.debouncedUpdate()
  }

  setParam (name, value) {
    this.checkedParams_[name] = value
    if (this.getActive()) {
      this.updateLayers(true, true)
    }
  }

  buildButton (text) {
    super.buildButton(text)

    for (const control of this.config.controls) {
      this.setParam(control.name, [control.values[0]])
      const checkGroup = new CheckGroup(control.type, zip(control.titles, control.values), control.title)
      checkGroup.on('change:value', () => {
        this.setParam(control.name, checkGroup.getValues())
      })
      this.checkGroups_[control.name] = checkGroup
      this.accordion.addEntry(checkGroup.get$Element(), checkGroup.getSize())
    }
  }

  update () {
    super.update()

    for (const name of Object.keys(this.checkGroups_)) {
      this.checkGroups_[name].setValues(this.checkedParams_[name])
    }

    if (this.config.toggleAccordion) {
      this.accordion.setVisible(this.getActive())
    }
  }

  updateLayers (on, off) {
    const oldConfig = this.currentConfig_
    if (off && oldConfig.refId !== undefined) {
      const layer = this.layers_[oldConfig.refId]
      if (oldConfig.LAYERS) {
        layer.getSource().deactivateLayers(oldConfig.LAYERS)
      }
      if (oldConfig.QUERY_LAYERS) {
        layer.getSource().deactivateQueryLayers(oldConfig.QUERY_LAYERS)
      }
    }

    const newConfig = this.getMatchingConfig()
    if (on && newConfig.refId !== undefined) {
      const layer = this.layers_[newConfig.refId]
      if (newConfig.LAYERS) {
        layer.getSource().activateLayers(newConfig.LAYERS)
      }
      if (newConfig.QUERY_LAYERS) {
        layer.getSource().activateQueryLayers(newConfig.QUERY_LAYERS)
      }
    }

    this.currentConfig_ = newConfig

    for (const layer of Object.values(this.layers_)) {
      if (this.getActive()) {
        layer.setVisible(layer.getSource().anyLayerActive())
      } else {
        layer.setVisible(false)
      }
    }
  }

  setActive (active) {
    super.setActive(active)
    this.active_ = active

    if (active) {
      this.updateLayers(true, false)
    } else {
      this.updateLayers(false, true)
    }
  }

  getActive () {
    return this.active_
  }

  checkCondition (condition) {
    for (const name of Object.keys(condition)) {
      if (!isEmpty(difference(condition[name], this.checkedParams_[name]))) {
        return false
      }
    }
    return true
  }

  getMatchingConfig () {
    const match = {}
    for (const config of this.config.configs) {
      if (this.checkCondition(config.condition)) {
        Object.assign(match, config)
      }
    }
    return match
  }
}
