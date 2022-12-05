const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event listeners
loadEventListeners();

// Load all Event Listeners
function loadEventListeners() {
  // Add task event
  form.addEventListener("submit", addTask);
}

// Add Task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task");
  }
  // Create li element
  const li = document.createElement("li");
  // Add Class
  li.className = "collection-item";
  // Create Text Node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link elelment
  const link = document.createElement('a');
  // Add class to link
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append link to li
  li.appendChild(link);
  // Append Li to ul
  taskList.appendChild(li);
  // Clear the input
  taskInput.value = '';

  e.preventDefault();
}
