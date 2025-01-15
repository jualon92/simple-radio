import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private currentAudio: HTMLAudioElement | null = null;
  private playingRadio = new BehaviorSubject<string>('');

  getCurrentRadio() {
    return this.playingRadio.asObservable();
  }

  playRadio(audioElement: HTMLAudioElement, radioName: string) {

     
    // si habia una radio anterior. pausar la anterior
    if (this.currentAudio) {

      this.currentAudio.load();
      this.currentAudio.pause();
    }

     //  Guardar el audio actual
     this.currentAudio = audioElement; 
     
  }
}