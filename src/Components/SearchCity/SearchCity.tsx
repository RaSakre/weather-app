import styles from './SearchCity.module.css'
import { useDispatch, useSelector } from 'src/store/store'

import { FormEvent, useEffect, useState } from 'react'
import { fetchCity, fetchCityWeather, fetchTimeZone } from 'src/slices/weatherSlice'

export const SearchCity = () => {

	const lat = useSelector(state => state.weatherReducer.lat)
	const lon = useSelector(state => state.weatherReducer.lon)
	const weather = useSelector(state => state.weatherReducer.weatherInfo)
	console.log(weather)
	const [city, setCityName] = useState('')
	const dispatch = useDispatch()
  const handleSubmit = (e:FormEvent) => {
    e.preventDefault();
    dispatch(fetchCity(city));
    localStorage.setItem('cityName', city);
  };

  useEffect(() => {
    if (lat !== 0 && lon !== 0) {
      dispatch(fetchCityWeather({ lat, lon }));
			dispatch(fetchTimeZone({lat, lon}));
    }
  }, [lat, lon, dispatch]);
	return (
		<div className={styles.searchWrapper}>
			<form className={styles.searchForm} >
				<input onChange={(e) => setCityName(e.target.value)} type="text" name="city" placeholder="Найдите, интересующий вас город" />
				<button onClick={handleSubmit}>Найти</button>
			</form>
		</div>
	)
}