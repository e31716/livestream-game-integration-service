import { Directive, ElementRef, AfterViewInit, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[appRandomFloatPath]'
})
export class RandomFloatPathDirective implements AfterViewInit {
  @Input() indexNumber: any;
  pathList = ['animate-path-1', 'animate-path-2', 'animate-path-3'];

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    const pathNumber = this.indexNumber % 3;
    this.renderer.addClass(this.el.nativeElement, this.pathList[pathNumber]);
  }

  public getRandomNumInt(min: number, max: number) {
    const Range = max - min;
    const Rand = Math.random();
    return (min + Math.round(Rand * Range));
  }
}
