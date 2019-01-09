import { Debug } from '../Debug'

function parseLayerEntry(layerEntry, menu, layers) {
  if (layerEntry.type === 'Category') {
    const groupEntry = {
      type: 'group',
      title: layerEntry.title,
      buttons: []
    }
    if (layerEntry.activateChildren) {
      groupEntry.groupButton = 'activate'
      delete layerEntry.activateChildren
    }
    for (const childLayerEntry of layerEntry.layers) {
      parseLayerEntry(childLayerEntry, groupEntry.buttons, layers)
    }
    menu.push(groupEntry)
  } else if (layerEntry.type === 'WMS' || layerEntry.type === 'TileWMS') {
    layers.push(layerEntry)
    if (layerEntry.buttons) {
      const groupEntry = {
        type: 'group',
        buttons: layerEntry.buttons.map(b => {
          b.type = 'WMS'
          b.refId = layerEntry.id
          return b
        })
      }
      delete layerEntry.buttons
      if (!layerEntry.source.categoryButton) {
        groupEntry.groupButton = 'noButton'
      } else {
        delete layerEntry.source.categoryButton
        groupEntry.title = layerEntry.title
      }
      menu.push(groupEntry)
    } else {
      menu.push({
        type: 'layer',
        refId: layerEntry.id
      })
    }
  } else {
    layers.push(layerEntry)
    const menuEntry = {
      type: 'layer',
      refId: layerEntry.id
    }
    if (layerEntry.type === 'SilentGroup') {
      layerEntry.type = 'Group'
    }
    menu.push(menuEntry)
  }
}

export function layerConfigConverter (layerConfig) {
  if (!layerConfig.layers) {
    const newLayerConfig = {
      menus: {
        baseLayers: [
          {
            type: 'group',
            items: 'exclusive',
            groupButton: 'noButton',
            buttons: []
          }
        ],
        featureLayers: []
      },
      queryLayers: [], // TODO: parse query layers, fixedFeatureLayers
      layers: []
    }
    for (const layerEntry of layerConfig.baseLayers) {
      parseLayerEntry(layerEntry, newLayerConfig.menus.baseLayers[0].buttons, newLayerConfig.layers)
    }
    for (const layerEntry of layerConfig.featureLayers) {
      parseLayerEntry(layerEntry, newLayerConfig.menus.featureLayers, newLayerConfig.layers)
    }
    Debug.warn('You are using an old style layer configuration. You might consider updating it. ' +
      'Below is the transformed file content.')
    Debug.info(JSON.stringify(newLayerConfig, null, 2))
    return newLayerConfig
  } else {
    return layerConfig
  }
}