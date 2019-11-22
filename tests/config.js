module.exports = {
  testClient: 'http://localhost:8089/dist/',
  mochaTimeout: 10000,
  testLayerIds: [0],
  seleniumTimeouts: {
    script: 5000,
    implicit: 1000,
    pageLoad: 5000
  }
}
