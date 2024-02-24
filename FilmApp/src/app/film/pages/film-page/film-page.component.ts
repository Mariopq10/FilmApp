import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
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
  public fav : boolean = false;
  constructor(private filmService : FilmService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private favService : FavService,
    private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id !== null) {
      this.id_film = id
      this.filmService.getFilmById(this.id_film).subscribe((respuesta) =>
      {if(!respuesta)return this.router.navigate(['/film/list']);
    this.film = respuesta
    this.checkFav()
  return})
  }

  // if(this.favService){
  //   this.fav = true
  // }

}


  toggleFav(){
    if(this.fav){
      this.deleteFav()
      // window.location.reload();
    }else{
      this.addFav()
      // window.location.reload();
    }
    this.changeDetectorRef.detectChanges();
  }

  checkFav(){
    const id_pelicula = this.activatedRoute.snapshot.paramMap.get('id')?.toString();
    this.favService.getFavs(localStorage.getItem('id_usuario')).subscribe((response) => {
      const favMovies = response.data.map((fav: any) => fav.id_pelicula.toString());
      this.fav = favMovies.includes(id_pelicula?.toString());
      console.log(favMovies.includes(id_pelicula))
      console.log(this.fav)
    });
  }

  getFilm(id : number) : void {
    this.filmService.getFilmById(id).subscribe(data => this.film)
    console.log(id)
  }

  async deleteFav (){
    this.fav = !this.fav;
    const id_pelicula = this.activatedRoute.snapshot.paramMap.get('id');
    const response = await this.favService.deleteFav(localStorage.getItem('id_usuario'), id_pelicula).toPromise();
    if (response) {
      this.snackBar.open("Removed from Favorites ", 'Close', { duration: 5000 });
    } else {
      this.snackBar.open('Removed Error...', 'Close', { duration: 5000 });
    }


  }

  async addFav() {
    this.fav = !this.fav;
    const id_pelicula = this.activatedRoute.snapshot.paramMap.get('id');
      const response = await this.favService.addFav(localStorage.getItem('id_usuario'), id_pelicula).toPromise();
      console.log(response)
      if (response) {
        this.snackBar.open("Film added to favorites", 'Close', { duration: 5000 });
      } else {
        this.snackBar.open('Add Error', 'Close', { duration: 5000 });
      }
    }
  }


