import { Pipe, PipeTransform } from '@angular/core';

const SEP = '<span class="ez-sep"></span>';

/**
 * Pipe that replaces newlines and commas with a predefined separator.
 * String output mode: inline
 */
@Pipe({name: 'myNewlineToSeparator'})
export class MyNewlineToSeparator implements PipeTransform {
    public transform(value: string, args: string[]): any {
        if (!value) {
            return value;
        }

        // Replaces new lines and commas (,)
        return (value + '').replace(/(?:\r\n|\r|\n|,)/g, SEP);
    }
}
