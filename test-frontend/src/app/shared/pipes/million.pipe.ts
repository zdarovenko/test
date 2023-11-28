import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'million'
})
export class MillionPipe implements PipeTransform {

  transform(value: number): string {
    if (value < 1000000) return `${ value }`;

    return `${ (value / 1000000).toFixed(2) }M`
  }

}
