import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "src/api/api";

interface ICoord {
	lat: number,
	lon: number,
}

interface IWeatherImage {
	id: number,
	main: string,
	description: string,
	icon: string
}


interface IWeather {
	coord: ICoord,
	main: {
		temp: number,
		feels_like: number,
		temp_min: number,
		temp_max: number,
		pressure: number,
		humidity: number,
	},
	weather: IWeatherImage[],
	wind: {
		speed: number,
		deg: number,
		gust: number,
	},
	sys: {
		sunrise: number,
		sunset: number,
	},
	rain: {
		"1h": number
	},
	name: string,
	timezone: number,

	}

interface ITimeZone {
	sunrise: string,
	lng: number,
	countryCode: string,
	gmtOffset: number,
	rawOffset: number,
	sunset: string,
	timezoneId: string,
	dstOffset: number,
	countryName: string,
	time: string,
	lat: number

}

interface IWeatherState {
	weatherInfo: IWeather,
	city: any,
	lat: number,
	lon: number,
	isLoading: boolean,
	error: string | null,
	timezone: ITimeZone
}

const initialState:IWeatherState = {
	weatherInfo: {
		coord: {
			lat: 0,
			lon: 0
		},
		main: {
			temp: 0,
			feels_like: 0,
			temp_min: 0,
			temp_max: 0,
			pressure: 0,
			humidity: 0
		},
		weather: [
			{
			id: 0,
			main: "",
			description: "",
			icon: ""
		},
	],
		wind: {
			speed: 0,
			deg: 0,
			gust: 0,
		},
		sys: {
			sunrise: 0,
			sunset: 0
		},
		rain: {
			"1h": 0
		},
		name: '',
		timezone: 0,
	},
	city: [],
	lat:0,
	lon:0,
	isLoading:false,
	error: null,
	timezone: {
		"sunrise": "",
		"lng": 0,
		"countryCode": "",
		"gmtOffset": 0,
		"rawOffset": 0,
		"sunset": "",
		"timezoneId": "",
		"dstOffset": 0,
		"countryName": "",
		"time": "",
		"lat": 0
	}
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
		const response = await axios.get(` http://api.geonames.org/timezoneJSON?lat=${lat}&lng=${lon}&username=sakre_e`)
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