
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatToGermanCurr'
})
export class FormatToGermanCurrPipe implements PipeTransform {
  transform(price: number): string {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  }
}
