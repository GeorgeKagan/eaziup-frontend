import { Pipe, PipeTransform } from '@angular/core';

const SEP = '<span class="ez-sep"></span>';

/**
 * Pipe that replaces newlines with a <br> and prepends a separator to each line.
 * String output mode: each item on own line (list)
 */
@Pipe({name: 'myNewlineToList'})
export class MyNewlineToList implements PipeTransform {
    public transform(value: string, args: string[]): any {
        if (!value) {
            return value;
        }
        // Split by new lines and filter out blank lines
        let arr = value.split(/(?:\r\n|\r|\n)/g).filter((x) => x);

        if (arr.length > 1) {
            return arr.map((x) => `${SEP}${x}<br>`).join('');
        }
        return value;
    }
}
