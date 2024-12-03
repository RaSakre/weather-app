import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "src/api/api";
import { defaultCoord, defaultMainWeather, defaultRain, defaultSys, defaultTimezone, defaultWeatherImage, defaultWind, ICoord, IWeatherState } from "../types/sliceTypes";


const initialState: IWeatherState = {
  weatherInfo: {
    coord: defaultCoord,
    main: defaultMainWeather,
    weather: [defaultWeatherImage],
    wind: defaultWind,
    sys: defaultSys,
    rain: defaultRain,
    name: '',
    timezone: 0,
  },
  city: [],
  lat: 0,
  lon: 0,
  isLoading: false,
  error: null,
  timezone: defaultTimezone,
};

export const fetchCity = createAsyncThunk(
	"weather/fetchCity",
	async (city: string) => {
		const response = await api.get(`/geo/1.0/direct?q=${city}&appid=${process.env.REACT_APP_API_KEY}`);
		return response.data
	}
)

export const fetchCityWeather = createAsyncThunk(
	"weather/fetchCityWeather",
	async ({lat, lon}:ICoord) => {
		const response = await api.get(`/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&&appid=${process.env.REACT_APP_API_KEY}`)
		return response.data
	}
)

export const fetchTimeZone = createAsyncThunk(
	"weather/fetchTimeZone",
	async ({lat, lon}:ICoord) => {
		const response = await axios.get(`http://api.geonames.org/timezoneJSON?lat=${lat}&lng=${lon}&username=sakre_e`)
		return response.data
	}
)

const weatherSlice = createSlice({
  name: "weatherSlice",
	initialState,
	reducers: {

	},
	extraReducers: (builder) => {
		builder.addCase(fetchCity.fulfilled, (state, action) => {
			state.city = action.payload
			state.lat = action.payload[0].lat
			state.lon = action.payload[0].lon
		})
		builder.addCase(fetchCityWeather.fulfilled, (state, action) => {
			state.weatherInfo = action.payload
		})
			builder.addCase(fetchTimeZone.fulfilled, (state, action) => {
				state.timezone = action.payload
			})
	}
})

//export const {setCity } = weatherSlice.actions

export default weatherSlice.reducer