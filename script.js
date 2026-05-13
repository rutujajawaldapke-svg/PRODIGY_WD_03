let taskList = document.getElementById("taskList");
let taskCount = document.getElementById("taskCount");

window.onload = function(){
  loadTasks();
};

function addTask(){

  let taskInput = document.getElementById("taskInput");

  let taskValue = taskInput.value.trim();

  if(taskValue === ""){
    alert("Please enter a task");
    return;
  }

  createTask(taskValue,false);

  saveTasks();

  taskInput.value = "";
}

function createTask(taskText,completed){

  let li = document.createElement("li");

  let span = document.createElement("span");

  span.innerText = taskText;

  span.classList.add("task-text");

  if(completed){
    span.classList.add("completed");
  }

  span.onclick = function(){
    span.classList.toggle("completed");
    saveTasks();
  };

  let deleteBtn = document.createElement("button");

  deleteBtn.innerText = "Delete";

  deleteBtn.classList.add("delete-btn");

  deleteBtn.onclick = function(){
    li.remove();
    updateTaskCount();
    saveTasks();
  };

  li.appendChild(span);

  li.appendChild(deleteBtn);

  taskList.appendChild(li);

  updateTaskCount();
}

function updateTaskCount(){

  let total = document.querySelectorAll("#taskList li").length;

  taskCount.innerText = "Total Tasks: " + total;
}

function clearAll(){

  taskList.innerHTML = "";

  updateTaskCount();

  saveTasks();
}

function saveTasks(){

  let tasks = [];

  document.querySelectorAll("#taskList li").forEach(li => {

    let text = li.querySelector("span").innerText;

    let completed = li.querySelector("span").classList.contains("completed");

    tasks.push({
      text,
      completed
    });

  });

  localStorage.setItem("tasks",JSON.stringify(tasks));
}

function loadTasks(){

  let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  savedTasks.forEach(task => {
    createTask(task.text,task.completed);
  });
}

document.getElementById("taskInput").addEventListener("keypress",function(e){

  if(e.key === "Enter"){
    addTask();
  }

});