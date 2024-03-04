import { Pipe, PipeTransform } from '@angular/core';
import { Film } from '../interfaces/film';
import { FilmService } from '../services/film.service';

@Pipe({
  name: 'filmImg'
})


//FilmImgPipe que transforma una cadena de string, en caso de que lo que reciba, su final sea "null" modifica la ruta a no-image.jpg para mostrar otra imagen
/**
   * Transforma la ruta de la imagen de la película.
   * Si la ruta termina en "null", se modifica para mostrar una imagen de "no-image.jpg".
   * @param posterPath Ruta de la imagen de la película.
   * @returns La ruta modificada o la original.
   */
export class FilmImgPipe implements PipeTransform {
  transform(posterPath : string | null): string {
      if(posterPath?.endsWith("null")){
        console.log('noimg')
        return '/assets/no-image.jpg';
      }else{
       return "https://image.tmdb.org/t/p/w500/" + posterPath
      }
  }

}
