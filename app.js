// variables

const addTask = document.getElementById("add-task");

const taskContainer = document.getElementById("task-container");

const inputTask = document.getElementById("input-task");

var savedTask = JSON.parse(localStorage.getItem("data")) || [];

addTask.addEventListener("click", function (e) {
  e.preventDefault();
  if (inputTask.value === "") {
    alert("Please enter Task");
  } else {
    let itemToSave = {
      id: Math.floor(Math.random() * 10000000),
      task: inputTask.value,
      done: false,
    };
    savedTask.push(itemToSave);
    localStorage.setItem("data", JSON.stringify(savedTask));
    updateTasks();
  }
});

function updateTasks() {
  savedTask = JSON.parse(localStorage.getItem("data")) || [];
  // console.log(savedTask);
  taskContainer.innerHTML = "";
  savedTask.forEach((el) => {
    let task = document.createElement("div");
    task.setAttribute("id", el.id);
    task.classList.add("task");
    let li = document.createElement("li");
    li.innerText = el.task;

    task.appendChild(li);

    let checkBtn = document.createElement("button");

    checkBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    checkBtn.classList.add("checkTask");
    task.appendChild(checkBtn);
    let deleteBtn = document.createElement("button");

    deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    deleteBtn.classList.add("deleteTask");
    task.appendChild(deleteBtn);

    taskContainer.appendChild(task);
    inputTask.value = "";
    checkBtn.parentElement.style.textDecoration = el.done ? "line-through" : "";
    checkBtn.parentElement.style.textDecorationColor = "red"
    checkBtn.addEventListener("click", (e) => {
      e.preventDefault();
      checkBtn.parentElement.style.textDecoration = !el.done
        ? "line-through"
        : "";
      el.done = !el.done;
      localStorage.setItem("data", JSON.stringify(savedTask));
    });

    deleteBtn.addEventListener("click", (e) => {
      e.preventDefault();
      //let target = e.target;
      /*let idTask = target.parentElement.parentElement.getAttribute("id");

      console.log(target.parentElement.parentElement);
      target.parentElement.parentElement.remove();*/
      document.getElementById(el.id).remove();

      savedTask = savedTask.filter((task) => task.id !== el.id);
      localStorage.setItem("data", JSON.stringify(savedTask));
    });
  });

  //console.log(savedTask);
}

updateTasks();
