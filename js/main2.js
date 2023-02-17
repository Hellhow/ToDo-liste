// ANCHOR list des let
let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");
let data = [];

// ANCHOR fct d'écoute au submit
form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
});

// ANCHOR fct de validation du form
let formValidation = () => {
    if (textInput.value === "") {
        console.log("failure");
        msg.innerHTML = "Task cannot be blank";
    } else {
        console.log("success");
        msg.innerHTML = "";
        acceptData();
        add.setAttribute("data-bs-dismiss", "modal");
        add.click();
        (() => {
            add.setAttribute("data-bs-dismiss", "");
        })();
    }
};

// ANCHOR fct collecte de data
let acceptData = () => {
    data.push({
        text: textInput.value,
        date: dateInput.value,
        description: textarea.value,
    });
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
    createTasks();
};

// ANCHOR ftc créer une nouvelle tache
let createTasks = () => {
    tasks.innerHTML = "";
    data.map((x, y) => {
        return (tasks.innerHTML += `
      <div id=${y}>
            <span class="fw-bold">${x.text}</span>
            <span class="small text-secondary">${x.date}</span>
            <p>${x.description}</p>
            <span class="options">
              <i data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
              <i class="fas fa-trash-alt"></i>
            </span>
          </div>
      `);
    });
    resetForm();
    deleteTask();
    editTask();
};

// ANCHOR fct de vidage de formulaire
let resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
};

// ANCHOR ftc de delete des tasks
let deleteTask = () => {
    let trashes = document.querySelectorAll(".fa-trash-alt");
    trashes.forEach((trash) =>
        trash.addEventListener("click", () => {
            data.splice(trash.parentElement.parentElement.id, 1);
            localStorage.setItem("data", JSON.stringify(data));
            trash.parentElement.parentElement.remove();
        }));
};

// ANCHOR fct de edit de tasks
let editTask = () => {
    let modifs = document.querySelectorAll('.fa-edit');
    modifs.forEach((modif) =>
        modif.addEventListener("click", () => {
            let selectedTask = modif.parentElement.parentElement;
            textInput.value = selectedTask.children[0].innerHTML;
            dateInput.value = selectedTask.children[1].innerHTML;
            textarea.value = selectedTask.children[2].innerHTML;
            // suppressions de l'ancient task
            data.splice(modif.parentElement.parentElement.id, 1);
            localStorage.setItem("data", JSON.stringify(data));
            modif.parentElement.parentElement.remove();
        }));
};

// ANCHOR fct de save des datas local
(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    console.log(data);
    createTasks();
})();