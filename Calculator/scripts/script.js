const resultInputElement = document.querySelector("[data-js-result]");
const numbersAllElements = document.querySelectorAll("[data-js-number]");
const equalButtonElement = document.querySelector("[data-js-equal]");
const clearButtonElement = document.querySelector("[data-js-clear]");
const dotButtonElement = document.querySelector("[data-js-dot]");
const deleteButtonElement = document.querySelector("[data-js-delete]");
const operatorButtonsElements = document.querySelectorAll(
  "[data-js-divide], [data-js-multiply], [data-js-add], [data-js-subtract]"
);
let lastChar = "0";
clearButtonElement.addEventListener("click", () => {
  resultInputElement.value = 0;
});
deleteButtonElement.addEventListener("click", () => {
  resultInputElement.value = resultInputElement.value.slice(0, -1);
});
numbersAllElements.forEach((button) => {
  button.addEventListener("click", (event) => {
    if (resultInputElement.value === "0") {
      resultInputElement.value = button.value;
    } else {
      resultInputElement.value += button.value;
    }
  });
});
dotButtonElement.addEventListener("click", (event) => {
  lastChar = resultInputElement.value.at(-1);
  const lastNumber = resultInputElement.value.split(/[^0-9.]+/).pop();
  if (/\d/.test(lastChar) && !lastNumber.includes(".")) {
    resultInputElement.value += dotButtonElement.value;
  }
});
dotButtonElement.addEventListener("click", () => {
  if (!resultInputElement.value.includes(".")) {
    resultInputElement.value += ".";
  }
});
operatorButtonsElements.forEach((button) => {
  button.addEventListener("click", (event) => {
    lastChar = resultInputElement.value.at(-1);
    if (/\d/.test(lastChar)) {
      resultInputElement.value += button.value;
    }
  });
});
equalButtonElement.addEventListener("click", () => {
  try {
    const result = new Function(`return ${resultInputElement.value}`)();
    resultInputElement.value = Number(result.toFixed(10));
  } catch {
    resultInputElement.value = "Ошибка вычисления";
  }
});
document.addEventListener("keydown", (event) => {
  if (/^[+\-*/]+$/.test(event.key)) {
    lastChar = resultInputElement.value.at(-1);
    if (/\d/.test(lastChar)) {
      resultInputElement.value += event.key;
    }
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "=") {
    try {
      const result = new Function(`return ${resultInputElement.value}`)();
      resultInputElement.value = Number(result.toFixed(10));
    } catch {
      resultInputElement.value = "Ошибка вычисления";
    }
  }
});
document.addEventListener("keydown", (event) => {
  if (event.code === "Period") {
    lastChar = resultInputElement.value.at(-1);
    const lastNumber = resultInputElement.value.split(/[^0-9.]+/).pop();
    if (/\d/.test(lastChar) && !lastNumber.includes(".")) {
      resultInputElement.value += dotButtonElement.value;
    }
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Backspace") {
    resultInputElement.value = resultInputElement.value.slice(0, -1);
  }
});
document.addEventListener("keydown", (event) => {
  if (/\d/.test(event.key) && resultInputElement.value === "0") {
    resultInputElement.value = event.key;
  } else if (/\d/.test(event.key)) {
    resultInputElement.value += event.key;
  }
});
