import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AudioService } from '../audio-service.service';
import { CardsService } from '../cards.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatSnackBarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent  {
  @Output() menuClick = new EventEmitter<void>();

  isMuted = false;
  isFavorite = false;
  showHint = false;
  constructor( private snackBar: MatSnackBar,private audioService: AudioService, private cardsService: CardsService ) {}




  showDragHint() {

    setTimeout(() => {
      this.snackBar.open('Mantén presionado una tarjeta y arrastrala para reordenar', 'Entendido', {
        duration: 7000,
        panelClass: ['drag-hint-snackbar', 'shake-animation', 'fade-in'],
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }, 100);


  }


  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    this.cardsService.toggleFavorite(this.isFavorite);  

    if (this.isFavorite){
      this.snackBar.open('Mostrando favoritos', 'Entendido', {
        duration: 3000,
        panelClass: ['favorite-notification'],
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    }else{
      this.snackBar.open('Mostrando todas las tarjetas', 'Entendido', {
        duration: 3000,
        panelClass: ['favorite-notification'],
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    }
  }
  toggleMute() {
    this.isMuted = !this.isMuted;
    this.audioService.toggleMute(this.isMuted);
  }

  toggleSidenav() {
    this.menuClick.emit();
  }

  closeApp() {
    window.close();
  }
}
