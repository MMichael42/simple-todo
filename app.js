console.log('hello from app.js');

// define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('#clearBtn');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event listeners
loadEventListeners();


function loadEventListeners() {
  // DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);

  // add task event
  form.addEventListener('submit', addTask);
  
  // remove task event
  taskList.addEventListener('click', removeTask);

  // clear tasks event
  clearBtn.addEventListener('click', clearTasks);
}

// get tasks fro localStorage
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  // if there's two or more tasks on initial load of tasks, show the clear tasks button
  if (tasks.length >= 2) {
    clearBtn.style.display = 'block';
  }

  tasks.forEach( task => {
    // create li element
    const li = document.createElement('li');
    // add class
    li.className = 'collection-item';
    // create text node and append to the li
    li.appendChild(document.createTextNode(task));
    
    // create new link element
    const link = document.createElement('a');
    // add class
    link.className = 'delete-item';
    // add icon html
    link.innerHTML = '<i class="fa fa-times"></i>';
    
    // append link to the li
    li.appendChild(link);
    // append li to the ul
    taskList.appendChild(li);
  });
}

function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a task');
    return;
  }

  // create li elememnt
  const li = document.createElement('li');
  // add class
  li.className = 'collection-item';
  // create text node and append to the li
  li.appendChild(document.createTextNode(taskInput.value));
  // create new link element
  const link = document.createElement('a');
  //add class
  link.className = 'delete-item secondary-content';
  // add icon html
  link.innerHTML = '<i class="fa fa-times"></i>';
  // append link to the li
  li.appendChild(link);

  // append li to the ul
  taskList.appendChild(li);
  
  // store in localStorage
  storeTaskInLocalStorage(taskInput.value);

  // clear input
  taskInput.value = '';

  e.preventDefault();
}

function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);

  // if there's 2 or more tasks, show the clear tasks button
  if (tasks.length >= 2) {
    clearBtn.style.display = 'block';
  }

  localStorage.setItem('tasks', JSON.stringify(tasks));
  
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    e.target.parentElement.parentElement.remove();

    // remove from localStorage
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  }
}

function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach( (task, index) => {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  // if there's one or less tasks, remove the clear button from view
  if (tasks.length <= 1) {
    clearBtn.style.display = 'none';
  }

  localStorage.setItem('tasks', JSON.stringify(tasks));

}

function clearTasks(e) {
  // taskList.innerHTML = '';

  // or faster implementation
  if (confirm('really clear your todo list?')) {
    while(taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
    // clear from localStorage
    clearTasksFromLocalStorage();

    clearBtn.style.display = 'none';
  }
  

}

function clearTasksFromLocalStorage() {
  localStorage.clear();
}