let forms = document.getElementById("form");
let dateInput = document.getElementById("dateInput"); //form
let subjectName = document.getElementById("subjectName"); //form
let homework = document.getElementById("homework"); //form
let status = document.getElementById("status"); //form
let selectSubject = document.getElementById("selectSubject"); //UI
let validateSubject = document.getElementById("validateSubject"); //validationSubjectinForm
let validateDate = document.getElementById("validateDate"); //validateDateinForm
let validateHW = document.getElementById("validateHW"); //validateHWinForm
let add = document.getElementById("add"); //addModal

forms.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

//set form
let formValidation = () => {
  if (subjectName.value === "") {
    console.log("fail");
    validateSubject.innerHTML = `<div id="validateMsgStyle">Please fill in the subject</div>`;
  } else if (dateInput.value === "") {
    validateDate.innerHTML = `<div id="validateMsgStyle">When do you need to complete this?</div>`;
  } else if (homework.value === "") {
    validateHW.innerHTML = `<div id="validateMsgStyle">What type of homework is this?</div>`;
  } else {
    validateSubject.innerHTML = "";
    validateDate.innerHTML = "";
    validateHW.innerHTML = "";
    acceptData();

    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", ""); //target an HTML attribute to close modal
    })();
  }
};

//add data
let data = [];

let acceptData = () => {
  data.push({
    Subject: subjectName.value,
    Date: dateInput.value,
    TypeOfHomework: homework.value,
  });
  localStorage.setItem("data", JSON.stringify(data)); //store in localstorage
  console.log(data);
  createTasks();
};

//create task and update UI
let createTasks = () => {
  tasks.innerHTML = "";
  data.map((x, y) => {
    return (tasks.innerHTML += `<div id=${y} class="card-body text-bg-light" style="width: 18rem">

    <h5 class="card-title">${x.Subject}</h5>
    <h6 class="card-subtitle mb-2 text-muted">${x.Date}</h6>
    <p class="card-text">Type of homework: ${x.TypeOfHomework}</p>
    <span>
    <i onClick="updateTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="bi bi-pencil-fill"></i>
    <i onClick="deleteTask(this)" class="bi bi-trash-fill"></i>
    <i class="bi bi-check-circle-fill"></i>
    </span>
  </div>`);
  });
  resetForm();
};

//reset form
let resetForm = () => {
  subjectName.value = "";
  dateInput.value = "";
  homework.value = "";
};

//delete task
let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  //to delete 1 object from an array. 1 refers to no. of object to delete.
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
};

//update task
let updateTask = (e) => {
  let selectedTask = e.parentElement.parentElement;
  subjectName.value = selectedTask.children[0].innerHTML;
  dateInput.value = selectedTask.children[1].innerHTML;
  homework.value = selectedTask.children[2].innerHTML;

  deleteTask(e);
};

//retrieve data from localstorage to show in UI
(() => {
  data = JSON.parse(localStorage.getItem("data")) || []; //add an or empty array to prevent from getting an error.
  console.log(data);
  createTasks();
})();
