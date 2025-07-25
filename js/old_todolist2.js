// document.addEventListener("DOMContentLoaded", () => {
//   const todoSection = document.querySelector(".todo__section");
//   const todoInput = todoSection.querySelector(".todo__input-text");
//   const addBtn = todoSection.querySelector(".todo__add-btn");
//   const todoList = todoSection.querySelector(".todo__list");

//   const createTask = (task) => {
//     return `<li class="todo__item">
//           <div class="todo__list-check">
//             <label class="todo__item-label">
//               <input class="todo__checkbox" type="checkbox" />
//               <span class="todo__checkbox-custom"></span>
//             </label>
//             <span class="todo__content">${task}</span>
//           </div>
//           <button class="todo__btn-delete">X</button>
//         </li>`;
//   };

//   addBtn.addEventListener("click", () => {
//     const task = todoInput.value.trim();
//     if (todoInput.value.trim() !== "") {
//       todoList.insertAdjacentHTML("afterbegin", createTask(task));
//       todoInput.value = "";
//       todoInput.focus();
//     } else {
//       todoInput.value = "";
//       todoInput.focus();
//     }
//   });

//   todoList.addEventListener("click", (e) => {
//     if (e.target.matches("button")) {
//       e.target.parentElement.remove();
//     }
//   });

//   todoList.addEventListener("change", (e) => {
//     if (e.target.matches(".todo__checkbox")) {
//       const li = e.target.closest(".todo__item");
//       console.log(li);

//       const text = li.querySelector(".todo__content");
//       console.log(text);

//       text.classList.toggle("todo__item--done");
//     }
//   });

//   document.addEventListener("keyup", (e) => {
//     if (e.key === "Enter") {
//       const task = todoInput.value.trim();
//       if (todoInput.value.trim() !== "") {
//         todoList.insertAdjacentHTML("afterbegin", createTask(task));
//         todoInput.value = "";
//         todoInput.focus();
//       } else {
//         todoInput.value = "";
//         todoInput.focus();
//       }
//     }
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  const todoSection = document.querySelector(".todo__section");
  const todoInput = todoSection.querySelector(".todo__input-text");
  const addBtn = todoSection.querySelector(".todo__add-btn");
  const todoList = todoSection.querySelector(".todo__list");

  let todos = [
    {
      id: Date.now() + 1,
      content: "Breakfast",
      completed: false,
      editing: false,
    },
    { id: Date.now() + 2, content: "Lunch", completed: false, editing: false },
    { id: Date.now() + 3, content: "Dinner", completed: false, editing: false },
    {
      id: Date.now() + 4,
      content: "Dessert",
      completed: false,
      editing: false,
    },
  ];

  function renderTodos() {
    todoList.innerHTML = "";

    todos.forEach((todo) => {
      const li = document.createElement("li");
      li.className = "todo__item";
      li.dataset.id = todo.id;
      li.innerHTML = `<div class="todo__list-check">
            <label class="todo__item-label">
              <input class="todo__checkbox" type="checkbox" id="todo-${
                todo.id
              }" ${todo.completed ? "checked" : ""} />
              <span class="todo__checkbox-custom"></span>
            </label>
            ${
              todo.editing
                ? `<input class="todo__content--update" type="text" value="${todo.content}"/>`
                : `<span class="todo__content${
                    todo.completed ? " todo__item--done" : ""
                  }">${todo.content}</span>`
            }

        </div>
        <button class="todo__btn-delete">X</button>`;
      todoList.append(li);
    });
  }
  renderTodos();

  function createNewTodo() {
    const inputValue = todoInput.value.trim();
    if (inputValue !== "") {
      const newTodo = {
        id: Date.now(),
        content: inputValue,
        completed: false,
      };
      todos.unshift(newTodo);
      renderTodos();
      resetInput();
    } else {
      resetInput();
    }
  }

  function resetInput() {
    todoInput.value = "";
    todoInput.focus();
  }

  function updateEditing(el) {
    const li = el.closest("li");
    const id = Number(li.dataset.id);

    todos = todos.map((todo) => {
      if (todo.id === id) {
        todo.editing = !todo.editing;
        return todo;
      } else {
        return todo;
      }
    });
  }

  addBtn.addEventListener("click", () => {
    createNewTodo();
  });

  document.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      createNewTodo();
    }
  });

  todoList.addEventListener("click", (e) => {
    if (e.target.matches("Button")) {
      const li = e.target.closest("li");
      const id = Number(li.dataset.id);

      todos = todos.filter((todo) => {
        return todo.id !== id;
      });

      renderTodos();
    }

    if (e.target.matches(".todo__content")) {
      updateEditing(e.target);
      renderTodos();
    }
  });

  todoList.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      const li = e.target.closest("li");
      const id = Number(li.dataset.id);
      const newTextContent = todos.map((todo) => {
        if (todo.id === id) {
          todo.editing = !todo.editing;
          return todo;
        } else {
          return todo;
        }
      });
      renderTodos();
    }
  });

  todoList.addEventListener("blur", (e) => {
    if (e.key === "Enter") {
      const li = e.target.closest("li");
      const id = Number(li.dataset.id);

      todos.map((todo) => {
        if (todo.id === id) {
          todo.editing = !todo.editing;
          return todo;
        } else {
          return todo;
        }
      });
      renderTodos();
    }
  });

  todoList.addEventListener("change", (e) => {
    if (e.target.matches(".todo__checkbox")) {
      const li = e.target.closest("li");
      const id = Number(li.dataset.id);

      todos = todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
          return todo;
        } else {
          return todo;
        }
      });
      renderTodos();
    }
  });
});
