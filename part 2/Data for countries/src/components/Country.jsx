import {useEffect, useState} from "react";
import axios from "axios";

const apikey = import.meta.env.VITE_SOME_KEY;

function convertToCelsius(temp) {
    return ((temp - 273.15)).toFixed(2);
}

function Country({country}) {
    const [weather, setWeather] = useState({ temperature: '', wind: '' });

    useEffect(() => {
        const lat = country.latlng[0];
        const lng = country.latlng[1];

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apikey}`;

        axios.get(url)
            .then(response => {
                console.log(response.data)
                const temperature = convertToCelsius(response.data.main.temp);
                const wind = response.data.wind.speed;
                const icon = response.data.weather[0].icon;
                setWeather({ temperature, wind, icon });
            })
            .catch(err => console.log(err.message));
    }, [country]);

    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <h4>languages:</h4>
            <ul>
                {Object.values(country.languages).map((lang, i) => <li key={i}>{lang}</li>)}
            </ul>
            <img src={country.flags.png} />
            <h3>Weather in {country.capital}</h3>
            {weather.temperature && <p>temperature {weather.temperature} Celsius</p>}
            {weather.icon && <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} />}
            {weather.wind && <p>wind {weather.wind} m/s</p>}
        </div>
    )
}

export default Country