import { Element } from './Element'
import { LayerButton } from './LayerButton'

export class WMSLayerButton extends LayerButton {
  constructor (layerSelector, config, map) {
    super(layerSelector, config, map)
    if (this.layer_ && this.layer_.get('available')) {
      this.listenAt(this.layer_.getSource()).on(['change:layers', 'change:queryLayers'], () => {
        this.debouncedUpdate()
      })
    }
  }

  buildButton (title) {
    super.buildButton(title)

    // let $toggleFeatureInfo = $('<span>')
    //   .addClass(this.classNames_.featureInfo)
    // addTooltip($toggleFeatureInfo,
    //   this.getLocaliser().localiseUsingDictionary('LayerSelector featureInfo show'))

    // const updateFeatureInfoActive = () => {
    //   if (buttonController.getFeatureInfoActive()) {
    //     $toggleFeatureInfo.toggleClass(this.classNames_.featureInfoActive, true)
    //     changeTooltip($toggleFeatureInfo,
    //       this.getLocaliser().localiseUsingDictionary('LayerSelector featureInfo hide'))
    //   } else {
    //     $toggleFeatureInfo.toggleClass(this.classNames_.featureInfoActive, false)
    //     changeTooltip($toggleFeatureInfo,
    //       this.getLocaliser().localiseUsingDictionary('LayerSelector featureInfo show'))
    //   }
    // }
    // updateFeatureInfoActive()

    // this.listenAt(buttonController).on('change:featureInfoActive', updateFeatureInfoActive)
    //
    // if (buttonConfig.QUERY_LAYERS !== undefined) {
    //   $button.append($toggleFeatureInfo)
    //   this.listenAt($toggleFeatureInfo).on('click', e => {
    //     buttonController.toggleFeatureInfo()
    //     e.stopPropagation()
    //   })
    // }
  }

  getActive () {
    return this.layer_.getSource().areLayersActive(this.config.LAYERS)
  }

  setActive (active) {
    Element.prototype.setActive.call(this, active)
    if (active) {
      this.layer_.getSource().activateLayers(this.config.LAYERS)
    } else {
      this.layer_.getSource().deactivateLayers(this.config.LAYERS)
    }
    this.layer_.setVisible(this.layer_.getSource().anyLayerActive())
  }
}
