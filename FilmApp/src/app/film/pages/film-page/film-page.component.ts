import { Component, Input, OnInit } from '@angular/core';
import { DataFilm, Film } from '../../interfaces/film';
import { FilmService } from '../../services/film.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'film-page',
  templateUrl: './film-page.component.html',
  styleUrls: ['./film-page.component.css']
})
export class FilmPageComponent implements OnInit {
  @Input()
  public film?: any;

  id_film: string | number = "";

  constructor(private filmService : FilmService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    //  this.getFilm(this.film.id)

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id !== null) {
      this.id_film = id
      this.filmService.getFilmById(this.id_film).subscribe((respuesta) =>
      {if(!respuesta)return this.router.navigate(['/film/list']);
    this.film = respuesta
  return})
  }

}

  getFilm(id : number) : void {
    this.filmService.getFilmById(id).subscribe(data => this.film)
    console.log(id)
  }

}
