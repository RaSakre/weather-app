import styles from './LocationTime.module.css'
import { useEffect, useState } from 'react'
import { useSelector } from 'src/store/store'

const weekDays:any = {
	1: 'Monday,',
	2: 'Tuesday',
	3: 'Wednesday',
	4: 'Thursday',
	5: 'Friday',
	6: 'Saturday',
	0: 'Sunday',
	}

	const months:any = {
		0: 'January',
		1: 'February',
		2: 'March',
		3: 'April',
		4: 'May',
		5: 'June',
		6: 'July',
		7: 'August',
		8: 'September',
		9: 'October',
		10: 'November',
		11: 'December',
	}

	export const LocationAndTime = () => {
		const city = useSelector(state => state.weatherReducer.weatherInfo.name);
		const timezoneOffset = useSelector(state => state.weatherReducer.weatherInfo.timezone); 
		const [time, setTime] = useState('');
		useEffect(() => {
			const intervalId = setInterval(() => {
				// Получаем текущее время для указанного города
				const localTime = new Date(Date.now() + timezoneOffset * 1000);
				setTime(localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' , timeZone: 'UTC'}));
			}, 60000);
	
			// Устанавливаем начальное значение времени
			const initialTime = new Date(Date.now() + timezoneOffset * 1000);
			setTime(initialTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC'}));
	
			return () => clearInterval(intervalId); 
		}, [timezoneOffset]);
	
		const dayNumber = new Date(Date.now() + timezoneOffset * 1000).getDay();
		const dayName = weekDays[dayNumber];
		const monthsNumber = new Date(Date.now() + timezoneOffset * 1000).getMonth();
		const monthName = months[monthsNumber];
		const date = new Date(Date.now() + timezoneOffset * 1000).getDate();
		return (
			<div className={styles.loctimeWrapper}>
				<div className={styles.loctimeInfo}>
					<h2>Погода в {city}</h2>
					<p>{time}</p>
					<p>{`${dayName} ${monthName} ${date}`}</p>
				</div>
			</div>
		);
	};



