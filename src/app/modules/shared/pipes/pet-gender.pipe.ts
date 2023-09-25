import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'petGender'
})
export class PetGenderPipe implements PipeTransform {

  transform(value: 'female' | 'male'): string {
    if(value == 'female'){
      return 'Hembra';
    }
    return 'Macho';
  }

}
