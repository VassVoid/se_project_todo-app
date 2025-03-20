class Todo {
  constructor(data, selector, handleCheck) {
    this._data = data;
    this._completed = data.completed;
    this._name = data.name;
    this._date = data.date;
    this._id = data.id;
    this._templateElement = document.querySelector(selector);
    this._selector = selector;
    this.handleCheck = handleCheck;
  }

  _setEventlisteners() {
    this._todoDeleteBtn.addEventListener("click", this._handleDelete);
    this._todoCheckboxEl.addEventListener("change", this._handleCheck);
  }

  _getTemplate() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);
    return this._todoElement;
  }

  _generateNameEl() {
    this._nameEl = this._todoElement.querySelector(".todo__name");
    this._nameEl.textContent = this._name;
  }

  _generateDueDateEl() {
    this._tododate = this._todoElement.querySelector(".todo__date");
    this._dueDate = new Date(this._date);
    if (!isNaN(this._dueDate)) {
      this._tododate.textContent = `Due: ${this._dueDate.toLocaleString(
        "en-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      )}`;
    }
  }

  _generateCheckBoxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._completed;
    this._todoCheckboxEl.id = `todo-${this._id}`;
    this._todoLabel.setAttribute("for", `todo-${this._id}`);
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
  }

  _handleDelete = () => {
    this._todoElement.remove();
  };

  _handleCheck = () => {
    this._data.completed = !this._data.completed;
  };

  getView() {
    this._todoElement = this._getTemplate();
    this._generateNameEl();
    this._generateDueDateEl();
    this._generateCheckBoxEl();
    this._setEventlisteners();
  }
}

export default Todo;
