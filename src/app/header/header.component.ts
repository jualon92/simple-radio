import {Component, OnInit} from '@angular/core';
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
  isMuted = false;
  isFavorite = false;
  showHint = false;
  constructor( private snackBar: MatSnackBar,private audioService: AudioService, private cardsService: CardsService ) {}

 
 
 
  showDragHint() {
     
      this.snackBar.open('Mantén presionado una tarjeta y arrastrala para reordenar', 'Entendido', {
        duration: 7000,
        panelClass: ['drag-hint-snackbar', 'shake-animation'],
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
     
  
  }

  
  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    this.cardsService.toggleFavorite(this.isFavorite);
  }
  toggleMute() {
    this.isMuted = !this.isMuted;
    this.audioService.toggleMute(this.isMuted);
  }


  closeApp() {
    window.close();
  }
}
