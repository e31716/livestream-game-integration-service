import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameProtect'
})
export class NameProtectPipe implements PipeTransform {

  transform(value: string, ...args: any[]): string {
    const securityName = '***' + value.slice(3);
    return securityName;
  }
}
