const timeSelect = document.getElementById('timeSelect');
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const timeMap = {
  "01 AM": 1,
  "02 AM": 2,
  "03 AM": 3,
  "04 AM": 4,
  "05 AM": 5,
  "06 AM": 6,
  "07 AM": 7,
  "08 AM": 8,
  "09 AM": 9,
  "10 AM": 10,
  "11 AM": 11,
  "12 PM": 12,
  "01 PM": 13,
  "02 PM": 14,
  "03 PM": 15,
  "04 PM": 16,
  "05 PM": 17,
  "06 PM": 18,
  "07 PM": 19,
  "08 PM": 20,
  "09 PM": 21,
  "10 PM": 22,
  "11 PM": 23,
  "12 AM": 0
};

function renderTasks() {
  taskList.innerHTML = '';
  tasks.sort((a, b) => timeMap[a.time] - timeMap[b.time]);

  tasks.forEach((taskObj, index) => {
    const li = document.createElement('li');
    if (taskObj.completed) li.classList.add('completed');

    const taskText = document.createElement('span');
    taskText.textContent = `${taskObj.time} - ${taskObj.task}`;

    // Done Button
    const doneBtn = document.createElement('button');
    doneBtn.textContent = taskObj.completed ? "Undo" : "Done";
    doneBtn.className = 'done-btn';
    doneBtn.onclick = () => {
      tasks[index].completed = !tasks[index].completed;
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
    };

    // Delete Button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    deleteBtn.className = 'done-btn';
    deleteBtn.style.background = '#ef4444'; // Red
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
    };

    li.appendChild(taskText);
    li.appendChild(doneBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

addBtn.onclick = () => {
  const time = timeSelect.value;
  const task = taskInput.value.trim();
  if (!time || !task) {
    alert("Please select a time and enter a task.");
    return;
  }

  tasks.push({ time, task, completed: false });
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
  taskInput.value = '';
  timeSelect.value = '';
};

taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addBtn.click();
  }
});

window.onload = renderTasks;