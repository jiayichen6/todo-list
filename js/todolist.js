document.addEventListener("DOMContentLoaded", () => {
  const inputText = document.querySelector(".todo__input-text");
  const inputBtn = document.querySelector(".todo__input-btn");
  const todoList = document.querySelector(".todo__list");
  //const deleteBtn = document.querySelectorAll(".todo__item-delete");

  function createTodoItem(task) {
    return `<li class="todo__item">
    <label class="todo__item-label">
      <input type="checkbox" class="todo__checkbox" />
      <span class="todo__checkbox-custom"></span>
      <span class="todo__text">${task}</span>
    </label>
    <button class="todo__item-delete">X</button>
  </li>`;
  }

  inputBtn.addEventListener("click", () => {
    const task = inputText.value.trim();
    if (task !== "") {
      todoList.insertAdjacentHTML("afterbegin", createTodoItem(task));
      inputText.value = "";
      inputText.focus();
    } else {
      inputText.value = "";
      inputText.focus();
    }
  });

  todoList.addEventListener("click", (e) => {
    if (e.target.classList.contains("todo__item-delete")) {
      const li = e.target.parentElement;
      li.remove();
    }
  });

  todoList.addEventListener("change", (e) => {
    if (e.target.matches(".todo__checkbox")) {
      const li = e.target.closest(".todo__item");
      const text = li.querySelector(".todo__text");

      text.classList.toggle("todo__text--done");

      if (e.target.checked) {
        todoList.appendChild(li);
      }
    }
  });

  inputText.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      const task = inputText.value.trim();
      if (task !== "") {
        todoList.insertAdjacentHTML("afterbegin", createTodoItem(task));
        inputText.value = "";
        inputText.focus();
      } else {
        inputText.value = "";
        inputText.focus();
      }
    }
  });
});
