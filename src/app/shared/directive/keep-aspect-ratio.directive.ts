import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Renderer2
} from '@angular/core';

/**
 * @desctiption Keep an element in a specific aspect ratio 
 * @params
 * - appKeepAspectRatio: the fix aspect ratio, appKeepAspectRatio="'width/height'" , ex. '1920/1080'
 * - relativeTo: relative to which parent, relativeTo= 'window' | 'parent-width' | 'parent-height'
 *   'window': base on window ( default )
 *   'parent-width': base on parent's max width 
 *   'parent-height' base on parent's max height
 * - refreshTrigger (OPTIONAL): able to trigger ngOnChanges outside of element (no needed if other input params change)
 * @example
 * <section [appKeepAspectRatio]="'1920/1080'"></section> => keep aspect ratio in 1920/1080, and base on window's size
 * <section [appKeepAspectRatio]="'1280/1080'" [relativeTo]="'parent-width'"></section> => keep aspect ratio in 1280/1080, and base on parent's max width
 */
@Directive({
  selector: '[appKeepAspectRatio]',
})
export class KeepAspectRatioDirective implements OnInit, OnChanges {
  @Input() appKeepAspectRatio: string;
  @Input() relativeTo = 'window';
  @Input() refreshTrigger: boolean;

  private aspectRatio: number;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateElementSize();
  }

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,) { }

  ngOnInit() {
    this.updateAspectRatio();
    this.updateElementSize();
  }

  ngOnChanges() {
    this.updateAspectRatio();
    this.updateElementSize();
  }

  private updateAspectRatio() {
    const ratioArray = this.appKeepAspectRatio.split('/');
    this.aspectRatio = parseFloat(ratioArray[0]) / parseFloat(ratioArray[1]);
  }

  private updateElementSize() {
    switch (this.relativeTo) {
      case 'window':
        this.updateStylesRelativeToWindow();
        break;
      case 'parent-width':
        this.updateStylesRelativeToParentWidth();
        break;
      case 'parent-height':
        this.updateStylesRelativeToParentHeight();
        break;
      default:
        break;
    }
  }
  private isNarrowScreen(): boolean {
    return (window.innerWidth / window.innerHeight) < this.aspectRatio;
  }
  private updateStylesRelativeToWindow() {
    this.isNarrowScreen() ?
      this.updateStylesRelativeToWindowWidth() :
      this.updateStylesRelativeToWindowHeight();
  }

  private updateStylesRelativeToParentWidth() {
    const parentWidth = this.el.nativeElement.parentNode.style.width;
    const styles = {
      width: '100%',
      height: `calc(${parentWidth} * 1/${this.aspectRatio})`,
    };
    this.addMultipleStyles(styles);
  }

  private updateStylesRelativeToParentHeight() {
    const parentHeight = this.el.nativeElement.parentNode.style.height;
    const styles = {
      width: `calc(${parentHeight} * ${this.aspectRatio})`,
      height: '100%',
    };
    this.addMultipleStyles(styles);
  }

  private updateStylesRelativeToWindowWidth() {
    const styles = {
      width: '100%',
      height: `calc(100vw * 1/${this.aspectRatio})`,
    };
    this.addMultipleStyles(styles);
  }

  private updateStylesRelativeToWindowHeight() {
    const styles = {
      width: `calc(100vh * ${this.aspectRatio})`,
      height: '100%',
    };
    this.addMultipleStyles(styles);
  }

  private addMultipleStyles(styles) {
    Object.keys(styles).forEach(newStyle => {
      this.renderer.setStyle(
        this.el.nativeElement, `${newStyle}`, styles[newStyle]);
    });
  }
}
