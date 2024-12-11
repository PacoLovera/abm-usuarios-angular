import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formateoMotivo'
})
export class FormateoMotivoPipe implements PipeTransform {

  transform(value: any): string {
    // Quitar guiones
    value = value.replace(/_/g, ' ');

    // Capitalizar la primera letra
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }

}
