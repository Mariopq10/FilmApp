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
  public film!: Film | DataFilm;

  circleLeft: number = 5;
  circleBottom: number = 45;

  constructor(private filmService: FilmService) { }

  ngOnInit(): void {
    if (!this.film) throw new Error('Method not implemented.');
  }

  getPercentageRating(voteAverage: number): string {
    const percentage = Math.round(voteAverage * 10); // Redondear al entero más cercano
    return percentage.toString(); // Convertir a cadena y agregar el símbolo de porcentaje
  }

  getFilmById(id: number): void {
    this.filmService.getFilmById(id)
  }
}


