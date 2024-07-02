import { Pipe, PipeTransform } from '@angular/core';
import * as Jalaali from 'jalaali-js';

@Pipe({
  name: 'jalaliDate'
})
export class JalaliDatePipe implements PipeTransform {

  transform( date: Date): string {
    let value = new Date(date)
    const jalaaliDate = Jalaali.toJalaali(value.getFullYear(), value.getMonth() + 1, value.getDate());
    return `${jalaaliDate.jy}/${jalaaliDate.jm}/${jalaaliDate.jd}`;
  }

}
