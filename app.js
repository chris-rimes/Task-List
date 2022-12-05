const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event listeners
loadEventListeners();

// Load all Event Listeners
function loadEventListeners() {
  // Dom Load Event
  document.addEventListener("DOMContentLoaded", getTasks);
  // Add task event
  form.addEventListener("submit", addTask);
  // Remove Task Event
  taskList.addEventListener("click", removeTask);
  // Clear Task Event
  clearBtn.addEventListener("click", clearTasks);
  // filter Tasks Event
  filter.addEventListener("keyup", filterTasks);
}

// Get Tasks from LS Function
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task) {
    // Create li element
    const li = document.createElement("li");
    // Add Class
    li.className = "collection-item";
    // Create Text Node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link elelment
    const link = document.createElement("a");
    // Add class to link
    link.className = "delete-item secondary-content";
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append link to li
    li.appendChild(link);
    // Append Li to ul
    taskList.appendChild(li);
  });
}

// Add Task Fuction
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task");
  } else {
    // Create li element
    const li = document.createElement("li");
    // Add Class
    li.className = "collection-item";
    // Create Text Node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link elelment
    const link = document.createElement("a");
    // Add class to link
    link.className = "delete-item secondary-content";
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append link to li
    li.appendChild(link);
    // Append Li to ul
    taskList.appendChild(li);

    // Store in LS
    storeTaskInLocalStorage(taskInput.value);

    // Clear the input
    taskInput.value = "";

    e.preventDefault();
  }
}

// Store Task I Local Storage Function
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove Task Function
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are You Sure?")) {
      e.target.parentElement.parentElement.remove();

      // Romove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove task from local storage function
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear Tasks Function
function clearTasks() {
  // taskList.innerHTML = '';

  // Faster method to remove list
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  //Clear From LS
  clearTasksFromLocalStorage();
}

//---------------------Function Declartions---------------------

// Clear Tasks for Local Storage Function
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter Tasks Function
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
