import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Howl } from 'howler';
import { radioStations } from './main/radios';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  public sound: Howl | null = null;
  public isLoading = new BehaviorSubject<string>('');
  public isPlaying = new BehaviorSubject<string>('');
  constructor() {}



  toggleMute(muted: boolean) {
    this.sound?.mute(muted);
  }

  playRadio(radioUrl: string) {
    if (this.sound) {
      this.sound.unload(); // Limpia completamente la instancia anterior
    }

    // Crear nueva instancia limpia
    this.isLoading.next(radioUrl);
    this.sound = new Howl(this.getHowlParams(radioUrl));

    this.sound.play();
  }

  getHowlParams(radioUrl: string) {
    return {
      src: [radioUrl],
      html5: true,
      volume: 1,
      format: ['webm', 'mp3'],
      onload: () => {
        this.isLoading.next('');
        this.isPlaying.next(radioUrl)
      },
    };
  }

  stopRadio(radioName: string) {
    this.sound?.stop();
    this.isPlaying.next('');
  }
}