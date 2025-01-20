import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  public showFavorites = new BehaviorSubject<boolean>(false);
  constructor() { }

  toggleFavorite(isFavorite: boolean) {
    this.showFavorites.next(isFavorite);
  }

  
}
