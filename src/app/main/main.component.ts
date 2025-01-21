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
import { BehaviorSubject, Observable } from 'rxjs';
import Hls from 'hls.js';
import { HslService } from '../hsl.service';

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
    MatProgressBarModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  radioStations =[...radioStations];

  constructor(public audioService: AudioService, private hslService: HslService) {


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
  

}
