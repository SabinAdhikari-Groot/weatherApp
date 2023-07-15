setInterval(showTime = () => {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() + '&nbspA.D.';
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    document.getElementById("date").innerHTML = `Date: ${date}<br>Local Time Nepal: `;
    document.getElementById("clock").innerHTML = time;
}, 1000);

const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weatherImg = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const pressure = document.querySelector('.pressure');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const locationNotFound = document.querySelector('.location-not-found');
const weatherBody = document.querySelector('.weather-body');
const defaultCity = 'Tansen';
const cityName = document.getElementById('location');

let errorTimeoutId;

function showDefaultWeather() {
    checkWeather(defaultCity);
}

async function checkWeather(city) {
    
    const apiKey = "1537d2b81095284cf965aa2b813660e4";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
        const weatherData = await fetch(url).then(response => response.json());

        weatherBody.style.display = 'flex';
        temperature.innerHTML = `${Math.round(weatherData.main.temp - 273.15)}°C`;
        description.innerHTML = `${weatherData.weather[0].description}`;
        pressure.innerHTML = `Pressure(atm):${weatherData.main.pressure}Pa`;
        humidity.innerHTML = `${weatherData.main.humidity}%`;
        windSpeed.innerHTML = `${weatherData.wind.speed}Km/H`;
        cityName.innerHTML =  `<i class="fa-solid fa-location-dot"></i>&nbsp${city}`;

        switch (weatherData.weather[0].main) {
            case 'Clouds':
                weatherImg.src = 'cloudy.png';
                break;
            case 'Clear':
                weatherImg.src = 'sun.png';
                break;
            case 'Rain':
                weatherImg.src = 'rainy.png';
                break;
            case 'Mist':
                weatherImg.src = 'foggy.png';
                break;
            case 'Snow':
                weatherImg.src = 'snowy.png';
                break;
        }
    } catch (error) {
        locationNotFound.textContent = 'Location was not found on open weather API.';
        errorTimeoutId = setTimeout(() => {
            locationNotFound.textContent = '';
        }, 10000);
    }
}
showDefaultWeather();

searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});

inputBox.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        checkWeather(inputBox.value);
    }
    locationNotFound.textContent = '';
});
