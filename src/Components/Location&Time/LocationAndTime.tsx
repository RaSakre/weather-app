import { LocationTimeUI } from "./LocationAndTimeUI";
import { useEffect, useState } from "react";
import { useSelector } from "src/store/store";
import { WeekDaysTypes, MonthsTypes } from "src/types/time";

const weekDays: WeekDaysTypes = {
  1: "Monday,",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  0: "Sunday",
};

const months: MonthsTypes = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};

export const LocationAndTime = () => {
  const city = useSelector((state) => state.weatherReducer.weatherInfo.name);
  const timezoneOffset = useSelector(
    (state) => state.weatherReducer.weatherInfo.timezone
  );
  const [time, setTime] = useState("");
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Получаем текущее время для указанного города
      const localTime = new Date(Date.now() + timezoneOffset * 1000);
      setTime(
        localTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "UTC",
        })
      );
    }, 60000);

    // Устанавливаем начальное значение времени
    const initialTime = new Date(Date.now() + timezoneOffset * 1000);
    setTime(
      initialTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC",
      })
    );

    return () => clearInterval(intervalId);
  }, [timezoneOffset]);

  const dayNumber = new Date(Date.now() + timezoneOffset * 1000).getDay();
  const dayName = weekDays[dayNumber];
  const monthsNumber = new Date(Date.now() + timezoneOffset * 1000).getMonth();
  const monthName = months[monthsNumber];
  const date = new Date(Date.now() + timezoneOffset * 1000).getDate();
  return (
    <LocationTimeUI
      city={city}
      dayName={dayName}
      monthName={monthName}
      date={date}
      time={time}
    />
  );
};
