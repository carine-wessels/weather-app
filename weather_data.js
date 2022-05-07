let displayDate = document.querySelector("#date");
let displayTime = document.querySelector("#time");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
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
let now = new Date();
let day = now.getDay();
let date = now.getDate();
let month = now.getMonth();
let year = now.getFullYear();
let hours = now.getHours();
let minutes = now.getMinutes();
displayDate.innerHTML = `${days[day]} ${date} ${months[month]} ${year}`;

displayTime.innerHTML = `${("0" + hours).slice(-2)}:${("0" + minutes).slice(
  -2
)}`;

function displayWeather(response) {
  let currentTemperature = Math.round(response.data.main.temp);
  let showCurrentTemperature = document.querySelector(".temperature");
  showCurrentTemperature.innerHTML = `${currentTemperature}°C`;

  let cityFromAPI = response.data.name;
  let city = document.querySelector("#city");
  city.innerHTML = `${cityFromAPI}`;

  let maxTemperature = Math.round(response.data.main.temp_max);
  let showMaxTemperature = document.querySelector(".max_temp");
  showMaxTemperature.innerHTML = `Max: ${maxTemperature}°C`;

  let minTemperature = Math.round(response.data.main.temp_min);
  let showMinTemperature = document.querySelector(".min_temp");
  showMinTemperature.innerHTML = `Min: ${minTemperature}°C`;

  let humidity = response.data.main.humidity;
  let showHumidity = document.querySelector(".humidity");
  showHumidity.innerHTML = `Humidity: ${humidity}%`;
}
function searchCity(cityEntered) {
  let apiKey = "f43b370b9f9bd95462a32093dfe74272";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityEntered}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayWeather);
}
function showCity(event) {
  event.preventDefault();

  let cityEntered = document.querySelector("#city-type").value;
  let displayCity = document.querySelector("#city");
  displayCity.innerHTML = document.querySelector("#city-type").value;
  searchCity(cityEntered);
}
let cityInput = document.querySelector("#city-input");
cityInput.addEventListener("submit", showCity);

function searchLocation(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let units = "metric";
  let apiKey = "f43b370b9f9bd95462a32093dfe74272";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}
function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentLocationButton = document.querySelector(".location-button");
currentLocationButton.addEventListener("click", currentLocation);
