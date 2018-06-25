import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceSpace'
})
export class ReplaceSpacePipe implements PipeTransform {

  transform(value: string, replacement: string): string {
    value = value.split(' ').join(replacement);
    console.log("GOOOOOES HERE? " + value);

    return value;
  }

}
