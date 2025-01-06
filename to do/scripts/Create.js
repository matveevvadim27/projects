class Create {
  selectors = {
    root: "[data-js-todo]",
    todoListElement: "[data-js-todo-list]",
    todoInputElement: "[data-js-todo-input]",
    createButtonElement: "[data-js-create-button]",
  };

  stateClasses = {
    isDone: "done",
  };

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root);
    this.todoListElement = this.rootElement.querySelector(
      this.selectors.todoListElement
    );
    this.todoInputElement = this.rootElement.querySelector(
      this.selectors.todoInputElement
    );
    this.createButtonElement = this.rootElement.querySelector(
      this.selectors.createButtonElement
    );

    this.onCreateButtonClick();
    this.addCheckboxEventListener();
  }

  // Метод для добавления новой задачи
  onCreateButtonClick() {
    this.createButtonElement.addEventListener("click", () => {
      const inputValue = this.todoInputElement.value.trim();
      if (inputValue === "") {
        alert("Please enter a task!");
        return;
      }

      const itemElement = document.createElement("li");
      itemElement.classList.add("todo__item");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.classList.add("todo__item-checkbox");

      const taskText = document.createElement("span");
      taskText.textContent = inputValue;

      itemElement.append(checkbox, taskText);

      this.todoListElement.prepend(itemElement);

      this.todoInputElement.value = "";
    });
  }

  addCheckboxEventListener() {
    this.todoListElement.addEventListener("change", (event) => {
      if (
        event.target &&
        event.target.classList.contains("todo__item-checkbox")
      ) {
        const itemElement = event.target.closest(".todo__item");

        itemElement.classList.toggle(
          this.stateClasses.isDone,
          event.target.checked
        );

        if (itemElement.classList.contains(this.stateClasses.isDone)) {
          this.todoListElement.appendChild(itemElement); // Перемещаем в конец
        } else {
          this.todoListElement.prepend(itemElement); // Перемещаем в начало
        }
      }
    });
  }
}

export default Create;
