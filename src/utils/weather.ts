import {
  RawWeatherResponse,
  SavedWeatherHourData,
  SymbolCode,
  WeatherData,
  WeatherHourData,
} from "../types/weather";

const { REACT_APP_MET_USER_AGENT } = process.env;

export const fetchWeater = async (lat: number, lon: number) => {
  const latString = lat.toFixed(4);
  const lonString = lon.toFixed(4);

  const savedWeatherData = getSavedWeatherData();

  if (savedWeatherData) {
    // Check if saved data exists on the given location
    const { lat, lon } = savedWeatherData.meta;
    if (lat === latString && lon === lonString) {
      // Check if the data has not expired
      if (new Date(savedWeatherData.meta.expires).getTime() > Date.now())
        return {
          error: null,
          data: savedWeatherData,
        };
    }
  }

  if (!REACT_APP_MET_USER_AGENT || !REACT_APP_MET_USER_AGENT.length)
    throw new Error("Missing environment variable");

  const api = `https://api.met.no/weatherapi/locationforecast/2.0/compact.json?lat=${latString}&lon=${lonString}`;
  const requestHeader = new Headers();

  requestHeader.append("TE", "trailers");
  requestHeader.append("User-Agent", REACT_APP_MET_USER_AGENT);
  if (savedWeatherData?.meta) {
    // TODO: Debug response such that the header is accepted
    // requestHeader.append(
    //   "If-Modified-Since",
    //   savedWeatherData.meta.lastModified
    // );
  }

  const response = await fetch(api, {
    headers: requestHeader,
  }).catch((error) => {
    console.error("Error:", error);
    return null;
  });

  if (!response) return { error: "Error in response", data: null };

  if (response?.status === 304) {
    // Data has not been changed since last save
    return { error: null, data: savedWeatherData };
  }

  if (response?.status !== 200) {
    console.error("Unexpected response:", response.status);
  }

  const data = normalizeWeatherData(
    await response.json(),
    response.headers,
    latString,
    lonString
  );

  saveWeatherData(data);

  return {
    error: null,
    data,
  };
};

export const normalizeWeatherData = (
  rawData: RawWeatherResponse,
  headers: Headers,
  latString: string,
  lonString: string
): WeatherData => {
  const byHour = rawData.properties.timeseries.map(({ time, data }) => {
    // Unpack values
    const {
      instant: {
        details: {
          air_pressure_at_sea_level,
          air_temperature,
          cloud_area_fraction,
          wind_from_direction,
          wind_speed,
        },
      },
    } = data;

    // Reassign and return
    const hourData: WeatherHourData = {
      time: new Date(time),
      instant: {
        airPressureAtSeaLevel: air_pressure_at_sea_level,
        airTemperature: air_temperature,
        cloudAreaFraction: cloud_area_fraction,
        windFromDirection: wind_from_direction,
        windSpeed: wind_speed,
      },
      next1Hours: {
        symbolCode: data.next_1_hours?.summary.symbol_code as SymbolCode,
        percipitationAmount: data.next_1_hours?.details?.precipitation_amount,
      },
      next6Hours: {
        symbolCode: data.next_6_hours?.summary.symbol_code as SymbolCode,
        percipitationAmount: data.next_6_hours?.details?.precipitation_amount,
      },
    };
    return hourData;
  });

  const lastModified = headers.get("Last-Modified") || new Date().toUTCString();
  const expires = headers.get("Expires") || new Date().toUTCString();

  return {
    meta: { lastModified, expires, lat: latString, lon: lonString },
    byHour,
  };
};

// Storage
const LS_WEATHER_DATA = "wu-weather-data";

export const saveWeatherData = (weatherData: WeatherData) => {
  localStorage.setItem(LS_WEATHER_DATA, JSON.stringify(weatherData));
};

const getSavedWeatherData = () => {
  const weatherData = localStorage.getItem(LS_WEATHER_DATA);

  if (!weatherData) return null;

  const parsedData = JSON.parse(weatherData);

  parsedData.byHour = parsedData.byHour.map((hourData: SavedWeatherHourData) => {
    return { ...hourData, time: new Date(hourData.time) };
  })

  return parsedData as WeatherData;
};
