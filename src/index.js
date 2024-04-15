function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#weather-city-name");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");
  let feelsLikeElement = document.querySelector("#feels-like");


  temperature = response.data.temperature.current

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = Math.round(temperature);
  feelsLikeElement.innerHTML = response.data.temperature.feels_like;
  
  getForecast(response.data.city);
}

function fahrenheitTemperature(event) {
  event.preventDefault();
  
  let currentTemp = document.querySelector("#temperature")
  
  let fahrenheitTemperature = ((currentTemp.outerText * 9) / 5 + 32)
  
  celsiusTemp.classList.remove("active");
  fahrenheitTemp.classList.add("active");
  
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function celsiusTemperature(event) {
  event.preventDefault();
  
  
  let currentTemp = document.querySelector("#temperature");
  let celsiusTemperature = ((currentTemp.outerText - 32) * 5 /9)
  celsiusTemp.classList.add("active");
  fahrenheitTemp.classList.remove("active");
  
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}



function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let dateDay = date.getDate();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  
  let day = days[date.getDay()];
  
  let months = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  
  let month = months[date.getMonth()];
  
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  
  return `${day}, ${month} ${dateDay} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "ab9d5a54441t2501e86dfdb9a436be3o";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  
  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "ab9d5a54441t2501e86dfdb9a436be3o";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  
  axios(apiUrl).then(displayForecast);
  
  console.log(apiUrl);
}

function displayForecast(response) {
  console.log(response.data);
  
  let forecastElement = document.querySelector("#forecast");
  
  let forecastHtml = "";
  
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
      forecastHtml +
      `
      <div class="weather-forecast-day">
      <div class="weather-forecast-date">${formatDay(day.time)}</div>
      <div>
      <img src="${day.condition.icon_url}" class="weather-forecast-icon"/>
      </div>
      <div class="weather-forecast-temperatures">
      
      
      
      <div class="weather-forecast-temperature">
      <strong>${Math.round(day.temperature.maximum)}°</strong>
      </div>
      <div class="weather-forecast-temperature">${Math.round(
        day.temperature.minimum
        )}°</div>
        </div>
        
        </div>
        `;
      }
    });
    
    forecastElement.innerHTML = forecastHtml;
  }
  
  let searchFormElement = document.querySelector("#search-form");
  searchFormElement.addEventListener("submit", handleSearchSubmit);
  let fahrenheitTemp = document.querySelector("#fahrenheitTemp");
  fahrenheitTemp.addEventListener("click", fahrenheitTemperature);
  
  let celsiusTemp = document.querySelector("#celsiusTemp");
  celsiusTemp.addEventListener("click", celsiusTemperature);
  
  searchCity("Vancouver");
  displayForecast();
  
  
  
  
