import { Component, Input } from '@angular/core';
import { DataFilm, Film } from '../../interfaces/film';
import { User } from '../../../auth/interfaces/user.interface';
import { FavService } from '../../services/fav.service';
import { FilmService } from '../../services/film.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'fav-page',
  templateUrl: './fav-page.component.html',
  styleUrls: ['./fav-page.component.css']
})
export class FavPageComponent {
  public filmArray: DataFilm[] = []; // Array para almacenar las películas favoritas
  filmListIds: number[] = []
  id_usuario: string | null; // ID del usuario actual

  constructor(private filmService: FilmService, private favService: FavService, private authService: AuthService) {
    this.id_usuario = localStorage.getItem('id_usuario') // Obtener el ID del usuario del almacenamiento local
  }

  ngOnInit() {
    this.getIdsFavoritas()
  }

  /**
   *  Método para obtener los IDs de las películas favoritas del usuario actual y almacenar esas ids en el filmListIds[]
   */
  async getIdsFavoritas() {
    const RESPONSE = await this.favService.getFavs(this.id_usuario).toPromise();
    if (RESPONSE) {
      this.filmListIds = RESPONSE.data.map((item: { id_pelicula: any }) => item.id_pelicula);
    }
    this.getDataFilm();
  }
  /**
   * Método para obtener los detalles de las películas favoritas, usando las ids almacenadas en filmListIds[]
   */
  async getDataFilm() {
    for (let i in this.filmListIds) {
      const RESPONSE = await this.filmService.getFilmById(this.filmListIds[i]).subscribe(
        (pelicula) => {
          if (pelicula != null) {
            this.filmArray.push(pelicula) // Agregar la película a la lista de películas favoritas si se encuentra
          }
        }
      )
    }
  }
}
