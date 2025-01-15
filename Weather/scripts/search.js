const localCityElement = document.querySelector("[data-js-local]");
const inputCityElement = document.querySelector("[data-js-input]");
const getCityElement = document.querySelector("[data-js-city]");
const getTempElement = document.querySelector("[data-js-temp]");
const getFeelsElement = document.querySelector("[data-js-feels]");
const getHumidityElement = document.querySelector("[data-js-humidity]");
const getMainElement = document.querySelector("[data-js-main]");

function getWeather() {
  const city = inputCityElement.value;
  const apiKey = "6ac0ea7b1f33321dd83f907abe5820df";
  const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;

  fetch(geoUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка при получении координат");
      }
      return response.json();
    })
    .then((geoData) => {
      if (geoData.length === 0) {
        throw new Error("Город не найден");
      }
      const { lat, lon } = geoData[0];

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      return fetch(weatherUrl);
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка при получении данных погоды");
      }
      return response.json();
    })
    .then((weatherData) => {
      const { main } = weatherData.weather[0];
      const { temp, humidity, feels_like } = weatherData.main;

      getCityElement.textContent = city;
      getTempElement.textContent = `Temperature is ${Math.round(+temp)}`;
      getFeelsElement.textContent = `Feels like ${Math.round(+feels_like)}`;
      getHumidityElement.textContent = "Humidity is " + humidity;
      getMainElement.textContent = "Mostly is " + main;
    })
    .catch((error) => console.error("Ошибка:", error));
}

export { localCityElement, inputCityElement, getWeather };
