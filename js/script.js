const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");

const API_KEY = "49dda0c6d525a40193428007fe69fed2";

const getWeatherDetails = (cityName, lat, lon) => {
    const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

    fetch(WEATHER_API_URL).then(res => res.json()).then(data =>{


        const uniqueForecastDays = [];
        const fiveDaysForecast = data.list.filter(forecast => {
            const forecastDate = new Date(forecast.dt_txt).getDate();
            if(!uniqueForecastDays.includes(forecastDate)) {
                return uniqueForecastDays.push(forecastDate);
            }
        })
    }).catch(() => {
        alert("Er is een probleem bij het lade van de voorspelling");
    });

}
const getCityCoordinates = () => {
    const cityName = cityInput.value.trim();
    if(!cityName) return;
    const GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;

    fetch(GEOCODING_API_URL).then(res => res.json()).then(data =>{
        if(!data.length) return alert(`Geen coordinaten gevonden voor ${cityName}`);
        const { name, lat, lon } = data[0];
        getWeatherDetails(name, lat, lon);
    }).catch(() => {
        alert("Er is een probleem bij het zoeken naar de coordinaten");
    });
}

searchButton.addEventListener("click", getCityCoordinates);