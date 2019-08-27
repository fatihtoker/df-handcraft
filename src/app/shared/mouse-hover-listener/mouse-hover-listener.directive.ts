import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';

@Directive({
  selector: '[appMouseHoverListener]'
})
export class MouseHoverListenerDirective {
  @Output() hoverChange = new EventEmitter();
  constructor() { }

  @HostListener('mouseover', ['$event.target'])
  onMouseEnter() {
    this.hoverChange.emit(true);
  }
  @HostListener('mouseleave', ['$event.target'])
  onMouseLeave() {
    this.hoverChange.emit(false);
  }
}
