import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(value: string): string {
    if (value == null) {
      return 'assets/no_image.jpg';
    } else {
      return `${environment.server}${value}`;
    }
  }

}
