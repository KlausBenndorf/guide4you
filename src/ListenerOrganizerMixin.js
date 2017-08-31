import ol from 'openlayers'
import $ from 'jquery'

class DOMListener {
  constructor (element) {
    this.element = element
  }

  on (event, listener, useCapture) {
    this.event = event
    this.listener = listener
    this.useCapture = useCapture
    this.element.addEventListener(event, listener, useCapture)
  }

  once (event, listener, useCapture) {
    let that = this
    this.on(event, function (...args) {
      listener.apply(this, args)
      that.detach()
    }, useCapture)
  }

  detach () {
    this.element.removeEventListener(this.event, this.listener, this.useCapture)
  }

  static usable (element) {
    return element instanceof EventTarget // eslint-disable-line
  }

  static create (element) {
    return new DOMListener(element)
  }
}

class JQueryListener {
  constructor (element) {
    this.element = element
  }

  on (event, listener) {
    this.event = event
    this.listener = listener
    this.element.on(event, listener)
  }

  once (event, listener) {
    this.event = event
    this.listener = listener
    this.element.one(event, listener)
  }

  detach () {
    this.element.off(this.event, this.listener)
  }

  static usable (element) {
    return element instanceof $
  }

  static create (element) {
    return new JQueryListener(element)
  }
}

class OLListener {
  constructor (element) {
    this.element = element
  }

  on (event, listener) {
    this.event = event
    this.key_ = this.element.on(event, listener)
  }

  once (event, listener) {
    this.event = event
    this.key_ = this.element.once(event, listener)
  }

  detach () {
    ol.Observable.unByKey(this.key_)
  }

  static usable (element) {
    return element instanceof ol.Observable
  }

  static create (element) {
    return new OLListener(element)
  }
}

export class ListenerOrganizerMixin {
  initialize () {
    this.organizedListeners_ = []
  }

  static getTypeListener (element) {
    for (let TypeListener of [DOMListener, JQueryListener, OLListener]) {
      if (TypeListener.usable(element)) {
        return TypeListener.create(element)
      }
    }
  }

  listenAt (elements) {
    elements = Array.isArray(elements) ? elements : [elements]
    let returnObj = {
      on: (event, listener, useCapture) => {
        for (let element of elements) {
          let tListener = ListenerOrganizerMixin.getTypeListener(element)
          tListener.on(event, listener, useCapture)
          this.organizedListeners_.push(tListener)
        }
        return returnObj
      },
      once: (event, listener, useCapture) => {
        for (let element of elements) {
          let tListener = ListenerOrganizerMixin.getTypeListener(element)
          tListener.once(event, listener, useCapture)
          this.organizedListeners_.push(tListener)
        }
        return returnObj
      }
    }
    return returnObj
  }

  detachFrom (element, event) {
    let listeners = this.organizedListeners_.filter(l => l.element === element)
    if (event) {
      listeners = listeners.filter(l => l.event === event)
    }
    for (let listener of listeners) {
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
