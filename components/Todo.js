class Todo {
  constructor(data, selector, handleCheck, handleDelete) {
    this._data = data;
    this._completed = data.completed;
    this._name = data.name;
    this._date = data.date;
    this._id = data.id;
    this._templateElement = document.querySelector(selector);
    this._selector = selector;
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;
  }

  _setEventlisteners() {
    this._todoDeleteBtn.addEventListener("click", () => {
      this._handleDelete(this._completed);
      this._remove();
    });
    this._todoCheckboxEl.addEventListener("change", () => {
      this._toggleCompletion();
      this._handleCheck(this._completed);
    });
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

  _remove = () => {
    this._todoElement.remove();
  };

  _toggleCompletion = () => {
    this._completed = !this._completed;
  };

  getView() {
    this._todoElement = this._getTemplate();
    this._generateNameEl();
    this._generateDueDateEl();
    this._generateCheckBoxEl();
    this._setEventlisteners();
    return this._todoElement;
  }
}

export default Todo;
