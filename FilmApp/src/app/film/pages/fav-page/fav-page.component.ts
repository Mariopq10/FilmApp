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
  public filmArray: DataFilm[] =[];

  filmListIds : number []=[]
  // public user : User;

  // id_usuario : string | null ;
  // public user : User;
  constructor( private filmService : FilmService , private favService : FavService, private authService : AuthService) {
    // this.id_usuario = localStorage.getItem('id_usuario')

   }

  ngOnInit() {
    this.getIdsFavoritas()
  }


  async getIdsFavoritas() {
    const RESPONSE = await this.favService.getFavs('61').toPromise();
    if (RESPONSE) {
      this.filmListIds = RESPONSE.data.map((item: { id_pelicula: any }) => item.id_pelicula);

    }
    console.log(this.filmListIds)
    this.getDataFilm();
  }

  async getDataFilm(){
    for (let i in this.filmListIds){
      console.log(i)
      console.log(this.filmListIds)
      const RESPONSE  = await this.filmService.getFilmById(this.filmListIds[i]).subscribe(
        (pelicula) =>
          {if(pelicula != null) {
        this.filmArray.push(pelicula)
          }}
      )
    }
  }


}
