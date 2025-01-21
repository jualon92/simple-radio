export interface AudioStrategy {
  playRadio(url: string): void;
  stopRadio(url: string): void;
}
