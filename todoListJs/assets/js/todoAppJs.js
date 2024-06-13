let todoForm = document.querySelector('.todoForm');
let todos = document.querySelector('.todos');
let clear = document.querySelector('.clear');
let todoCount = document.querySelector('.todoCount');
let todosList = [];
let todoCounter = 0;

if (typeof localStorage.todosList !== 'undefined') {
  todosList = JSON.parse(localStorage.todosList);
  renderList();
}

function handleFormSubmit(e) {
  e.preventDefault();
  let formData = new FormData(todoForm);
  let formObj = Object.fromEntries(formData);
  todosList.push(formObj);
  todoForm.reset();
  todoCounter++;
  todoCount.innerText = todoCounter;
  renderList(); 
  save();
}

todoForm.addEventListener('submit', handleFormSubmit);

function renderList() {
  todos.innerHTML = '';
  for (let i = 0; i < todosList.length; i++) {
    todos.innerHTML +=
      `<div class="todos-list">
          <ul><li><p>${todosList[i].todo}</p></li></ul>
       </div>`
  }
};

function save () {
  localStorage.todosList = JSON.stringify(todosList);
}

function clearList() {
  localStorage.clear();
  todosList = [];
  renderList();
}

clear.addEventListener('click', clearList);