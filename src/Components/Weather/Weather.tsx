import { WeatherUI } from "./WeatherUI";
import { useSelector } from "src/store/store";

export const WeatherInfo = () => {
  const setSunsetSunrise = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const temperature = useSelector(
    (state) => state.weatherReducer.weatherInfo.main.temp
  );
  const tempFeelsLike = useSelector(
    (state) => state.weatherReducer.weatherInfo.main.feels_like
  );
  const sunriseInfo = useSelector(
    (state) => state.weatherReducer.timezone.sunrise
  );
  const sunsetInfo = useSelector(
    (state) => state.weatherReducer.timezone.sunset
  );
  const humidityInfo = useSelector(
    (state) => state.weatherReducer.weatherInfo.main.humidity
  );
  const windSpeed = useSelector(
    (state) => state.weatherReducer.weatherInfo.wind.speed
  );
  const pressureInfo = useSelector(
    (state) => state.weatherReducer.weatherInfo.main.pressure
  );
  const rainInfo = useSelector(
    (state) => state.weatherReducer.weatherInfo.rain
  );
  const precipitation = rainInfo?.["1h"] || 0;
  const weatherInfo = useSelector(
    (state) => state.weatherReducer.weatherInfo.weather
  );
  const weatherIcon = weatherInfo.length > 0 ? weatherInfo[0].icon : null;
  const formattedSunrise = setSunsetSunrise(sunriseInfo);
  const formattedSunset = setSunsetSunrise(sunsetInfo);

  return (
    <WeatherUI
      temperature={temperature}
      tempFeelsLike={tempFeelsLike}
      formattedSunrise={formattedSunrise}
      formattedSunset={formattedSunset}
      humidityInfo={humidityInfo}
      windSpeed={windSpeed}
      pressureInfo={pressureInfo}
      precipitation={precipitation}
      weatherIcon={weatherIcon}
    />
  );
};
