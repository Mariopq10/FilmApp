import { Component, OnInit } from '@angular/core';
import { Genre } from 'src/app/film/interfaces/genre';
import { FilmService } from 'src/app/film/services/film.service';
import { Film } from '../../interfaces/film';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit {
  filmArray: Film[] = []
  genres: Genre[] = []


  constructor(private filmService: FilmService) { }

  ngOnInit() {
    this.filmService.getGenres().subscribe((genre: any) => { this.genres = genre.genres; console.log(genre) })
  }

  getByGenre(genreId: number) {
    this.filmService.getByGenre(genreId).subscribe((films: any) => {
      this.filmArray = films.results
    });


  }
}
