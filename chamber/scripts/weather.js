const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("#description");
const highTemp = document.querySelector("#high-temp");
const lowTemp = document.querySelector("#low-temp");
const humidity = document.querySelector("#humidity");
const sunrise = document.querySelector("#sunrise");
const sunset = document.querySelector("#sunset");

// Variables for the URL
const myKey = "9c272f09ec387d72a0dac9384bbc427c";
const myLat = "-2.0384";
const myLong = "-79.8955";

// Full path 
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&units=imperial&appid=${myKey}`
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLong}&units=imperial&appid=${myKey}`

// Current weather data
async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function formatTime(timestamp) {
    return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit"
    });
}

function displayResults(data) {    
    currentTemp.innerHTML = `${Math.round(data.main.temp)}&deg;F`;
    
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;    
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', data.weather[0].description);
    
    captionDesc.textContent = `${data.weather[0].description}`;
    
    highTemp.innerHTML = `${Math.round(data.main.temp_max)}&deg;`;
    lowTemp.innerHTML = `${Math.round(data.main.temp_min)}&deg;`;
    humidity.textContent = `${data.main.humidity}%`;
    
    sunrise.textContent = formatTime(data.sys.sunrise);
    sunset.textContent = formatTime(data.sys.sunset);
}

function formatDay(daystamp) {
    return new Date(daystamp * 1000).toLocaleDateString("en-US", {
        weekday: "long"
    });
}

async function apiFetchForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayForecast(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayForecast(data) {
    const dayZero = document.querySelector("#dayZero");
    const dayOne = document.querySelector("#dayOne");

    dayZero.innerHTML = `${Math.round(data.list[0].main.temp)}&deg;F`;
    dayOne.innerHTML = `${formatDay(data.list[8].dt)}: ${Math.round(data.list[1].main.temp)}&deg;F`;
    dayTwo.innerHTML = `${formatDay(data.list[16].dt)}: ${Math.round(data.list[1].main.temp)}&deg;F`;
}

apiFetch();
apiFetchForecast();