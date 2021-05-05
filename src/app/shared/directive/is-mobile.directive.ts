import { Directive, ElementRef, OnInit, Input, Renderer2 } from '@angular/core';
import { ConfigService } from '@core/config/config.service';

@Directive({
  selector: '[appIsMobile]'
})
/**
 * @desctiption add is-mobile class when using Mobile device
 */
export class IsMobileDirective implements OnInit {

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private configService: ConfigService) { }

  ngOnInit() {
    const isMobile = this.configService.isMobile || this.configService.isTablet;

    if (isMobile) {
      this.addIsMobileClass();
    }
  }
  /** 加上Class */
  private addIsMobileClass() {
    this.renderer.addClass(this.el.nativeElement, 'is-mobile');
  }
}
