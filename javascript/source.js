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
  console.log(response.data);
  let nameCity = document.querySelector("#name");
  nameCity.innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humid").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  date.innerHTML = formatDate(response.data.dt * 1000);
let iconElement = document.querySelector("#icon");
iconElement.setAttribute("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
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
search("Durban");

let date = document.querySelector("#date");
let currentTime = new Date();
let cityElement = document.querySelector("#name");
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);
