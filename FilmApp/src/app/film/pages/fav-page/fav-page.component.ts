import { Component } from '@angular/core';
import { Film } from '../../interfaces/film';

@Component({
  selector: 'app-fav-page',
  templateUrl: './fav-page.component.html',
  styleUrls: ['./fav-page.component.css']
})
export class FavPageComponent {

  public filmList : Film[] = []


}
