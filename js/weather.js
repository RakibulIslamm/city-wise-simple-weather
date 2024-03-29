const weatherContainer = document.getElementById('weather');
const bgImage = document.querySelector('.bg');
const errorMsg = document.getElementById('error-msg1');
const errorMsg2 = document.getElementById('error-msg2');
const body = document.getElementById('body');



// Current Date 

let d = new Date();
let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
let mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(d);
let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
console.log(`${da}-${mo}-${ye}`);
document.getElementById('date').innerText = `${da} ${mo} ${ye}`;

// Current weekDay
// var currrentWeekDay = new Date().toLocaleTimeString('en-us', { weekday: 'long' }).split(' ')[0];
var currrentWeekDay = new Intl.DateTimeFormat('en', { weekday: 'long' }).format(d);
console.log(currrentWeekDay);
document.getElementById('week').innerText = currrentWeekDay;
// current time
var myVar = setInterval(myTimer, 1000);

function myTimer() {
    var d = new Date();
    var t = d.toLocaleTimeString();
    document.getElementById('time').innerText = t;
    if (t.innerText == '') {
        document.getElementById('loading').style.display = "block"
    } else {
        document.getElementById('loading').style.display = "none"
    }
}

// Set enter button click
const userInput = document.getElementById('user-input');
userInput.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("myButton").click();
    }
})

// Search Location Load
const loadWeather = () => {
    const cityName = userInput.value;
    if (cityName == '') {
        weatherContainer.textContent = '';
        errorMsg2.style.display = 'none';
        errorMsg.style.display = 'block';
        bgImage.style.backgroundImage = `linear-gradient(180deg, rgb(0 11 93 / 72%), rgba(0, 0, 0, 0.7)),
        url(images/danger.jpg)`
    } else {
        errorMsg.style.display = 'none';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=143f94029121f5175bd3737e4e2f0371`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data.message == "city not found") {
                    weatherContainer.textContent = '';
                    errorMsg.style.display = 'none';
                    errorMsg2.style.display = 'block';
                    bgImage.style.backgroundImage = `linear-gradient(180deg, rgb(0 11 93 / 72%), rgba(0, 0, 0, 0.7)),
                    url(images/danger.jpg)`
                } else {
                    displayWeather(data)
                }

            })

        /* .catch(() => {
            errorMsg.style.display = 'none';
            errorMsg2.style.display = 'block';
            weatherContainer.textContent = '';
            bgImage.style.backgroundImage = `linear-gradient(180deg, rgb(0 11 93 / 72%), rgba(0, 0, 0, 0.7)),
    url(images/danger.jpg)`
        }); */
    }

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
    changeBgImage(weatherDetails.description);

    weatherContainer.textContent = '';
    const div = document.createElement('div');
    div.classList.add('weather');
    div.innerHTML = `
    <h2 class="celcius">${parseInt(weather.main.temp - 273.15)}<span>&#176;C</span></h2>
    <div class="city">
        <h2 class="city-name">${weather.name}<sup>${weather.sys.country}</sup></h2>
        <p class="descrip">${weatherDetails.description}</p>
    </div>
    <img class="icon" src="https://openweathermap.org/img/wn/${weatherDetails.icon}@2x.png" alt="">
    `;
    weatherContainer.appendChild(div);
    userInput.value = '';
}


// Current Location Weather 
// GPS
navigator.geolocation.getCurrentPosition(function (position) {

    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    // Country
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=464ff0148418481097ab1d05c3226330`;
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => loadMyWeather(lat, lon, data.results[0].components.country_code, data.results[0].components.postcode));
});

// load Weather
const loadMyWeather = (latitude, longitude, countryAlpha, zip) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&zip=${zip},${countryAlpha}&appid=143f94029121f5175bd3737e4e2f0371`
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displayCurrent(data));
}

// Display current location weather
const displayCurrent = current => {
    if (current.message === "city not found") {
        console.log('something went wrong');
    } else {
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
        <img class="icon" src="https://openweathermap.org/img/wn/${currentLocationWeather.icon}@2x.png" alt="">
        `;
        weatherContainer.appendChild(div);
        changeBgImage(currentLocationWeather.description);
    }


}



// Change BG Image
const changeBgImage = desc => {
    // console.log(desc);
    if (desc == 'overcast clouds') {
        bgImage.style.backgroundImage = `linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(16 50 53 / 70%)),
        url(images/overcast-clouds.jpg)`
    }
    else if (desc == 'few clouds') {
        bgImage.style.backgroundImage = `linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(16 50 53 / 70%)),
        url(images/few-clouds.jpg)`
    }
    else if (desc == 'clear sky') {
        bgImage.style.backgroundImage = `linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(16 50 53 / 70%)),
        url(images/clear-sky.jpg)`
    }
    else if (desc == 'scattered clouds') {
        bgImage.style.backgroundImage = `linear-gradient(180deg, rgb(0 11 93 / 72%), rgba(16 50 53 / 70%)),
        url(images/scattered-clouds.jpg)`
    }
    else if (desc == 'broken clouds') {
        bgImage.style.backgroundImage = `linear-gradient(180deg, rgb(0 11 93 / 72%), rgba(16 50 53 / 70%)),
        url(images/broken-clouds.png)`
    }
    else if (desc == 'shower rain') {
        bgImage.style.backgroundImage = `linear-gradient(180deg, rgb(0 11 93 / 72%), rgba(16 50 53 / 70%)),
        url(images/shower-rain.jpg)`
    }
    else if (desc == 'rain') {
        bgImage.style.backgroundImage = `linear-gradient(180deg, rgb(0 11 93 / 72%), rgba(16 50 53 / 70%)),
        url(images/rain.jpg)`
    }
    else if (desc == 'heavy intensity rain') {
        bgImage.style.backgroundImage = `linear-gradient(180deg, rgb(0 11 93 / 72%), rgba(16 50 53 / 70%)),
        url(images/rain.jpg)`
    }
    else if (desc == 'moderate rain') {
        bgImage.style.backgroundImage = `linear-gradient(180deg, rgb(0 11 93 / 72%), rgba(16 50 53 / 70%)),
        url(images/rain.jpg)`
    }
    else if (desc == 'light rain') {
        bgImage.style.backgroundImage = `linear-gradient(180deg, rgb(0 11 93 / 72%), rgba(16 50 53 / 70%)),
        url(images/light-rain.jpg)`
    }
    else if (desc == 'thunderstorm') {
        bgImage.style.backgroundImage = `linear-gradient(180deg, rgb(0 11 93 / 72%), rgba(16 50 53 / 70%)),
        url(images/thunder.jpg)`
    }
    else if (desc == 'snow') {
        bgImage.style.backgroundImage = `linear-gradient(180deg, rgb(0 11 93 / 72%), rgba(16 50 53 / 70%)),
        url(images/snow.jpg)`
    }
    else if (desc == 'mist') {
        bgImage.style.backgroundImage = `linear-gradient(180deg, rgb(0 11 93 / 72%), rgba(16 50 53 / 70%)),
        url(images/mist.jpg)`
    }
    else if (desc == 'haze') {
        bgImage.style.backgroundImage = `linear-gradient(180deg, rgb(0 11 93 / 72%), rgba(16 50 53 / 70%)),
        url(images/mist.jpg)`
    }
    else if (desc == 'fog') {
        bgImage.style.backgroundImage = `linear-gradient(180deg, rgb(0 11 93 / 72%), rgba(16 50 53 / 70%)),
        url(images/mist.jpg)`
    }
    else {
        bgImage.style.backgroundImage = `linear-gradient(180deg, rgb(0 11 93 / 72%), rgba(16 50 53 / 70%)),
        url(images/default.jpg)`
    }
}