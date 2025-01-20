import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AudioService } from '../audio-service.service';
import { CardsService } from '../cards.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isMuted = false;
  isFavorite = false;

 
  constructor(private audioService: AudioService, private cardsService: CardsService ) {}
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
