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
  public film?: any; // Propiedad de entrada para recibir datos de película

  id_film: string | number = ""; // ID de la película actual
  public fav: boolean = false; // Variable para indicar si la película está en favoritos o no

  constructor(private filmService: FilmService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private favService: FavService,
    private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    // Obtener el ID de la película de los parámetros de la ruta
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id !== null) {
      this.id_film = id
      // Obtener los detalles de la película por su ID
      this.filmService.getFilmById(this.id_film).subscribe((respuesta) => {
        if (!respuesta) return this.router.navigate(['/film/list']);
        this.film = respuesta
        this.checkFav() // Verificar si la película está en favoritos
        return
      })
    }
  }

  /**
  * Método para alternar el estado de favorito de la película.
  */
  toggleFav() {
    if (this.fav) {
      this.deleteFav()
    } else {
      this.addFav()
    }
    this.changeDetectorRef.detectChanges(); // Actualizar la vista después de cambiar el estado de favoritos
  }

  /**
   * Método para verificar si la película está en la lista de favoritos del usuario actual.
   */
  checkFav() {
    const id_pelicula = this.activatedRoute.snapshot.paramMap.get('id')?.toString();
    // Obtener la lista de películas favoritas del usuario actual
    this.favService.getFavs(localStorage.getItem('id_usuario')).subscribe((response) => {
      const favMovies = response.data.map((fav: any) => fav.id_pelicula.toString());
      // Verificar si la película actual está en la lista de favoritos
      this.fav = favMovies.includes(id_pelicula?.toString());
    });
  }

  /**
   * Método para obtener los detalles de una película por su ID.
   * @param id El ID de la película.
   */
  getFilm(id: number): void {
    this.filmService.getFilmById(id).subscribe(data => this.film)
    console.log(id)
  }

  /**
   * Metodo para eliminar la película de la lista de favoritos del usuario actual.
   */
  async deleteFav() {
    this.fav = !this.fav; //Cambiamos estado de favorito.
    const id_pelicula = this.activatedRoute.snapshot.paramMap.get('id');
    // Eliminar la película de la lista de favoritos utilizando el servicio FavService
    const response = await this.favService.deleteFav(localStorage.getItem('id_usuario'), id_pelicula).toPromise();
    if (response) {
      this.snackBar.open("Removed from Favorites ", 'Close', { duration: 5000 });
    } else {
      this.snackBar.open('Removed Error...', 'Close', { duration: 5000 });
    }


  }

  /**
   * Metodo para agregar la pelicula a la lista de favoritos del usuario actual.
   */
  async addFav() {
    this.fav = !this.fav; //Cambiamos estado de favorito.
    const id_pelicula = this.activatedRoute.snapshot.paramMap.get('id');
    // Agregar la pelicula a la lista de favoritos utilizando el servicio FavService
    const response = await this.favService.addFav(localStorage.getItem('id_usuario'), id_pelicula).toPromise();
    console.log(response)
    if (response) {
      this.snackBar.open("Film added to favorites", 'Close', { duration: 5000 });
    } else {
      this.snackBar.open('Add Error', 'Close', { duration: 5000 });
    }
  }
}


