import {Pipe, PipeTransform} from '@angular/core';

const SEP = '<span class="ez-sep"></span>';

/**
 * Pipe that replaces newlines with a <br> and prepends a separator to each line.
 * String output mode: each item on own line (list)
 */
@Pipe({name: 'nl2list'})
export class Nl2listPipe implements PipeTransform {
  transform(value: string, args: string[]): any {
    if (!value) return value;
    // Split by new lines and filter out blank lines
    let arr = value.split(/(?:\r\n|\r|\n)/g).filter(x => x);

    if (arr.length > 1) {
      return arr.map(x => `${SEP}${x}<br>`).join('');
    }
    return value;
  }
}

/**
 * Pipe that replaces newlines and commas with a predefined separator.
 * String output mode: inline
 */
@Pipe({name: 'nl2sep'})
export class Nl2sepPipe implements PipeTransform {
  transform(value: string, args: string[]): any {
    if (!value) return value;

    // Replaces new lines and commas (,)
    return (value + '').replace(/(?:\r\n|\r|\n|,)/g, SEP);
  }
}
