const { REACT_APP_MET_USER_AGENT } = process.env;

export const fetchWeater = async (lat: number, lon: number) => {
  if (!REACT_APP_MET_USER_AGENT)
    throw new Error("Missing environment variable");

  const api = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`;
  const requestHeader = new Headers();
  // requestHeader.append('If-Modified-Since', weather.lastMod);
  requestHeader.append("TE", "trailers");
  requestHeader.append("User-Agent", REACT_APP_MET_USER_AGENT);
  /*
    let options = {
        //TODO: Make If-Modified-Since request work in order to not resend and save bandwith
        headers: {'If-Modified-Since': 'Thu, 10 Sep 2020 09:02:53 GMT'}};
    */
  return fetch(api, {
    headers: requestHeader,
  })
    .then((response: any) => {
      console.log(response.headers);
      console.log(response.status);

      return response.json();
    })
    .then((data) => {
      console.log(data);
      return {
        units: data.properties.meta,
        data: data.properties.timeseries,
      };
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
