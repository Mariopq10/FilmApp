import { Component, OnInit } from '@angular/core';
import { Genre } from 'src/app/film/interfaces/genre';
import { FilmService } from 'src/app/film/services/film.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit {

  genres : Genre[]=[]


  constructor(private filmService : FilmService) { }

  ngOnInit() {
    this.filmService.getGenres().subscribe((genre : any) =>{this.genres = genre.results})
  }

}
