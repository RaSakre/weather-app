import { LocationAndTime } from './Components/Location&Time/LocationAndTime';
import { WeatherInfo } from './Components/Weather/Weather';
import { SearchCity } from './Components/SearchCity/SearchCity';
import './App.css';
import { useDispatch, useSelector } from './store/store';
import { fetchCity, fetchCityWeather } from './slices/weatherSlice';
import { useEffect } from 'react';


function App() {
  const lat = useSelector(state => state.weatherReducer.lat);
  const lon = useSelector(state => state.weatherReducer.lon);
  const cityName = useSelector(state => state.weatherReducer.weatherInfo.name);
  const dispatch = useDispatch();

  useEffect(() => {
    // Проверяем localStorage на наличие сохраненного города
    const savedCity = localStorage.getItem('cityName');
    if (savedCity) {
      dispatch(fetchCity(savedCity));
    }
  }, [dispatch]);

  useEffect(() => {
    if (lat !== 0 && lon !== 0) {
      dispatch(fetchCityWeather({ lat, lon }));
      // Сохраняем город в localStorage
      localStorage.setItem('cityName', cityName);
    }
  }, [cityName, dispatch, lat, lon]);

  return (
    <>
      <SearchCity />
      <div className='appWrapper'>
        <LocationAndTime />
        <WeatherInfo />
      </div>
    </>
  );
}

export default App;
