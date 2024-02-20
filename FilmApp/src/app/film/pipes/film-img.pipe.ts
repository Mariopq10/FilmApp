import { Pipe, PipeTransform } from '@angular/core';
import { Film } from '../interfaces/film';
import { FilmService } from '../services/film.service';

@Pipe({
  name: 'filmImg'
})


// Por fin el puto pipe
export class FilmImgPipe implements PipeTransform {
  transform(posterPath : string |null): string {
      if(posterPath){
        return posterPath;
      }else{
        return '/assets/no-image.jpg';
      }
  }

}
