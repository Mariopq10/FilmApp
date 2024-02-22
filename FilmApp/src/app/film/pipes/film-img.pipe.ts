import { Pipe, PipeTransform } from '@angular/core';
import { Film } from '../interfaces/film';
import { FilmService } from '../services/film.service';

@Pipe({
  name: 'filmImg'
})


//FilmImgPipe que transforma una cadena de string, en caso de que lo que reciba, su final sea "null" modifica la ruta a no-image.jpg para mostrar otra imagen
export class FilmImgPipe implements PipeTransform {
  transform(posterPath : string | null): string {
      if(posterPath?.endsWith("null")){
        console.log('noimg')
        return '/assets/no-image1.jpg';
      }else{
       return "https://image.tmdb.org/t/p/w500/" + posterPath
      }
  }

}
