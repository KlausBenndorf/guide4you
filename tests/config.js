export default {
  mochaTimeout: 10000,
  testClient: 'http://localhost:8089/dist/',
  testLayerIds: [ 0 ],
  seleniumTimeouts: {
    script: 1000,
    implicit: 1000,
    pageLoad: 5000
  }
  // testMiniMapConfigFile: 'conf/g4u-minimap.commented.json',
  // testLayerConfigFile: 'conf/g4u-layer.uncommented.json',
}
