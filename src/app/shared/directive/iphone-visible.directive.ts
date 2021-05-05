import { Directive, Input, ElementRef, OnInit } from '@angular/core';
import { ConfigService } from '@core/config/config.service';

@Directive({
  selector: '[appIphoneVisible]'
})
/**
 * @desctiption control the visibility when using iPhone
 * @example
 * appIphoneVisible="hide" => hide when using iPhone 
 * appIphoneVisible="show => show when using iPhone
 */
export class IphoneVisibleDirective implements OnInit {
  /** hide/show */
  @Input() appIphoneVisible: string;

  constructor(
    private el: ElementRef,
    private configService: ConfigService) { }

  ngOnInit() {
    const isIphone = this.configService.deviceInfo.device === 'iPhone' ||
      this.configService.deviceInfo.device === 'iPad';
    const isHide = this.appIphoneVisible === 'hide';
    const hideInIphone = isIphone && isHide;
    const hideInOtherDevice = !isIphone && !isHide;

    if (hideInIphone || hideInOtherDevice) {
      this.hideElement();
    }
  }

  private hideElement() {
    this.el.nativeElement.remove();
  }
}
