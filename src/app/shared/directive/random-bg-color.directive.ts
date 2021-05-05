import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appRandomBgColor]'
})
export class RandomBgColorDirective implements AfterViewInit {

  @Input() giftId: any;

  dialogRandomBG = [
    'rgba(255,58,58,.6)',
    'rgba(44,175,70,.6)',
    'rgba(255,143,15,.6)',
    'rgba(58,168,255,.6)',
    'rgba(251,121,265,.6)',
    'rgba(249,28,145,.6)',
    'rgba(130,42,255,.6)',
    'rgba(255,231,0,.6)',
    'rgba(34,207,255,.6)',
    'rgba(0,210,186,.6)'
  ];

  constructor(private el: ElementRef,) { }

  ngAfterViewInit(): void {
    if (this.giftId !== undefined) {

      const numberColor = this.getRandomNumInt(0, 4);
      this.el.nativeElement.style.backgroundColor = this.dialogRandomBG[numberColor];

      if (this.el.nativeElement.querySelector('.name') !== null) {
        this.el.nativeElement.querySelector('.name').style.color = '#fff';
      }
    }
  }

  public getRandomNumInt(min: number, max: number) {
    const Range = max - min;
    const Rand = Math.random();
    return (min + Math.round(Rand * Range));
  }
}
