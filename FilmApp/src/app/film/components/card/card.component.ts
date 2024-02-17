import { Component, Input, OnInit } from '@angular/core';
import { Film } from '../../interfaces/film';

@Component({
  selector: 'film-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input()
  public film!:Film;

  circleLeft: number = 5; // Puedes establecer estos valores según sea necesario
  circleBottom: number = 45;

  constructor(){}

  ngOnInit(): void {
    if(!this.film)throw new Error('Method not implemented.');
  }

  getPercentageRating(voteAverage: number): string {
    const percentage = Math.round(voteAverage * 10); // Redondear al entero más cercano
    return percentage.toString() ; // Convertir a cadena y agregar el símbolo de porcentaje
  }

}
