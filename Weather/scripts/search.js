import { API_KEY } from "./config.js";

class Search {
  constructor() {
    this.apiKey = API_KEY;

    this.selectors = {
      localCity: "[data-js-local]",
      inputCity: "[data-js-input]",
      searchButton: "[data-js-search]",
      city: "[data-js-city]",
      temp: "[data-js-temp]",
      feels: "[data-js-feels]",
      humidity: "[data-js-humidity]",
      main: "[data-js-main]",
      resultSection: "[data-js-result-section]",
      card: "[data-js-card]",
    };

    this.stateClasses = {
      isVisiable: "visually-hidden",
      color: "#ece5a585",
    };

    this.initElements();
    this.bindEvents();
  }

  initElements() {
    this.localCityElement = document.querySelector(this.selectors.localCity);
    this.inputCityElement = document.querySelector(this.selectors.inputCity);
    this.searchButtonElement = document.querySelector(
      this.selectors.searchButton
    );
    this.cityElement = document.querySelector(this.selectors.city);
    this.tempElement = document.querySelector(this.selectors.temp);
    this.feelsElement = document.querySelector(this.selectors.feels);
    this.humidityElement = document.querySelector(this.selectors.humidity);
    this.mainElement = document.querySelector(this.selectors.main);
    this.cardElement = document.querySelector(this.selectors.card);
    this.resultSectionElement = document.querySelector(
      this.selectors.resultSection
    );
  }
  bindEvents() {
    this.searchButtonElement.addEventListener("click", (event) => {
      event.preventDefault();
      this.getWeather();
    });
  }

  getWeather() {
    const city = this.inputCityElement.value.trim();
    if (!city) return;

    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${this.apiKey}`;

    fetch(geoUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error getting coordinates");
        }
        return response.json();
      })
      .then((geoData) => {
        if (geoData.length === 0) {
          throw new Error("City not found");
        }
        const { lat, lon } = geoData[0];
        return this.fetchWeather(lat, lon, city);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(error);
      });
  }

  fetchWeather(lat, lon, city) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;

    fetch(weatherUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error while receiving weather data");
        }
        return response.json();
      })
      .then((weatherData) => {
        this.updateUI(weatherData, city);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(error);
      });
  }

  updateUI(weatherData, city) {
    const { main } = weatherData.weather[0];
    const { temp, humidity, feels_like } = weatherData.main;

    this.cityElement.textContent = city;
    this.tempElement.textContent = `Temperature is ${Math.round(temp)}`;
    this.feelsElement.textContent = `Feels like ${Math.round(feels_like)}`;
    this.humidityElement.textContent = `Humidity is ${humidity}`;
    this.mainElement.textContent = `Mostly is ${main}`;

    this.cardElement.style.backgroundColor = this.stateClasses.color;
  }
}

export default Search;
