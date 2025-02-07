class Time {
  selectors = {
    root: "[data-js-weather]",
    timeAlertElement: "[data-js-time]",
  };

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root);
    this.timeAlertElement = this.rootElement.querySelector(
      this.selectors.timeAlertElement
    );

    this.startTime();
  }

  startTime() {
    this.updateTime();

    this.timerId = setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  updateTime() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    this.timeAlertElement.textContent = `${hours}:${minutes}`;
  }
}

export default Time;
