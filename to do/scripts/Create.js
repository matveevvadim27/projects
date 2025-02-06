class Create {
  selectors = {
    root: "[data-js-todo]",
    todoListElement: "[data-js-todo-list]",
    doneListElement: "[data-js-done-list]",
    todoInputElement: "[data-js-todo-input]",
    createButtonElement: "[data-js-create-button]",
    todayButtonElement: "[data-js-today]",
    plannedButtonElement: "[data-js-planned]",
    doneButtonElement: "[data-js-done]",
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
    this.doneListElement = this.rootElement.querySelector(
      this.selectors.doneListElement
    );
    this.todayButtonElement = document.querySelector(
      this.selectors.todayButtonElement
    );
    this.plannedButtonElement = document.querySelector(
      this.selectors.plannedButtonElement
    );
    this.doneButtonElement = document.querySelector(
      this.selectors.doneButtonElement
    );

    this.tasks = this.loadTasksFromLocalStorage();
    this.renderTasks(); //

    this.onCreateButtonClick();
    this.addCheckboxEventListener();
    this.deleteTask();
    this.switcherTask();
  }

  loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    return tasks ? tasks : [];
  }

  saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  renderTasks() {
    this.todoListElement.innerHTML = "";
    this.doneListElement.innerHTML = "";

    this.tasks.forEach((task) => {
      const itemElement = document.createElement("li");
      itemElement.classList.add("todo__item");
      itemElement.setAttribute("draggable", "true");
      if (task.isDone) itemElement.classList.add(this.stateClasses.isDone);

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.classList.add("todo__item-checkbox");
      checkbox.checked = task.isDone;

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("todo__item-delete");
      deleteButton.textContent = "x";

      const taskText = document.createElement("span");
      taskText.textContent = task.text;

      itemElement.append(checkbox, taskText, deleteButton);

      if (task.isDone) {
        this.doneListElement.appendChild(itemElement);
      } else {
        this.todoListElement.appendChild(itemElement);
      }
    });
  }

  onCreateButtonClick() {
    this.createButtonElement.addEventListener("click", () => {
      const inputValue = this.todoInputElement.value.trim();
      if (inputValue === "") {
        alert("Please enter a task!");
        return;
      }

      const task = {
        text: inputValue,
        isDone: false,
      };

      this.tasks.push(task);
      this.saveTasksToLocalStorage();

      this.renderTasks();

      this.todoInputElement.value = "";
    });
    document.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        const inputValue = this.todoInputElement.value.trim();
        if (inputValue === "") {
          alert("Please enter a task!");
          return;
        }

        const task = {
          text: inputValue,
          isDone: false,
        };

        this.tasks.push(task);
        this.saveTasksToLocalStorage();

        this.renderTasks();

        this.todoInputElement.value = "";
      }
    });
  }

  addCheckboxEventListener() {
    this.todoListElement.addEventListener("change", (event) => {
      if (
        event.target &&
        event.target.classList.contains("todo__item-checkbox")
      ) {
        const itemElement = event.target.closest(".todo__item");
        const index = [...this.todoListElement.children].indexOf(itemElement);

        this.tasks[index].isDone = event.target.checked;

        if (event.target.checked) {
          this.doneListElement.appendChild(itemElement);
        } else {
          this.todoListElement.appendChild(itemElement);
        }

        itemElement.classList.toggle(
          this.stateClasses.isDone,
          event.target.checked
        );

        this.saveTasksToLocalStorage();
      }
    });

    this.doneListElement.addEventListener("change", (event) => {
      if (
        event.target &&
        event.target.classList.contains("todo__item-checkbox")
      ) {
        const itemElement = event.target.closest(".todo__item");
        const index = [...this.doneListElement.children].indexOf(itemElement);

        this.tasks[index].isDone = event.target.checked;

        if (event.target.checked) {
          this.doneListElement.appendChild(itemElement);
        } else {
          this.todoListElement.appendChild(itemElement);
        }

        itemElement.classList.toggle(
          this.stateClasses.isDone,
          event.target.checked
        );

        this.saveTasksToLocalStorage();
      }
    });
  }

  deleteTask() {
    this.todoListElement.addEventListener("click", (event) => {
      if (
        event.target &&
        event.target.classList.contains("todo__item-delete")
      ) {
        const itemElement = event.target.closest(".todo__item");
        const index = [...this.todoListElement.children].indexOf(itemElement);

        this.tasks.splice(index, 1);
        this.saveTasksToLocalStorage();

        itemElement.remove();
      }
    });

    this.doneListElement.addEventListener("click", (event) => {
      if (
        event.target &&
        event.target.classList.contains("todo__item-delete")
      ) {
        const itemElement = event.target.closest(".todo__item");
        const index = [...this.doneListElement.children].indexOf(itemElement);

        this.tasks.splice(index, 1);
        this.saveTasksToLocalStorage();

        itemElement.remove();
      }
    });
  }

  switcherTask() {
    this.plannedButtonElement.addEventListener("click", () => {
      this.doneListElement.classList.add("visually-hidden");
      this.todoListElement.classList.remove("visually-hidden");
    });
    this.doneButtonElement.addEventListener("click", () => {
      this.doneListElement.classList.remove("visually-hidden");
      this.todoListElement.classList.add("visually-hidden");
    });
    this.todayButtonElement.addEventListener("click", () => {
      this.doneListElement.classList.remove("visually-hidden");
      this.todoListElement.classList.remove("visually-hidden");
    });
  }
}

export default Create;
