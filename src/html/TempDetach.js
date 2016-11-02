export class TempDetach {
  constructor ($element) {
    this.$element = $element
    this.$oldParent = $element.parent()
    this.oldIndex = this.$oldParent.children().index($element)
    this.oldPosition = $element.css('position')
    $element.detach()
    $element.css('position', 'static')
  }

  restore () {
    if (this.oldIndex === 0) {
      this.$oldParent.prepend(this.$element)
    } else {
      this.$oldParent.children().eq(this.oldIndex - 1).after(this.$element)
    }
    this.$element.css('position', this.oldPosition)
    return this.$element
  }
}
