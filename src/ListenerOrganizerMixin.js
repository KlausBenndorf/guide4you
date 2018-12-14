import $ from 'jquery'
import Observable, { unByKey } from 'ol/Observable'

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
    unByKey(this.key_)
  }
}

export class ListenerOrganizerMixin {
  initialize () {
    this.organizedListeners_ = []
  }

  static getTypeListener (element) {
    if (element instanceof Observable) {
      return new OLListener(element)
    }
    if (element instanceof $) {
      return new JQueryListener(element)
    }
    if (element.addEventListener) {
      return new DOMListener(element)
    }
    throw new Error('no suitable listener interface found!')
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
