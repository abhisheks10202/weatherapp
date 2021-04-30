// q = { city name } & appid = { API key }



const weatherApi = {
    key: "d1b8192511e5f13e1995004c3e0f35da",
    baseurl: "https://api.openweathermap.org/data/2.5/weather"
}

const searchInputBox = document.getElementById("input-box");

searchInputBox.addEventListener('keypress', (event) => {
    if (event.keyCode == 13) {
        document.querySelector('.weather-body').style.display = "block";
        console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
    }
});


function getWeatherReport(city) {
    fetch(`${weatherApi.baseurl}?q=${city}&appid=${weatherApi.key}&units=metric`)
        .then(weather => {
            return weather.json();
        }).then(showWeatherReport);
}

function showWeatherReport(weather) {
    console.log(weather);
    let city = document.getElementById("city");
    city.innerText = `${weather.name},${weather.sys.country}`;

    let temprature = document.getElementById("temp");
    temprature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let minMaxTemp = document.getElementById("min-max");
    minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C(min)/
    ${Math.ceil(weather.main.temp_max)}&deg;C(max)`;

    let weatherType = document.getElementById("weather");

    weatherType.innerHTML = `${weather.weather[0].main}`;

    let date = document.getElementById("date");
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);

    if (weatherType.textContent == 'Clear') {
        document.body.style.backgroundImage = 'url("./images/clear.jpg")';

    }
    if (weatherType.textContent == 'Clouds') {
        document.body.style.backgroundImage = 'url("./images/cloudy.jpg")';

    }
    if (weatherType.textContent == 'Rain') {
        document.body.style.backgroundImage = 'url("./images/rain.jpg")';

    }
    if (weatherType.textContent == 'Snow') {
        document.body.style.backgroundImage = 'url("./images/snow.jpg")';

    }
    if (weatherType.textContent == 'Thunderstorm') {
        document.body.style.backgroundImage = 'url("./images/thunderstorm.jpg")';

    }
    if (weatherType.textContent == 'Haze') {
        document.body.style.backgroundImage = 'url("./images/sunny.jpg")';

    }


}
// background - image: url();

function dateManage(dateArg) {
    let days = ["sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month} (${day}) , ${year}`;
}