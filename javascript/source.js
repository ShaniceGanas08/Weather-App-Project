function formatDate(timestamp){
let date = new Date(timestamp);
let hours = date.getHours();
 if (hours < 10) {
    hours = `0${hours}`;
  }
let minutes = date.getMinutes();
if (minutes < 10) {
    minutes = `0${minutes}`;
  }
 let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;

}

function weatherCondition(response) {
celsiusTemperature = response.data.main.temp;

  console.log(response.data);
  let nameCity = document.querySelector("#name");
  nameCity.innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    celsiusTemperature
  );
  document.querySelector("#humid").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  date.innerHTML = formatDate(response.data.dt * 1000);
let iconElement = document.querySelector("#icon");
iconElement.setAttribute("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
forecastData(response.data.coord);
}

function search(city){
let apiKey = "842b36d55cb28eba74a018029d56b04c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
let query = document.querySelector("#query");
search(query.value);
}
let celsiusTemperature = null;

function fahrenheitTemperature(event){
  event.preventDefault();
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahTemperature);
}

function displayCelsiusTemperature(event){
event.preventDefault();
celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
function formatDay(timestamp){
  let date = new Date(timestamp * 1000);
  let days = ["Mon","Tue", "Wed", "Thu", "Fri", "Sat","Sun"]
return days[date.getDay()];
}

function forecastData(coordinates) {
  let apiKey = "842b36d55cb28eba74a018029d56b04c";
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response){
  console.log(response.data);
  
  let forecastHtml= "";
response.data.daily.forEach(function (day, index){
  if(index < 5){
forecastHtml = 
forecastHtml +
` <div class="tues">
                <div class="col day">${formatDay(day.dt)}</div>
                <div class="col date">19/09</div>
                <div class="col">
                  <div class="icon"> <img src="${day.weather.icon}"/></div>
                  <div class="col temp">${Math.round(day.temp.max)}°C | <span class="min">${Math.round(day.temp.min)}°C</span></div>
                </div>
              </div>
`;
  }
});



let forecastElement = document.querySelector("#weather-five");
forecastElement.innerHTML = forecastHtml;
}

let date = document.querySelector("#date");
let currentTime = new Date();
let cityElement = document.querySelector("#name");
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let fahrenheit = document.querySelector("#fahrenheit") 
fahrenheit.addEventListener("click", fahrenheitTemperature);
let celsius = document.querySelector("#celsius") 
celsius.addEventListener("click", displayCelsiusTemperature);
search("Durban");
