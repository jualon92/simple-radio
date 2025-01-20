
export interface Station {
  name: string;
  frequency: string;
  url: string;
  image: string;
  isSelected: boolean;
  isLoading: boolean;
  isFooterStopped:boolean;
}

export const radioStations: Station[] = [
  {
    name: 'Radio Rivadavia',
    frequency: 'AM 630',
    url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/RIVADAVIA.mp3',
    image: './assets/images/rivadavia.webp',
    isSelected: false,
    isLoading: false,
    isFooterStopped:false,
  },
  {
    name: 'Radio Continental',
    frequency: 'AM 590',
    url: 'https://frontend.radiohdvivo.com/continental/live',
    image: './assets/images/continental.webp',
    isSelected: false,
    isLoading: false,
    isFooterStopped:false,
  },
  {
    name: 'Radio Mitre',
    frequency: 'AM 790',
    url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/AM790_56.mp3',
    image: './assets/images/mitre.webp',
    isSelected: false,
    isLoading: false,
    isFooterStopped:false,
  },
  {
    name: "Radio La 100",
    frequency: "FM 99.9",
    url: "https://playerservices.streamtheworld.com/api/livestream-redirect/FM999_56.mp3",
    image: "./assets/images/la100.webp",
    isSelected: false,
    isLoading: false,
    isFooterStopped:false,
  },
  {
    name: "Radio Pop",
    frequency: "FM 101.5",
    url: "https://radiopop.radioca.st/stream",
    image: "./assets/images/pop.webp",
    isSelected: false,
    isLoading: false,
    isFooterStopped:false,

  },{
    name: "Radio Aspen",
    frequency: "FM 102.3",
    url: "https://playerservices.streamtheworld.com/api/livestream-redirect/ASPEN_SC",
    image: "./assets/images/aspen.webp",
    isSelected: false,
    isLoading: false,
    isFooterStopped:false,
  },
  {
    name: "Radio Metro",
    frequency: "FM 95.1",
    url: "https://playerservices.streamtheworld.com/api/livestream-redirect/METRO.mp3",
    image: "./assets/images/metro.webp",
    isSelected: false,
    isLoading: false,
    isFooterStopped:false,
  }, 
  {
    name: "Radio La Red",
    frequency: "AM 910",
    url: "https://playerservices.streamtheworld.com/api/livestream-redirect/LA_RED_AM910.mp3",
    image: "./assets/images/lared.png",
    isSelected: false,
    isLoading: false,
    isFooterStopped:false,

  }
  
  /* , {
    name: "Radio One",
    frequency: "FM 103.7",
    url: "https://playerservices.streamtheworld.com/api/livestream-redirect/ONE_SC",
    image: "./assets/images/one.webp",
    isSelected: false,
    isLoading: false,
    isFooterStopped:false,
  }, *//* 
  {
    name: "Radio 10",
    frequency: "AM 710",
    url: "https://radio10.stweb.tv/radio10/live/l_70_240822023_37965.aac?nimblesessionid=709437582",
    image: "./assets/images/radio10.webp",
    isSelected: false,
    isLoading: false,
    isFooterStopped:false,
  } */
  /* {
    name: "Radio Disney",
    frequency: "FM 94.3",
    url: "https://playerservices.streamtheworld.com/api/livestream-redirect/DISNEY_SC",
    image: "./assets/images/disney.webp",
    isSelected: false,
    isLoading: false,
    isFooterStopped:false,
  }, */
 
];
