import ol from 'openlayers'

class DOMListener {
  constructor (element, event, listener, useCapture) {
    this.element = element
    this.event = event
    this.listener = listener
    this.useCapture = useCapture
    element.addEventListener(event, listener, useCapture)
  }

  detach () {
    this.element.removeEventListener(this.event, this.listener, this.useCapture)
  }

  static usable (element) {
    return element.addEventListener
  }
}

class JQueryListener {
  constructor (element, event, listener) {
    this.element = element
    this.event = event
    this.listener = listener
    element.on(event, listener)
  }

  detach () {
    this.element.off(this.event, this.listener)
  }

  static usable (element) {
    return element.on && element.off
  }
}

class OLListener {
  constructor (element, event, listener) {
    this.key_ = element.on(event, listener)
  }

  detach () {
    ol.Object.unByKey(this.key_)
  }

  static usable (element) {
    return element.on && element.un
  }
}

export class ListenerOrganizerMixin {
  initialize () {
    this.organizedListeners_ = []
  }

  listenAt (elements) {
    elements = Array.isArray(elements) ? elements : [elements]
    return {
      on: (event, listener, useCapture) => {
        for (let element of elements) {
          for (let TypeListener of [DOMListener, JQueryListener, OLListener]) {
            if (TypeListener.usable(element)) {
              this.organizedListeners_.push(new TypeListener(element, event, listener, useCapture))
            }
          }
        }
      }
    }
  }

  detachAllListeners () {
    for (let listener of this.organizedListeners_) {
      listener.detach()
    }
    this.organizedListeners_ = []
  }
}
