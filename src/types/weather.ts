// DATA FROM API

export type RawWeatherResponse = {
  // units: unknown;
  properties: {
    timeseries: RawWeatherHourData[];
  };
};

export type RawWeatherHourData = {
  time: string;
  data: {
    instant: {
      details: {
        air_pressure_at_sea_level: number;
        air_temperature: number;
        cloud_area_fraction: number;
        wind_from_direction: number;
        wind_speed: number;
      };
    };
    next_1_Hours?: RawWeatherSpanData;
    next_6_Hours?: RawWeatherSpanData;
  };
};

export type RawWeatherSpanData = {
  summary: {
    symbol_code: SymbolCode;
  };
  details?: {
    percipitation_amount?: number;
  };
};

// NORMALIZED DATA

export type WeatherMeta = {
  lastModified: string;
  expires: string;
  lat: string;
  lon: string;
};

export type WeatherData = {
  meta: WeatherMeta;
  byHour: WeatherHourData[];
};

export type WeatherHourData = {
  time: string | Date;
  instant: {
    airPressureAtSeaLevel: number;
    airTemperature: number;
    cloudAreaFraction: number;
    windFromDirection: number;
    windSpeed: number;
  };
  next1Hours?: WeatherSpanData;
  next6Hours?: WeatherSpanData;
};

export type WeatherSpanData = {
  symbolCode?: SymbolCode;
  percipitationAmount?: number;
};

export enum SymbolCode {
  CLEARSKY_DAY = "clearsky_day",
  CLEARSKY_NIGHT = "clearsky_night",
  CLEARSKY_POLARTWILIGHT = "clearsky_polartwilight",
  FAIR_DAY = "fair_day",
  FAIR_NIGHT = "fair_night",
  FAIR_POLARTWILIGHT = "fair_polartwilight",
  LIGHTSSNOWSHOWERSANDTHUNDER_DAY = "lightssnowshowersandthunder_day",
  LIGHTSSNOWSHOWERSANDTHUNDER_NIGHT = "lightssnowshowersandthunder_night",
  LIGHTSSNOWSHOWERSANDTHUNDER_POLARTWILIGHT = "lightssnowshowersandthunder_polartwilight",
  LIGHTSNOWSHOWERS_DAY = "lightsnowshowers_day",
  LIGHTSNOWSHOWERS_NIGHT = "lightsnowshowers_night",
  LIGHTSNOWSHOWERS_POLARTWILIGHT = "lightsnowshowers_polartwilight",
  HEAVYRAINANDTHUNDER = "heavyrainandthunder",
  HEAVYSNOWANDTHUNDER = "heavysnowandthunder",
  RAINANDTHUNDER = "rainandthunder",
  HEAVYSLEETSHOWERSANDTHUNDER_DAY = "heavysleetshowersandthunder_day",
  HEAVYSLEETSHOWERSANDTHUNDER_NIGHT = "heavysleetshowersandthunder_night",
  HEAVYSLEETSHOWERSANDTHUNDER_POLARTWILIGHT = "heavysleetshowersandthunder_polartwilight",
  HEAVYSNOW = "heavysnow",
  HEAVYRAINSHOWERS_DAY = "heavyrainshowers_day",
  HEAVYRAINSHOWERS_NIGHT = "heavyrainshowers_night",
  HEAVYRAINSHOWERS_POLARTWILIGHT = "heavyrainshowers_polartwilight",
  LIGHTSLEET = "lightsleet",
  HEAVYRAIN = "heavyrain",
  LIGHTRAINSHOWERS_DAY = "lightrainshowers_day",
  LIGHTRAINSHOWERS_NIGHT = "lightrainshowers_night",
  LIGHTRAINSHOWERS_POLARTWILIGHT = "lightrainshowers_polartwilight",
  HEAVYSLEETSHOWERS_DAY = "heavysleetshowers_day",
  HEAVYSLEETSHOWERS_NIGHT = "heavysleetshowers_night",
  HEAVYSLEETSHOWERS_POLARTWILIGHT = "heavysleetshowers_polartwilight",
  LIGHTSLEETSHOWERS_DAY = "lightsleetshowers_day",
  LIGHTSLEETSHOWERS_NIGHT = "lightsleetshowers_night",
  LIGHTSLEETSHOWERS_POLARTWILIGHT = "lightsleetshowers_polartwilight",
  SNOW = "snow",
  HEAVYRAINSHOWERSANDTHUNDER_DAY = "heavyrainshowersandthunder_day",
  HEAVYRAINSHOWERSANDTHUNDER_NIGHT = "heavyrainshowersandthunder_night",
  HEAVYRAINSHOWERSANDTHUNDER_POLARTWILIGHT = "heavyrainshowersandthunder_polartwilight",
  SNOWSHOWERS_DAY = "snowshowers_day",
  SNOWSHOWERS_NIGHT = "snowshowers_night",
  SNOWSHOWERS_POLARTWILIGHT = "snowshowers_polartwilight",
  FOG = "fog",
  SNOWSHOWERSANDTHUNDER_DAY = "snowshowersandthunder_day",
  SNOWSHOWERSANDTHUNDER_NIGHT = "snowshowersandthunder_night",
  SNOWSHOWERSANDTHUNDER_POLARTWILIGHT = "snowshowersandthunder_polartwilight",
  LIGHTSNOWANDTHUNDER = "lightsnowandthunder",
  HEAVYSLEETANDTHUNDER = "heavysleetandthunder",
  LIGHTRAIN = "lightrain",
  RAINSHOWERSANDTHUNDER_DAY = "rainshowersandthunder_day",
  RAINSHOWERSANDTHUNDER_NIGHT = "rainshowersandthunder_night",
  RAINSHOWERSANDTHUNDER_POLARTWILIGHT = "rainshowersandthunder_polartwilight",
  RAIN = "rain",
  LIGHTSNOW = "lightsnow",
  LIGHTRAINSHOWERSANDTHUNDER_DAY = "lightrainshowersandthunder_day",
  LIGHTRAINSHOWERSANDTHUNDER_NIGHT = "lightrainshowersandthunder_night",
  LIGHTRAINSHOWERSANDTHUNDER_POLARTWILIGHT = "lightrainshowersandthunder_polartwilight",
  HEAVYSLEET = "heavysleet",
  SLEETANDTHUNDER = "sleetandthunder",
  LIGHTRAINANDTHUNDER = "lightrainandthunder",
  SLEET = "sleet",
  LIGHTSSLEETSHOWERSANDTHUNDER_DAY = "lightssleetshowersandthunder_day",
  LIGHTSSLEETSHOWERSANDTHUNDER_NIGHT = "lightssleetshowersandthunder_night",
  LIGHTSSLEETSHOWERSANDTHUNDER_POLARTWILIGHT = "lightssleetshowersandthunder_polartwilight",
  LIGHTSLEETANDTHUNDER = "lightsleetandthunder",
  PARTLYCLOUDY_DAY = "partlycloudy_day",
  PARTLYCLOUDY_NIGHT = "partlycloudy_night",
  PARTLYCLOUDY_POLARTWILIGHT = "partlycloudy_polartwilight",
  SLEETSHOWERSANDTHUNDER_DAY = "sleetshowersandthunder_day",
  SLEETSHOWERSANDTHUNDER_NIGHT = "sleetshowersandthunder_night",
  SLEETSHOWERSANDTHUNDER_POLARTWILIGHT = "sleetshowersandthunder_polartwilight",
  RAINSHOWERS_DAY = "rainshowers_day",
  RAINSHOWERS_NIGHT = "rainshowers_night",
  RAINSHOWERS_POLARTWILIGHT = "rainshowers_polartwilight",
  SNOWANDTHUNDER = "snowandthunder",
  SLEETSHOWERS_DAY = "sleetshowers_day",
  SLEETSHOWERS_NIGHT = "sleetshowers_night",
  SLEETSHOWERS_POLARTWILIGHT = "sleetshowers_polartwilight",
  CLOUDY = "cloudy",
  HEAVYSNOWSHOWERSANDTHUNDER_DAY = "heavysnowshowersandthunder_day",
  HEAVYSNOWSHOWERSANDTHUNDER_NIGHT = "heavysnowshowersandthunder_night",
  HEAVYSNOWSHOWERSANDTHUNDER_POLARTWILIGHT = "heavysnowshowersandthunder_polartwilight",
  HEAVYSNOWSHOWERS_DAY = "heavysnowshowers_day",
  HEAVYSNOWSHOWERS_NIGHT = "heavysnowshowers_night",
  HEAVYSNOWSHOWERS_POLARTWILIGHT = "heavysnowshowers_polartwilight",
}
