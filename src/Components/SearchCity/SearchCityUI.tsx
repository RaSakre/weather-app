import { FormEvent } from 'react'
import styles from './SearchCity.module.css'

type Props = {
	handleSubmit: (e:FormEvent) => void
	setCityName: (value: string) => void
}


export const SearchCityUI = ({handleSubmit, setCityName}:Props) => {
	return (
		<div className={styles.searchWrapper}>
		<form className={styles.searchForm}>
			<input
				onChange={(e) => setCityName(e.target.value)}
				type="text"
				name="city"
				placeholder="Найдите, интересующий вас город"
			/>
			<button onClick={handleSubmit}>Найти</button>
		</form>
	</div>
	)
}