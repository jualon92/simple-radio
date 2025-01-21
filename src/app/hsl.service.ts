import { Injectable } from '@angular/core';
import { AudioStrategy } from './models';
import Hls from 'hls.js';

@Injectable({
  providedIn: 'root'
})
export class HslService implements AudioStrategy {
 
  private hls!: Hls;
  media!: HTMLAudioElement;
  constructor() { }

  playRadio(stationUrl:string){
    this.loadRadio(stationUrl);
     this.media.play();
  }

  stopRadio(stationUrl:string){
    try{ 
      this.media.pause();
      this.media.currentTime = 0;
      this.hls.stopLoad();
      this.hls.destroy();
    }catch(e){
      console.log('Error stopping radio', e);
    }
     
  }

  loadRadio(stationUrl:string){
    this.hls = new Hls();
    this.hls.loadSource(stationUrl);

    this.media = new Audio();
    this.hls.attachMedia(this.media);
  }
}
