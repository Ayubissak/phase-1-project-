async function main() {
    const city = 'nairobi'; 
    const weatherData = await fetchWeatherData(city);

    if (weatherData !== null) {
        console.log('Weather Data:', weatherData);
    } else {
        console.log('Failed to fetch weather data for', city);
    }
}