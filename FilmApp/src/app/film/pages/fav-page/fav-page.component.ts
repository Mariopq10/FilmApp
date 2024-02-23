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
    // this.favService.getFavs(this.id_usuario).subscribe((films : any) => {this.filmArray = films.results})
    // console.log(this.authService.getCurrentUser())
    // this.favService.getFavs("61")
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
    // for (let id in this.filmListIds){
    //   const RESPONSE  = await this.filmService.getFilmById(id).toPromise()
    //   if (RESPONSE){
    //     console.log(RESPONSE)
    //     this.filmArray.push()
    //   }
    // }
    for (let i in this.filmListIds){
      console.log(i)
      console.log(this.filmListIds)
      const RESPONSE  = await this.filmService.getFilmById(this.filmListIds[i]).subscribe(
        (pelicula) =>
          {if(pelicula != null) {
        this.filmArray.push(pelicula)
          }}
      )
      // if (RESPONSE){
      //   console.log(RESPONSE)
      //   this.filmArray.push()
      // }
    }

  }



  // getFilmById(id: number | string): Observable<DataFilm | undefined> {
  //   if (!id) {
  //     return of(undefined)
  //   }
  //   return this.http.get<DataFilm>(`${this.baseUrl}movie/${id}${this.apiKey}`, environment.MOVIES_API_HEADERS).
  //     pipe(catchError(error => of(undefined)));
  // }

}
