import { Component, Input } from '@angular/core';
import { Film } from '../../interfaces/film';
import { User } from '../../../auth/interfaces/user.interface';
import { FavService } from '../../services/fav.service';
import { FilmService } from '../../services/film.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'fav-page',
  templateUrl: './fav-page.component.html',
  styleUrls: ['./fav-page.component.css']
})
export class FavPageComponent {
  public filmArray: Film[] = [];
  // public user : User;

  // id_usuario : string | null ;
  // public user : User;
  constructor( private filmService : FilmService , private favService : FavService, private authService : AuthService) {
    // this.id_usuario = localStorage.getItem('id_usuario')

   }

  ngOnInit() {
    // this.favService.getFavs(this.id_usuario).subscribe((films : any) => {this.filmArray = films.results})
    // console.log(this.authService.getCurrentUser())
    // this.favService.getFavs("61")
    this.getIdsFavoritas()
    console.log(this.filmArray)
  }


  async getIdsFavoritas() {
    const RESPONSE = await this.favService.getFavs(localStorage.getItem('id_usuario')).toPromise();
    if (RESPONSE !== undefined && RESPONSE.permises !== undefined && RESPONSE.ok) {
      this.filmArray = RESPONSE.data.map((item: { id_pelicula: any }) => item.id_pelicula);
      for (const item of RESPONSE.data) {
        this.filmArray[item.id_movie] = item.id_fav;
      }
    }


}
}
