class DND {
  selector = {
    root: "[data-js-todo-list]",
  };

  stateClasses = {
    isDragging: "dragging",
    isMove: "move",
  };

  constructor() {
    this.listElement = document.querySelector(this.selector.root);
    this.draggedItem = null;
    this.hoveringItem;
    this.bounding;
    this.offset;

    this.bindEvents();
  }

  dragStart(event) {
    this.draggedItem = event.target.closest("li");
    event.target.classList.add(this.stateClasses.isDragging);
    event.dataTransfer.effectAllowed = this.stateClasses.isMove;
  }

  dragEnd() {
    event.target.classList.remove(this.stateClasses.isDragging);
    this.draggedItem = null;
  }

  dragOver(event) {
    event.preventDefault();
    this.hoveringItem = event.target.closest("li");
    if (this.hoveringItem && this.hoveringItem !== this.draggedItem) {
      this.bounding = this.hoveringItem.getBoundingClientRect();
      this.offset = event.clientY - this.bounding.top;
      if (this.offset > this.bounding.height / 2) {
        this.hoveringItem.after(this.draggedItem);
      } else {
        this.hoveringItem.before(this.draggedItem);
      }
    }
  }
  domContentLoaded() {
    this.listElement.addEventListener("dragstart", this.dragStart.bind(this));
    this.listElement.addEventListener("dragend", this.dragEnd.bind(this));
    this.listElement.addEventListener("dragover", this.dragOver.bind(this));
  }

  bindEvents() {
    document.addEventListener(
      "DOMContentLoaded",
      this.domContentLoaded.bind(this)
    );
  }
}

export default DND;
