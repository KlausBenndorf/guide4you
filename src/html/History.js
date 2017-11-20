export class History {
  constructor () {
    this.callbacks_ = []

    if (window.history.state !== 'future') {
      window.history.replaceState('base', '')
      window.history.pushState('future', '')
    }

    window.addEventListener('popstate', e => {
      if (e.state === 'base') {
        let cb = this.callbacks_.pop()
        if (cb) {
          cb.call()
          window.history.forward()
        } else {
          window.history.back()
        }
      }
    })
  }

  push (callback) {
    this.callbacks_.push(callback)
  }

  pop () {
    this.callbacks_.pop()()
  }

  flush () {
    while (this.callbacks_.length) {
      this.pop()
    }
  }
}
