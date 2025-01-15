import { updateTime } from "./time.js";
import { localCityElement, inputCityElement, getWeather } from "./search.js";

updateTime();
setInterval(updateTime, 1000);

const searchButtonElement = document.querySelector("[data-js-search]");

searchButtonElement.addEventListener("click", (event) => {
  event.preventDefault();
  getWeather();
});
