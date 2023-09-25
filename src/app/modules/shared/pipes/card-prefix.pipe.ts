import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardPrefix'
})
export class CardPrefixPipe implements PipeTransform {

  // Value example: 400000
  transform(value: string): 'visa' | 'mastercard' | 'amex' | 'discover' | 'unknown' {
    // return if is visa, mastercard, amex or discover
    if (value.startsWith('4')) {
      return 'visa';
    }
    if (value.startsWith('5')) {
      return 'mastercard';
    }
    if (value.startsWith('3')) {
      return 'amex';
    }
    if (value.startsWith('6')) {
      return 'discover';
    }
    return 'unknown';
  }

}
