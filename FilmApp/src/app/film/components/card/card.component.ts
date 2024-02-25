import { Component, Input, OnInit } from '@angular/core';
import { DataFilm, Film } from '../../interfaces/film';
import { FilmService } from '../../services/film.service';
import { FilmImgPipe } from '../../pipes/film-img.pipe';

@Component({
  selector: 'film-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input()
  public film!: Film | DataFilm; // Propiedad de entrada para recibir datos de película

  //Posiciones del circulo de calificacion.
  circleLeft: number = 5;
  circleBottom: number = 45;

  constructor(private filmService: FilmService) { }

  /**
   * Método ngOnInit que se ejecuta al inicializar el componente.
   * Verifica si la propiedad film está definida.
   */
  ngOnInit(): void {
    if (!this.film) throw new Error('Method not implemented.');
  }

  /**
   * Método getPercentageRating para obtener el porcentaje de calificación de la película.
   * @param voteAverage El promedio de votos de la película.
   * @returns La calificación de la película como un porcentaje (cadena).
   */
  getPercentageRating(voteAverage: number): string {
    const percentage = Math.round(voteAverage * 10); // Redondear al entero más cercano
    return percentage.toString(); // Convertir a cadena y agregar el símbolo de porcentaje
  }

  /**
   * Método getFilmById para obtener detalles de una película por su ID.
   * @param id El ID de la película.
   */
  getFilmById(id: number): void {
    this.filmService.getFilmById(id)
  }
}


