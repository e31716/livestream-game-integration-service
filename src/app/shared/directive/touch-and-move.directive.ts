import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appTouchAndMove]'
})
export class TouchAndMoveDirective {

  constructor(private el: ElementRef) {
  }
  @Output()
  public touchDown = new EventEmitter();
  @Output()
  public touchAndMove = new EventEmitter();

  private mouseDown: boolean = false;

  @HostListener('mouseup')
  onMouseup() {
    this.mouseDown = false;
  }

  @HostListener('mousemove', ['$event'])
  onMousemove(event: MouseEvent) {

    const mouseEven = {
      clientX: 0,
      clientY: 0
    };

    if (this.mouseDown) {
      mouseEven.clientX = event.clientX;
      mouseEven.clientY = event.clientY;
      this.touchAndMove.emit(mouseEven);
    }
  }

  @HostListener('mousedown', ['$event'])
  onMousedown(event) {
    const mouseEven = {
      clientX: 0,
      clientY: 0
    };
    if (!this.mouseDown) {
      mouseEven.clientX = event.clientX;
      mouseEven.clientY = event.clientY;
      this.touchDown.emit(mouseEven);
    }
    this.mouseDown = true;
  }

}
