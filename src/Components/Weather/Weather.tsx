import weatherApp from '../../images/weather-icons/weatherApp.png'
import wind from '../../images/weather-details/wind 1.svg'
import humidity from '../../images/weather-details/humidity 1.svg'
import pressure from '../../images/weather-details/pressure-white 1.svg'
import raining from '../../images/weather-icons/precipitation.png'
import sunset from '../../images/weather-details/sunset-white 1.svg'
import sunrise from '../../images/weather-details/sunrise-white 1.svg'
import styles from './Weather.module.css'
import { useSelector } from 'src/store/store'


export const WeatherInfo = () => {
	const setSunsetSunrise = (dateTimeString:string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};


const temperature = useSelector(state => state.weatherReducer.weatherInfo.main.temp)
const tempFeelsLike = useSelector(state => state.weatherReducer.weatherInfo.main.feels_like)
const sunriseInfo = useSelector(state => state.weatherReducer.timezone.sunrise)
const sunsetInfo = useSelector(state => state.weatherReducer.timezone.sunset)
const humidityInfo = useSelector(state => state.weatherReducer.weatherInfo.main.humidity)
const windSpeed = useSelector(state => state.weatherReducer.weatherInfo.wind.speed)
const pressureInfo = useSelector(state => state.weatherReducer.weatherInfo.main.pressure)
const rainInfo = useSelector(state => state.weatherReducer.weatherInfo.rain)
const precipitation = rainInfo?.['1h'] || 0;
const formattedSunrise = setSunsetSunrise(sunriseInfo);
const formattedSunset = setSunsetSunrise(sunsetInfo);
const weatherInfo = useSelector(state => state.weatherReducer.weatherInfo.weather);
const weatherIcon = weatherInfo.length > 0 ? weatherInfo[0].icon : null;

	return (
		<div className={styles.weatherInfoSection}>
			<div className={styles.temperatureSection}>
				<p>{temperature.toFixed()}°C</p>
				<p>Ощущается как {tempFeelsLike.toFixed()}°C</p>
				<div>
					<img src={sunrise} alt="" />
					<p>Восход - {formattedSunrise === 'Invalid Date' ? '' : formattedSunrise} </p>
					<img src={sunset} alt="" />
					<p>Закат - {formattedSunset === 'Invalid Date' ? '' : formattedSunset} </p>

				</div>
			</div>
			<img 
        className={styles.sunnyIcon} 
        src={weatherIcon ? `https://openweathermap.org/img/wn/${weatherIcon}@2x.png` : weatherApp} 
        alt="" 
    />
			<div className={styles.weatherDetails}>
				<p>Влажность - {humidityInfo}%
				<img src={humidity} alt="" />
				</p>
				
				<p>Скорость ветра - {windSpeed} м/с
				<img src={wind} alt="" />
				</p>
				
				<p>Давление - {pressureInfo} мм.рт.ст
				<img src={pressure} alt="" />
				</p>
				
				<p>Осадки в жидком эквиваленте, мм - {precipitation}
				<img src={raining} alt="" />
				</p>
				
			</div>
		</div>
	)
}