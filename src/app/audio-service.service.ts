import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Howl } from 'howler';
import { radioStations } from './main/radios';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private sound: Howl | null = null;
  private sounds: Map<string, Howl | null> = new Map();
  public isLoading = new  BehaviorSubject<string>('');
  private currentRadio = new BehaviorSubject<string>('');
  public showFooter = new BehaviorSubject<boolean>(false);
  public isStopped = new BehaviorSubject<boolean>(false);
  constructor() {
  
  }

  getCurrentRadio() {
    return this.currentRadio.asObservable();
  }

 
  toggleMute(muted: boolean) {
    this.sounds.forEach((sound) => {
      if (sound) {
        sound.mute(muted);
      }
    });
  }
  playRadio(radioUrl: string) {
    
    if (this.sound) {
      this.sound.unload(); // Limpia completamente la instancia anterior
    }

    // Crear nueva instancia limpia
    this.isLoading.next(radioUrl)
    this.sound = new Howl({
      src: [radioUrl],
      html5: true,
      format: ['webm','mp3'],
      onload: () => {
        this.isLoading.next("")
      }
    });

    
    this.sound.play();
    
  }

  stopRadio(radioName: string) {
    this.sound?.stop(); 
  }
 
}