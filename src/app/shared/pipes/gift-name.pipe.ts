import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'giftName'
})
/** For translation of gift name */
export class GiftNamePipe implements PipeTransform {

  transform(value: string, ...args: any[]): string {
    const giftNames = value.split('#');
    const langCode = this.detectLanguage();
    return giftNames[langCode];
  }


  detectLanguage(): number {
    const localization = {
      'zh-cn': 0,
      'zh-tw': 1,
      'en-us': 2
    };
    const currentLanguage = 'zh-cn';
    return localization[currentLanguage];
  }
}
