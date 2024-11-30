import styles from './LocationTime.module.css'

type Props = {
	city: string,
	time: string,
	dayName: string,
	monthName: string,
	date: number
}


export const LocationTimeUI = ({city, time, dayName, monthName, date}:Props) => {
	return (
		<div className={styles.loctimeWrapper}>
		<div className={styles.loctimeInfo}>
			<h2>Погода в {city}</h2>
			<p>{time}</p>
			<p>{`${dayName} ${monthName} ${date}`}</p>
		</div>
	</div>
	)
}