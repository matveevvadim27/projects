const timeAlertElement = document.querySelector("[data-js-time]");

function updateTime() {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0"); // Добавляем ведущий ноль
  const minutes = String(date.getMinutes()).padStart(2, "0"); // Добавляем ведущий ноль

  timeAlertElement.textContent = `${hours}:${minutes}`; // Выводим время
}

updateTime();

setInterval(updateTime, 1000);

const localCityElement = document.querySelector("[data-js-local]");
const inputCityElement = document.querySelector("[data-js-input]");

localCityElement.addEventListener("click", (event) => {
  inputCityElement.value = localCityElement.textContent.replace(/\s+/g, "");
});
