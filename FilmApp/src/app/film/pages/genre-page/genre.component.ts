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
  currentGenre : number = 0
  currentPage : number= 1;

  constructor(private filmService: FilmService) { }

  ngOnInit() {
    this.filmService.getGenres().subscribe((genre: any) => { this.genres = genre.genres; console.log(genre) })

    //  this.filmService.getByGenre(this.currentGenre , 28).subscribe((films : any)=> {this.filmArray = films.results})
  }

  getByGenre(genreId: number , currentPage : number) {
    if ( genreId ==this.currentGenre){
      this.filmService.getByGenre(genreId, this.currentPage).subscribe((films: any) => {
        this.filmArray = [...this.filmArray, ...films.results]
      });
    }else{
      this.currentPage = 1
      this.filmService.getByGenre(genreId, this.currentPage).subscribe((films: any) => {
        this.filmArray = films.results
      });
    }
  }
  loadMore(){
    this.currentPage++;
    this.getByGenre(this.currentGenre ,this.currentPage );
  }
}
