class Location {
  selectors = {
    rootElement: "[data-js-weather]",
    localButtonElement: "[data-js-local]",
    inputElement: "[data-js-input]",
  };

  constructor() {
    this.rootElement = document.querySelector(this.selectors.rootElement);
    this.localButtonElement = this.rootElement.querySelector(
      this.selectors.localButtonElement
    );
    this.inputElement = this.rootElement.querySelector(
      this.selectors.inputElement
    );
    this.apiURL = "https://ipapi.co/json/";
    this.getData();
    this.bindEvents();
  }

  getData() {
    return fetch(this.apiURL)
      .then((response) => response.json())
      .then((data) => {
        const { city } = data;
        this.localButtonElement.textContent = city;
      })
      .catch((error) => console.error("Error receiving data:", error));
  }

  onlocalButtonClick() {
    this.inputElement.value = this.localButtonElement.textContent;
  }
  bindEvents() {
    this.localButtonElement.addEventListener(
      "click",
      this.onlocalButtonClick.bind(this)
    );
  }
}

export default Location;
