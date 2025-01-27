import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { AudioService } from '../audio-service.service';
import { CommonModule } from '@angular/common';
import { radioStations, Station } from './radios';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
 
import { HslService } from '../hsl.service';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderComponent } from '../header/header.component';
import { QRCodeModule } from 'angularx-qrcode';
import { QrComponent } from '../qr/qr.component';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter } from 'rxjs';
import { CardsService } from '../cards.service';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    MatSlideToggleModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatSliderModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    DragDropModule,
    MatSidenavModule,
    HeaderComponent,
 QRCodeModule,
  QrComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  radioStations =[...radioStations];
  dragDelay: number = 500;
  isMobile = false;
  private readonly STORAGE_KEY = 'radio_stations_order';
  installPrompt: any = null;

  constructor(private cardService: CardsService, private swUpdate: SwUpdate,  private snackBar: MatSnackBar,public audioService: AudioService, private hslService: HslService) {


  }

  ngOnInit(){
    this.loadStationsOrder();
    this.loadFavoriteStations();
  window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.installPrompt = e;
    });   
    
         this.cardService.showFavorites.subscribe((isFavorite) => {
          this.radioStations = isFavorite ? this.radioStations.filter(s => s.isFavorite) : [...radioStations];
        
          })
        this.isMobile = window.innerWidth < 1024;
     


        if (this.swUpdate.isEnabled) {
          this.swUpdate.versionUpdates
            .pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'))
            .subscribe(() => {
              const snack = this.snackBar.open(
                'Nueva versión disponible',
                'Actualizar',
                { duration: 0 }
              );
              snack.onAction().subscribe(() => {
                this.swUpdate.activateUpdate().then(() => location.reload());
              });
            });
        }
  }

  onDrop(event: CdkDragDrop<Station[]>) {
    moveItemInArray(this.radioStations, event.previousIndex, event.currentIndex);
    // Guardar nuevo orden
    const orderIds = this.radioStations.map(station => station.url);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(orderIds));
  }

  toggleFavorite(station: Station) {
    station.isFavorite = !station.isFavorite;
    //save in ui, use localstorage
     
     // Guardar cambios en localStorage
  const favoriteStations = this.radioStations
  .filter(s => s.isFavorite)
  .map(s => s.url);

localStorage.setItem('favoriteStations', JSON.stringify(favoriteStations));
  }


  private loadFavoriteStations() {
    const savedFavorites = localStorage.getItem('favoriteStations');
    if (savedFavorites) {
      const favoriteUrls = JSON.parse(savedFavorites);
      this.radioStations.forEach(station => {
        station.isFavorite = favoriteUrls.includes(station.url);
      });
    }
  }

  private loadStationsOrder() {
    const savedOrder = localStorage.getItem(this.STORAGE_KEY);
    if (savedOrder) {
      const orderIds = JSON.parse(savedOrder);
      this.radioStations = orderIds.map((id: string) =>
        radioStations.find(station => station.url === id)
      ).filter(Boolean);
    } else {
      this.radioStations = [...radioStations];
    }
  }

  togglePlay(station: Station) {


    this.handleUIChanges(station)

    //handle radio play
    this.stopPreviousRadio(station);
    this.playNewRadio(station);


  }

  playNewRadio(station: Station){

    const service  =  this.getAudioService(station)
    if (station.isSelected) {
      service.playRadio(station.url);
    }
  }

  stopPreviousRadio(station: Station){
    this.hslService.stopRadio(station.url);
    this.audioService.stopRadio(station.url);
  }
  getAudioService(station: Station): AudioService | HslService {
    return station.isHSL ? this.hslService : this.audioService


  }

  handleUIChanges(station: Station){
    //changeUI
    station.isSelected = !station.isSelected ;
    this.unselectAllOtherStations(station);
  }
  private unselectAllOtherStations(selectedStation: Station) {
    this.radioStations.forEach(s => {
      if (s.name !== selectedStation.name){
        s.isSelected = false;
      }
      s.isFooterStopped = false;
    });
  }

  playRadioFromFooter(station: Station){
    station.isFooterStopped = false;
    this.getAudioService(station).playRadio(station.url);
  }

  stopRadioFooter(station: Station){
    station.isFooterStopped = true;

    this.getAudioService(station).stopRadio(station.url);
  }


  onDragStarted() {
    this.snackBar.open('Arrastra para reordenar ⬆️ ⬇️', '', {
      duration: 2000,
      panelClass: ['drag-notification'],
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  async installPwa() {
    if (this.installPrompt) {
      await this.installPrompt.prompt();
      const result = await this.installPrompt.userChoice;
      if (result.outcome === 'accepted') {
        this.installPrompt = null;
      }
    }
  }
}
