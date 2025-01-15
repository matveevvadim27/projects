function updateTime() {
  const timeAlertElement = document.querySelector("[data-js-time]");
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  timeAlertElement.textContent = `${hours}:${minutes}`;
}

export { updateTime };
