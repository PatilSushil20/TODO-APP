document.addEventListener('DOMContentLoaded', () => {
  const tasKFromUser = document.getElementById("task");
  const incompletTask = document.getElementById("IncompletetaskList");
  const completTask = document.getElementById("cTask");
  const taskAddedMessage = document.getElementById("taskAdd")
  const taskRemoveMessage = document.getElementById("taskRemove");
  const taskCompleteMessage = document.getElementById("taskComplete")


  // retrive the data from localstorage if present or assign the empty array
  const dataFromlocalStorage = JSON.parse(localStorage.getItem("todos")) || [];

  // retrive items which are store inside the localstorage when DOM Content Loaded.


  // -------------------------------------------------------------- Update the display
  function updateDisplay() {
    incompletTask.innerHTML = ""
    completTask.innerHTML = ""

    dataFromlocalStorage.forEach((element, index) => {

      // li creation for task
      const liForTask = document.createElement("li")
      liForTask.setAttribute("class", "addListStyle")
      const textNode = document.createTextNode(element.text)
      liForTask.appendChild(textNode);


      // check if task is completed
      if (element.isComplete) {
        completTask.appendChild(liForTask);
      } else {
        incompletTask.appendChild(liForTask);
      }


      // Creating button container btn
      const btnContainer = document.createElement("div")
      btnContainer.setAttribute("id", "btnContainer")
      liForTask.appendChild(btnContainer)


      //  ----- Create edit and complete btn only when you task is not completed -----

      if (element.isComplete === false) {
        // ------------------------------------------------------- Creating Edit btn
        const editBtn = document.createElement("button")
        editBtn.innerHTML = "Edit"
        editBtn.setAttribute("class", "editButton")
        btnContainer.appendChild(editBtn)

        editBtn.addEventListener('click', () => {
          editTodo(index);
        });

        // ------------------------------------------------------- Creating Complete btn
        const completeBtn = document.createElement("button")
        completeBtn.innerHTML = "Complete"
        completeBtn.setAttribute("class", "taskComplete")
        btnContainer.appendChild(completeBtn)

        completeBtn.addEventListener('click', () => {
          taskIsComplete(index);
        });
      }



      // ------------------------------------------------------- Creating Delete btn
      const deleteBtn = document.createElement("button")
      deleteBtn.innerHTML = "Delete"
      deleteBtn.setAttribute("class", "deteteBtn")
      btnContainer.appendChild(deleteBtn)
      deleteBtn.addEventListener('click', () => {
        deleteTodo(index);
      });
    });
  }

  // ------------------------------------------------------- store data in localstorage
  function setItemInLocal() {
    localStorage.setItem("todos", JSON.stringify(dataFromlocalStorage))
  }

  // ------------------------------------------------------- Add task function
  window.addTask = () => {
    if (tasKFromUser.value == "") {
      alert("Add a task");
      return;
    }
    else {
      const taskObj = {
        text: tasKFromUser.value.trim(),
        isComplete: false
      }

      dataFromlocalStorage.push(taskObj);
      setItemInLocal();
      updateDisplay();

      taskAddedMessage.style.display = "block";
      setTimeout(() => {
        taskAddedMessage.style.display = "none"
      }, 2000)

      tasKFromUser.value = "";
    }
  }

  // -------------------------------------------------------  Delete task function
  function deleteTodo(idx) {
    dataFromlocalStorage.splice(idx, 1)
    setItemInLocal()
    updateDisplay();
    taskRemoveMessage.style.display = "block";
    setTimeout(() => {
      taskRemoveMessage.style.display = "none";
    }, 2000);
  }

  //  -------------------------------------------------------  Edit task function
  function editTodo(idx) {
    const newText = prompt("Edit the task:", dataFromlocalStorage[idx].text);
    if (newText !== null) {
      dataFromlocalStorage[idx].text = newText.trim();
      setItemInLocal()
      updateDisplay();
    }
  }

  //  -------------------------------------------------------  Task is Complete function
  function taskIsComplete(idx) {
    dataFromlocalStorage[idx].isComplete = true;
    setItemInLocal()
    updateDisplay()
    taskCompleteMessage.style.display = "block"
    setTimeout(() => {
      taskCompleteMessage.style.display = "none"
    }, 2000)
  }

})
updateDisplay()