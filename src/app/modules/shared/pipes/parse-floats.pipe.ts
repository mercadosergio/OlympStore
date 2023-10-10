import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parseFloats',
  standalone: true,
})
export class ParseFloatsPipe implements PipeTransform {
  transform(value: number): string {
    return value >= 1000 ? `${Math.round(value / 100) / 10}k` : String(value);
  }
}
