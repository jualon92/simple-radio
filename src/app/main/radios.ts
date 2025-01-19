
export interface Station {
  name: string;
  frequency: string;
  url: string;
  image: string;
  isSelected: boolean;
  isLoading: boolean;
}

export const radioStations: Station[] = [
  {
    name: 'Radio Rivadavia',
    frequency: 'AM 630',
    url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/RIVADAVIA.mp3',
    image: './assets/images/rivadavia.webp',
    isSelected: false,
    isLoading: false,
  },
  {
    name: 'Radio Continental',
    frequency: 'AM 590',
    url: 'https://frontend.radiohdvivo.com/continental/live',
    image: './assets/images/continental.webp',
    isSelected: false,
    isLoading: false,
  },
  {
    name: 'Radio Mitre',
    frequency: 'AM 790',
    url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/AM790_56.mp3',
    image: './assets/images/mitre.webp',
    isSelected: false,
    isLoading: false,
  }
];