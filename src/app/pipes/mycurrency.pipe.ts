import { formatCurrency, getCurrencySymbol } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mycurrencyBr'
})
export class MycurrencyPipe implements PipeTransform {

  transform(
    value: string,
  ): string | null {
    let new_value: string = '';
    if (value){
      new_value = value.split(',').join('|');
      new_value = new_value.split('.').join(',');
      new_value = new_value.split('|').join('.');
    }
    return new_value
  }

}
