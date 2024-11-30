import styles from "./Weather.module.css";
import weatherApp from "../../images/weather-icons/weatherApp.png";
import wind from "../../images/weather-details/wind 1.svg";
import humidity from "../../images/weather-details/humidity 1.svg";
import pressure from "../../images/weather-details/pressure-white 1.svg";
import raining from "../../images/weather-icons/precipitation.png";
import sunset from "../../images/weather-details/sunset-white 1.svg";
import sunrise from "../../images/weather-details/sunrise-white 1.svg";

type Props = {
  temperature: number;
  tempFeelsLike: number;
  formattedSunrise: string;
  formattedSunset: string;
  weatherIcon: string | null;
  windSpeed: number;
  humidityInfo: number;
  pressureInfo: number;
  precipitation: number;
};

export const WeatherUI = ({
  temperature,
  tempFeelsLike,
  formattedSunrise,
  formattedSunset,
  weatherIcon,
  windSpeed,
  humidityInfo,
  pressureInfo,
  precipitation,
}: Props) => {
  return (
    <div className={styles.weatherInfoSection}>
      <div className={styles.temperatureSection}>
        <p>{temperature.toFixed()}°C</p>
        <p>Ощущается как {tempFeelsLike.toFixed()}°C</p>
        <div>
          <img src={sunrise} alt="" />
          <p>
            Восход -{" "}
            {formattedSunrise === "Invalid Date" ? "" : formattedSunrise}{" "}
          </p>
          <img src={sunset} alt="" />
          <p>
            Закат - {formattedSunset === "Invalid Date" ? "" : formattedSunset}{" "}
          </p>
        </div>
      </div>
      <img
        className={styles.sunnyIcon}
        src={
          weatherIcon
            ? `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`
            : weatherApp
        }
        alt=""
      />
      <div className={styles.weatherDetails}>
        <p>
          Влажность - {humidityInfo}%
          <img src={humidity} alt="" />
        </p>

        <p>
          Скорость ветра - {windSpeed} м/с
          <img src={wind} alt="" />
        </p>

        <p>
          Давление - {pressureInfo} мм.рт.ст
          <img src={pressure} alt="" />
        </p>

        <p>
          Осадки в жидком эквиваленте, мм - {precipitation}
          <img src={raining} alt="" />
        </p>
      </div>
    </div>
  );
};
