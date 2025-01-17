import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { AudioService } from '../audio-service.service';
import { CommonModule } from '@angular/common';
import { radioStations } from './radios';
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
  radioStations = radioStations;
  public  currentRadio: string = '';
  isStopping = false;
  isLoadingRadio = false;
  isLoading = false;
  constructor(public audioService: AudioService) {
    this.audioService.getCurrentRadio().subscribe(radio => {
      this.currentRadio = radio;
    });
    this.audioService.loadingRadio.subscribe(loading => {
      this.isLoadingRadio = loading; 
    })
    this.audioService.showFooter 
   
  }

  
  togglePlay(event: Event, radioName: string) {
    if (this.isPlaying(radioName)) {
      this.audioService.stopRadio(radioName);
    } else {
      const station = this.radioStations.find(r => r.name === radioName);
      if (station) {
        this.audioService.loadingRadio.next(true)
        this.audioService.playRadio(station.url, station.name);
      }
    }
  }

  togglePlayFooter(event: Event, radioName: string) {
    if (this.isPlaying(radioName)) {
      this.audioService.stopRadio(radioName);
    } else {
      const station = this.radioStations.find(r => r.name === radioName);
      if (station) {
        this.audioService.loadingRadio.next(true)
        this.audioService.playRadio(station.url, station.name);
        
      }
    }
  }

  isPlaying(radioName: string): boolean {
    return this.currentRadio === radioName;
  }

  getCurrentStation() {
    return this.radioStations.find(station => station.name === this.currentRadio);
  }
}