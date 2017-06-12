import ol from 'openlayers'
import $ from 'jquery'

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
    return element instanceof HTMLElement // eslint-disable-line
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
    return element instanceof $
  }
}

class OLListener {
  constructor (element, event, listener) {
    this.key_ = element.on(event, listener)
  }

  detach () {
    ol.Observable.unByKey(this.key_)
  }

  static usable (element) {
    return element instanceof ol.Observable
  }
}

export class ListenerOrganizerMixin {
  initialize () {
    this.organizedListeners_ = []
  }

  listenAt (elements) {
    elements = Array.isArray(elements) ? elements : [elements]
    let on = {
      on: (event, listener, useCapture) => {
        for (let element of elements) {
          for (let TypeListener of [DOMListener, JQueryListener, OLListener]) {
            if (TypeListener.usable(element)) {
              this.organizedListeners_.push(new TypeListener(element, event, listener, useCapture))
            }
          }
        }
        return on
      }
    }
    return on
  }

  detachFrom (element) {
    for (let listener of this.organizedListeners_.filter(l => l.element === element)) {
      listener.detach()
      this.organizedListeners_.splice(this.organizedListeners_.indexOf(listener), 1)
    }
  }

  detachAllListeners () {
    for (let listener of this.organizedListeners_) {
      listener.detach()
    }
    this.organizedListeners_ = []
  }
}
