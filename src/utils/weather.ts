import {
  RawWeatherResponse,
  WeatherData,
  WeatherHourData,
} from "../types/weather";

const { REACT_APP_MET_USER_AGENT } = process.env;

export const fetchWeater = async (lat: number, lon: number) => {
  if (!REACT_APP_MET_USER_AGENT || !REACT_APP_MET_USER_AGENT.length)
    throw new Error("Missing environment variable");

  const api = `https://api.met.no/weatherapi/locationforecast/2.0/compact.json?lat=${lat}&lon=${lon}`;
  const requestHeader = new Headers();
  // requestHeader.append('If-Modified-Since', weather.lastMod);
  requestHeader.append("TE", "trailers");
  requestHeader.append("User-Agent", REACT_APP_MET_USER_AGENT);
  /*
    let options = {
        //TODO: Make If-Modified-Since request work in order to not resend and save bandwith
        headers: {'If-Modified-Since': 'Thu, 10 Sep 2020 09:02:53 GMT'}};
    */
  const response = await fetch(api, {
    headers: requestHeader,
  }).catch((error) => {
    console.error("Error:", error);
  });

  if (!response) return { error: "Error in response", data: null };

  if (response?.status !== 200) {
    console.error("Unexpected response:", response.status);
  }

  const error = null;

  const data = await response.json();

  console.log(data);

  return {
    error,
    data: normalizeWeatherData(data),
  };
};

export const normalizeWeatherData = (
  rawData: RawWeatherResponse
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
        symbolCode: data.next_1_Hours?.summary.symbol_code,
        percipitationAmount: data.next_1_Hours?.details?.percipitation_amount,
      },
      next6Hours: {
        symbolCode: data.next_6_Hours?.summary.symbol_code,
        percipitationAmount: data.next_6_Hours?.details?.percipitation_amount,
      },
    };
    return hourData;
  });

  return {
    byHour,
  };
};
