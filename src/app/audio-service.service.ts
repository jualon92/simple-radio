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
  public loadingRadio = new  Subject<boolean>();
  private currentRadio = new BehaviorSubject<string>('');
  public showFooter = new BehaviorSubject<boolean>(false);
  constructor() {
    // Precarga inicial de radios
    this.preloadRadios();
  }

  getCurrentRadio() {
    return this.currentRadio.asObservable();
  }

  private preloadRadios() {
    radioStations.forEach(station => {
      this.sounds.set(station.name, new Howl({
        src: [station.url],
        html5: true,
        format: ['webm','mp3'],
        preload: false,
        pool:5,
        autoplay:false,
      
        onload: () => {
          console.log(`Radio ${station.name} cargada`);
          this.loadingRadio.next(false);
     /*      this.sounds.set(station.name, this.sound); */
          /* //play them but mute them. i want them being played
          this.sound?.play();
          this.sound?.mute(true);
 */
        },
       onplay: () => {
          
       }
      }));
    });

  }
  toggleMute(muted: boolean) {
    this.sounds.forEach((sound) => {
      if (sound) {
        sound.mute(muted);
      }
    });
  }
  playRadio(radioUrl: string, radioName: string) {
 
      // Si hay otra radio sonando, pausarla
      if (this.currentRadio.value !== radioName) {
        const currentSound = this.sounds.get(this.currentRadio.value);
        if (currentSound) {
          currentSound.stop();
        }

      }
  
      // Reproducir la radio seleccionada
      const newSound = this.sounds.get(radioName);
      if (newSound) {
        newSound.play();
        this.currentRadio.next(radioName);
      }
      this.showFooter.next(true)
    // if radio the same
    
  }

  stopRadio(radioName: string) {
    const newSound = this.sounds.get(radioName);
    if (newSound) {
      newSound.stop();
      this.currentRadio.next('');  
      
    }
    this.showFooter.next(false)

  }
}