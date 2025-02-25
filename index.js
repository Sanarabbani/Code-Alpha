document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Task cannot be empty!");
        return;
    }

    let taskList = document.getElementById("taskList");

    let li = document.createElement("li");
    li.innerHTML = `
        <span onclick="toggleComplete(this)">${taskText}</span>
        <button class="delete-btn" onclick="deleteTask(this)">X</button>
    `;

    taskList.appendChild(li);
    saveTasks();
    taskInput.value = "";
}

function toggleComplete(taskElement) {
    taskElement.classList.toggle("completed");
    saveTasks();
}

function deleteTask(buttonElement) {
    buttonElement.parentElement.remove();
    saveTasks();
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.querySelector("span").innerText,
            completed: li.querySelector("span").classList.contains("completed"),
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");

    savedTasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `
            <span onclick="toggleComplete(this)" class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(this)">X</button>
        `;
        taskList.appendChild(li);
    });
              }
