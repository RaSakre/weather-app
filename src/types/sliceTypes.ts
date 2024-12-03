export interface ICoord {
  lat: number;
  lon: number;
}

export interface IWeatherImage {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface IWeather {
  coord: ICoord;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: IWeatherImage[];
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
  rain: {
    "1h": number;
  };
  name: string;
  timezone: number;
}

export interface ITimeZone {
  sunrise: string;
  lng: number;
  countryCode: string;
  gmtOffset: number;
  rawOffset: number;
  sunset: string;
  timezoneId: string;
  dstOffset: number;
  countryName: string;
  time: string;
  lat: number;
}

export interface IWeatherState {
  weatherInfo: IWeather;
  city: any;
  lat: number;
  lon: number;
  isLoading: boolean;
  error: string | null;
  timezone: ITimeZone;
}

export const defaultCoord: ICoord = {
  lat: 0,
  lon: 0,
};

export const defaultMainWeather = {
  temp: 0,
  feels_like: 0,
  temp_min: 0,
  temp_max: 0,
  pressure: 0,
  humidity: 0,
};

export const defaultWeatherImage: IWeatherImage = {
  id: 0,
  main: "",
  description: "",
  icon: "",
};

export const defaultWind = {
  speed: 0,
  deg: 0,
  gust: 0,
};

export const defaultSys = {
  sunrise: 0,
  sunset: 0,
};

export const defaultRain = {
  "1h": 0,
};

export const defaultTimezone: ITimeZone = {
  sunrise: "",
  lng: 0,
  countryCode: "",
  gmtOffset: 0,
  rawOffset: 0,
  sunset: "",
  timezoneId: "",
  dstOffset: 0,
  countryName: "",
  time: "",
  lat: 0,
};
