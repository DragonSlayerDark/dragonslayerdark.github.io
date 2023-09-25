import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'petSize'
})
export class PetSizePipe implements PipeTransform {

  transform(value: 'small' | 'medium' | 'large' | 'xlarge'): string {
    // Translate to Spanish
    switch (value) {
      case 'small':
        return 'Pequeño';
      case 'medium':
        return 'Mediano';
      case 'large':
        return 'Grande';
      case 'xlarge':
        return 'Muy grande';
    }
  }

}
