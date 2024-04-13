async function getWeather() {
    const apiKey = '0fb70bcbeecc118f1324ea60942b3686'; 
    const city = document.getElementById('city').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === '404') {
            document.getElementById('weather-info').innerHTML = 'City not found';
            return;
        }

        document.getElementById('temp').innerText = `${data.main.temp}°C`;
        document.getElementById('description').innerText = data.weather[0].description;
        document.getElementById('humidity').innerText = `${data.main.humidity}%`;
        document.getElementById('wind-speed').innerText = `${data.wind.speed} m/s`;

        const hourlyForecast = await fetchHourlyForecast(data.coord.lat, data.coord.lon, apiKey);
        displayHourlyForecast(hourlyForecast);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

async function fetchHourlyForecast(lat, lon, apiKey) {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.hourly;
    } catch (error) {
        console.error('Error fetching hourly forecast:', error);
        return [];
    }
}

function displayHourlyForecast(hourlyForecast) {
    const forecastDetailsContainer = document.getElementById('hourly-forecast-details');
    forecastDetailsContainer.innerHTML = '';

    hourlyForecast.slice(0, 5).forEach(hourlyData => {
        const hour = new Date(hourlyData.dt * 1000).getHours();
        const temp = hourlyData.temp;

        const hourlyForecastItem = document.createElement('div');
        hourlyForecastItem.classList.add('hourly-forecast-item');
        hourlyForecastItem.innerHTML = `
            <p>${hour}:00</p>
            <p>${temp}°C</p>
        `;
        forecastDetailsContainer.appendChild(hourlyForecastItem);
    });
}