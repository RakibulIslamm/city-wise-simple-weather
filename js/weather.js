// GPS
var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function success(pos) {
    var crd = pos.coords;
    // console.log(`More or less ${crd.accuracy} meters.`);
    loadMyWeather(crd.latitude, crd.longitude);
}
function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}
navigator.geolocation.getCurrentPosition(success, error, options);

// GPS End


// Load Weather
// Search Location
const userInput = document.getElementById('user-input');
const loadWeather = () => {
    const cityName = userInput.value;
    const errorMsg = document.getElementById('error-msg1');
    if (cityName == '') {
        errorMsg.style.display = 'block';
    } else {
        errorMsg.style.display = 'none';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName},1440,+880&appid=143f94029121f5175bd3737e4e2f0371`
        fetch(url)
            .then(res => res.json())
            .then(data => displayWeather(data))
            .catch(error => displayError(error));
    }
    userInput.value = '';
}


const displayError = error => {
    document.getElementById('error-msg2').style.display = 'block'
}


// My location
const loadMyWeather = (latitude, longitude) => {
    // console.log(latitude, longitude)
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=143f94029121f5175bd3737e4e2f0371`
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displayCurrent(data));
}



// Display Weather

const weatherContainer = document.getElementById('weather');
// Display my location weather
const displayCurrent = current => {
    // console.log(current);
    const weatherArrCount = () => {
        for (const weatherarr of current.weather) {
            return weatherarr
        }
    }
    const currentLocationWeather = weatherArrCount();
    // console.log(currentLocationWeather)

    weatherContainer.textContent = '';
    const div = document.createElement('div');
    div.classList.add('weather');
    div.innerHTML = `
    <h2 class="celcius">${parseInt(current.main.temp - 273.15)}<span>&#176;C</span></h2>
    <div class="city">
        <h2 class="city-name">${current.name}<sup>${current.sys.country}</sup></h2>
        <p class="descrip">${currentLocationWeather.description}</p>
    </div>
    <img class="icon" src="http://openweathermap.org/img/wn/${currentLocationWeather.icon}.png" alt="">
    `;
    weatherContainer.appendChild(div);
    changeBgImage(currentLocationWeather.description);


}


// Display search location Weather
const displayWeather = weather => {
    // console.log(weather);
    document.getElementById('error-msg2').style.display = 'none'
    const weatherArrCount = () => {
        for (const weatherarr of weather.weather) {
            return weatherarr
        }
    }
    const weatherDetails = weatherArrCount();

    weatherContainer.textContent = '';
    const div = document.createElement('div');
    div.classList.add('weather');
    div.innerHTML = `
    <h2 class="celcius">${parseInt(weather.main.temp - 273.15)}<span>&#176;C</span></h2>
    <div class="city">
        <h2 class="city-name">${weather.name}<sup>${weather.sys.country}</sup></h2>
        <p class="descrip">${weatherDetails.description}</p>
    </div>
    <img class="icon" src="http://openweathermap.org/img/wn/${weatherDetails.icon}.png" alt="">
    `;
    weatherContainer.appendChild(div);
    changeBgImage(weatherDetails.description);
}

const bgImage = document.querySelector('.bg');
const changeBgImage = desc => {
    if (desc == 'overcast clouds') {
        bgImage.style.backgroundImage = `linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)),
        url(images/overcast-clouds.jpg)`
    }
    else if (desc == 'few clouds') {
        bgImage.style.backgroundImage = `linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)),
        url(images/few-clouds.jpg)`
    }
    else if (desc == 'clear sky') {
        bgImage.style.backgroundImage = `linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)),
        url(images/clear-sky.jpg)`
    }
    else if (desc == 'scattered clouds') {
        bgImage.style.backgroundImage = `linear-gradient(180deg, rgb(0 11 93 / 72%), rgba(0, 0, 0, 0.7)),
        url(images/scattered-clouds.jpg)`
    }
    else if (desc == 'broken clouds') {
        bgImage.style.backgroundImage = `linear-gradient(180deg, rgb(0 11 93 / 72%), rgba(0, 0, 0, 0.7)),
        url(images/broken-clouds.png)`
    }
    else if (desc == 'shower rain') {
        bgImage.style.backgroundImage = `linear-gradient(180deg, rgb(0 11 93 / 72%), rgba(0, 0, 0, 0.7)),
        url(images/shower-rain.jpg)`
    }
    else if (desc == 'rain') {
        bgImage.style.backgroundImage = `linear-gradient(180deg, rgb(0 11 93 / 72%), rgba(0, 0, 0, 0.7)),
        url(images/rain.jpg)`
    }
    else if (desc == 'light rain') {
        bgImage.style.backgroundImage = `linear-gradient(180deg, rgb(0 11 93 / 72%), rgba(0, 0, 0, 0.7)),
        url(images/light-rain.jpg)`
    }
    else if (desc == 'thunderstorm') {
        bgImage.style.backgroundImage = `linear-gradient(180deg, rgb(0 11 93 / 72%), rgba(0, 0, 0, 0.7)),
        url(images/thunder.jpg)`
    }
    else if (desc == 'snow') {
        bgImage.style.backgroundImage = `linear-gradient(180deg, rgb(0 11 93 / 72%), rgba(0, 0, 0, 0.7)),
        url(images/snow.jpg)`
    }
    else if (desc == 'mist') {
        bgImage.style.backgroundImage = `linear-gradient(180deg, rgb(0 11 93 / 72%), rgba(0, 0, 0, 0.7)),
        url(images/mist.jpg)`
    }
    else if (desc == 'haze') {
        bgImage.style.backgroundImage = `linear-gradient(180deg, rgb(0 11 93 / 72%), rgba(0, 0, 0, 0.7)),
        url(images/mist.jpg)`
    }
}