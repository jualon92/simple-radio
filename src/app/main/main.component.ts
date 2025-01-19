import { Component, ElementRef, ViewChild } from '@angular/core';
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
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  radioStations =[...radioStations];

  constructor(public audioService: AudioService) {


  }


  togglePlay(station: Station) {

    //changeUI
    station.isSelected = !station.isSelected ;
    this.unselectAllOtherStations(station);


    //play or stop radio
    station.isSelected ?   this.audioService.playRadio(station.url) : this.audioService.stopRadio(station.url);

  }


  private unselectAllOtherStations(selectedStation: Station) {
    this.radioStations.forEach(s => {
      if (s.name !== selectedStation.name){
        s.isSelected = false;
      }
    });
  }

  playRadioFromFooter(station: Station){
    station.isFooterStopped = false;
    this.audioService.playRadio(station.url);
  }

  stopRadioFooter(station: Station){
    station.isFooterStopped = true;
    this.audioService.stopRadio(station.url);
  }

}
