function formattedTime(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];
  return `${days[dayIndex]} ${hours}:${minutes}`;
}
function weatherCondition(response) {
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
    response.data.weather[0].main;
  console.log(response);
}

function search(event) {
  event.preventDefault();
  let apiKey = "842b36d55cb28eba74a018029d56b04c";
  let city = document.querySelector("#query").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherCondition);
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
let cityElement = document.querySelector("#name");
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);
dateElement.innerHTML = formattedTime(currentTime);
