import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeName'
})
export class CapitalizeNamePipe implements PipeTransform {

  readonly REGEX_CAPITALIZE_NAME = /\b\w/g;

  transform(value: any, args?: any): any {
    return value.replace(this.REGEX_CAPITALIZE_NAME, first => first.toLocaleUpperCase());
  }

}
