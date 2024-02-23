import { Component, Input, OnInit } from '@angular/core';
import { DataFilm, Film } from '../../interfaces/film';
import { FilmService } from '../../services/film.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FavService } from '../../services/fav.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'film-page',
  templateUrl: './film-page.component.html',
  styleUrls: ['./film-page.component.css']
})
export class FilmPageComponent implements OnInit {
  @Input()
  public film?: any;

  id_film: string | number ="";
  fav : boolean = false;
  constructor(private filmService : FilmService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private favService : FavService) { }

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

  // if(this.favService){
  //   this.fav = true
  // }

}

  getFilm(id : number) : void {
    this.filmService.getFilmById(id).subscribe(data => this.film)
    console.log(id)
  }

  toggleHeart() {
    this.fav = !this.fav;
  }


  // addFav (){

  //   this.fav = !this.fav;
  //   const id_pelicula = this.activatedRoute.snapshot.paramMap.get('id');
  //   this.favService.addFav(localStorage.getItem('id_usuario'),id_pelicula)
  //   console.log(id_pelicula)

  // }

  async addFav() {
    const id_pelicula = this.activatedRoute.snapshot.paramMap.get('id');
      const response = await this.favService.addFav(localStorage.getItem('id_usuario'), id_pelicula).toPromise();
      console.log(response)
      if (response) {
        this.snackBar.open("Agregada a favoritas", 'Cerrar', { duration: 5000 });
      } else {
        this.snackBar.open('Error al agregar a favoritas', 'Cerrar', { duration: 5000 });
      }
    }
  }


