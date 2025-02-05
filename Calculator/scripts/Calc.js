class Calc {
  selectors = {
    root: "[data-js-root]",
    resultElement: "[data-js-result]",
    numbersButtons: "[data-js-number]",
    equalButton: "[data-js-equal]",
    clearButton: "[data-js-clear]",
    dotButton: "[data-js-dot]",
    deleteButton: "[data-js-delete]",
    operatorsButton: "[data-js-operator]",
  };

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root);
    this.resultElement = this.rootElement.querySelector(
      this.selectors.resultElement
    );
    this.numbersButtonElement = this.rootElement.querySelectorAll(
      this.selectors.numbersButtons
    );
    this.equalButtonElement = this.rootElement.querySelector(
      this.selectors.equalButton
    );
    this.clearButtonElement = this.rootElement.querySelector(
      this.selectors.clearButton
    );
    this.dotButtonElement = this.rootElement.querySelector(
      this.selectors.dotButton
    );
    this.deleteButtonElement = this.rootElement.querySelector(
      this.selectors.deleteButton
    );
    this.operatorsButtonsElements = this.rootElement.querySelectorAll(
      this.selectors.operatorsButton
    );

    this.lastChar = "0";
    this.lastNumber = "";
    this.button = "";
    this.result = "";

    this.bindEvents();
  }

  evaluateExpression() {
    try {
      return new Function(`return ${this.resultElement.value}`)();
    } catch {
      return "Error";
    }
  }

  onClearClick() {
    this.resultElement.value = "0";
  }

  onDeleteButtonClick() {
    this.resultElement.value = this.resultElement.value.slice(0, -1);
  }

  onNumberButtonsClick(event) {
    this.button = event.target;
    if (this.resultElement.value === "0") {
      this.resultElement.value = this.button.value;
    } else if (this.resultElement.value === "Error") {
      return;
    } else {
      this.resultElement.value += this.button.value;
    }
  }

  onDotButtonsClick() {
    this.lastChar = this.resultElement.value.at(-1) || "";
    this.lastNumber = this.resultElement.value.split(/[^0-9.]+/).pop() || "";

    if (
      /\d/.test(this.lastChar) &&
      this.lastNumber &&
      !this.lastNumber.includes(".")
    ) {
      this.resultElement.value += this.dotButtonElement.value;
    }
  }

  onOperatorClick(event) {
    this.button = event.target;
    if (this.button instanceof HTMLButtonElement) {
      this.lastChar = this.resultElement.value.at(-1);
      if (/\d/.test(this.lastChar)) {
        this.resultElement.value += this.button.value;
      }
    }
  }

  onEqualButtonClick() {
    try {
      this.result = this.evaluateExpression();
      this.resultElement.value = Number(this.result.toFixed(10));
    } catch {
      this.resultElement.value = "Error";
    }
  }

  onKeyDown(event) {
    if (/^[+\-*/]+$/.test(event.key)) {
      this.lastChar = this.resultElement.value.at(-1);
      if (/\d/.test(this.lastChar)) {
        this.resultElement.value += event.key;
      }
    } else if (event.key === "=" || event.key === "Enter") {
      this.onEqualButtonClick();
    } else if (event.code === "Period") {
      this.lastChar = this.resultElement.value.at(-1);
      this.lastNumber = this.resultElement.value.split(/[^0-9.]+/).pop() || "";
      if (/\d/.test(this.lastChar) && !this.lastNumber.includes(".")) {
        this.resultElement.value += ".";
      }
    } else if (event.key === "Backspace") {
      this.onDeleteButtonClick();
    } else if (/\d/.test(event.key)) {
      if (this.resultElement.value === "0") {
        this.resultElement.value = event.key;
      } else {
        this.resultElement.value += event.key;
      }
    }
  }

  bindEvents() {
    this.clearButtonElement.addEventListener(
      "click",
      this.onClearClick.bind(this)
    );
    this.deleteButtonElement.addEventListener(
      "click",
      this.onDeleteButtonClick.bind(this)
    );
    this.numbersButtonElement.forEach((button) => {
      button.addEventListener("click", this.onNumberButtonsClick.bind(this));
    });
    this.dotButtonElement.addEventListener(
      "click",
      this.onDotButtonsClick.bind(this)
    );
    this.operatorsButtonsElements.forEach((button) => {
      button.addEventListener("click", this.onOperatorClick.bind(this));
    });
    this.equalButtonElement.addEventListener(
      "click",
      this.onEqualButtonClick.bind(this)
    );
    document.addEventListener("keydown", this.onKeyDown.bind(this));
  }
}

export default Calc;
