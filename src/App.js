import React, { useEffect, useState } from "react";
import './App.css';
import Search from './componets/search/search';
import CurrentWeather from './componets/current-weather/current-weather';
import { WEATHER_API_URL, WEATHER_API_KEY } from './componets/api';
import Forecast from './componets/forecust/forecust';

function App() {

  //State hook
  const [currentWeatherFetch, setCurrentWeather] = useState(null);
  const [forecustFetch, setForecust] = useState(null);

  const handleOnSearchChange = (searchData) => {
    // console.log(searchData);
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)

    const forecustFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)

    Promise.all([currentWeatherFetch, forecustFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecustResponse = await response[1].json();

        setCurrentWeather({city: searchData.label, ...weatherResponse});
        setForecust({city: searchData.label, ...forecustResponse});
      })
      .catch((err) => console.log(err))
  }

  console.log(currentWeatherFetch);
  console.log(forecustFetch);

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeatherFetch && <CurrentWeather data={currentWeatherFetch} />}
      {forecustFetch && <Forecast data={forecustFetch}/>}
    </div>
  );
}

export default App;
