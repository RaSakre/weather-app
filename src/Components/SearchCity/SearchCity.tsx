import { SearchCityUI } from "./SearchCityUI";
import { useDispatch, useSelector } from "src/store/store";

import { FormEvent, useEffect, useState } from "react";
import {
  fetchCity,
  fetchCityWeather,
  fetchTimeZone,
} from "src/slices/weatherSlice";

export const SearchCity = () => {
  const lat = useSelector((state) => state.weatherReducer.lat);
  const lon = useSelector((state) => state.weatherReducer.lon);

  const [city, setCityName] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(fetchCity(city));
    localStorage.setItem("cityName", city);
  };

  useEffect(() => {
    if (lat !== 0 && lon !== 0) {
      dispatch(fetchCityWeather({ lat, lon }));
      dispatch(fetchTimeZone({ lat, lon }));
    }
  }, [lat, lon, dispatch]);
  return <SearchCityUI handleSubmit={handleSubmit} setCityName={setCityName} />;
};
