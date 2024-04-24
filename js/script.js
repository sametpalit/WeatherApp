const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");
const locationButton = document.querySelector(".location-btn")
const currentWeatherDiv = document.querySelector(".current-weather");
const weatherCardsDiv = document.querySelector(".weather-cards");

const API_KEY = "49dda0c6d525a40193428007fe69fed2";

const createWeatherCard = (cityName, weatherItem, index) => {
    if (index === 0) { //html voor huidige weer card
        return `                    
        <div class="details">
            <h2>${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h2>
            <h4><i class="fas fa-temperature-high" style="color: #a0a0d6;"></i>    ${(weatherItem.main.temp - 273.15).toFixed(2)}°C </h4>
            <h4><i class="fas fa-tint" style="color: #a0a0d6;"></i>    ${weatherItem.main.humidity}%</h4>
            <h4><i class="fas fa-wind" style="color: #a0a0d6;"></i>    ${weatherItem.wind.speed} km/h</h4>
        </div>
        <div class="icon">
            <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
            <h4>${weatherItem.weather[0].description}</h4>
        </div>`;

    } else{ //html voor de andere vijf dagen
    return `<li class="card">
                <h3>(${weatherItem.dt_txt.split(" ")[0]})</h3>
                <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png" alt="weather-icon">
                <h4><i class="fas fa-temperature-high" style="color: #a0a0d6;"></i>    ${(weatherItem.main.temp - 273.15).toFixed(2)}°C </h4>
                <h4><i class="fas fa-tint" style="color: #a0a0d6;"></i>    ${weatherItem.main.humidity}%</h4>
                <h4><i class="fas fa-wind" style="color: #a0a0d6;"></i>    ${weatherItem.wind.speed} km/h</h4>
            </li>`;
        }
}
const getWeatherDetails = (cityName, lat, lon) => {
    const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

    fetch(WEATHER_API_URL)
        .then(response => response.json())
        .then(data => {
            const currentDate = new Date();
            const currentTime = currentDate.getTime();

            const fiveDaysForecast = data.list.filter(forecast => {
                const forecastDateTime = new Date(forecast.dt_txt).getTime();
                return forecastDateTime > currentTime;
            }).slice(0, 5); 

            cityInput.value = "";
            currentWeatherDiv.innerHTML = "";
            weatherCardsDiv.innerHTML = "";

            fiveDaysForecast.forEach((weatherItem, index) => {
                weatherCardsDiv.insertAdjacentHTML("beforeend", createWeatherCard(cityName, weatherItem, index + 1));
            });

            currentWeatherDiv.insertAdjacentHTML("beforeend", createWeatherCard(cityName, data.list[0], 0));
        })
        .catch(() => {
            alert("Er is een probleem bij het laden van de voorspelling");
        });
};
const getCityCoordinates = () => {
    const cityName = cityInput.value.trim();
    if (!cityName) return;
    const GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;

    fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
        if (!data.length) return alert(`Geen coordinaten gevonden voor ${cityName}`);
        const { name, lat, lon } = data[0];
        getWeatherDetails(name, lat, lon);
    }).catch(() => {
        alert("Er is een probleem bij het zoeken naar de coordinaten");
    });
}

const getUserCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
        position => {
            const { latitude, longitude} = position.coords;
            const REVERSE_GEOCODING_URL = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;
            //verkrijg stadsnaam door coordinaten via reverse geocoding API
            fetch(REVERSE_GEOCODING_URL).then(res => res.json()).then(data => {
                const { name,} = data[0];
                getWeatherDetails(name, latitude, longitude);
            }).catch(() => {
                alert("Er is een probleem bij het zoeken naar de stad");
            });
        },
        error => {
            if(error.code === error.PERMISSION_DENIED) {
                alert("Geolocatie vezoek afgewezen. Reset uw locatie toestemming voor acces.")
            }
        }
    );
}

locationButton.addEventListener("click", getUserCoordinates);
searchButton.addEventListener("click", getCityCoordinates);
cityInput.addEventListener("keyup", e=> e.key === "Enter" && getCityCoordinates());