// SECTION variable
// ANCHOR élément du DOM
let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");
let demo = document.querySelector(`#btn__demo`);
let suppr = document.querySelector('.btn.btn-danger')
// ANCHOR DB temporaire
let data = [];
// ANCHOR pour les fct pour des dates
let date = new Date();
// ANCHOR REGEX
const regexTitle = /^\w+([-]?\w+){2,20}$/;
// !SECTION variable

// ANCHOR fct d'écoute au submit
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = false;
    let verif = [];
    let field = form.elements
    for (let i = 0; i < field.length; i++) {
        switch (field[i].id) {
            case "textInput":
                field[i].value = sanitizeInput(field[i].value);
                isValid = countChar(field[i], 10);
                verif.push(isValid);
                break;
            case "textarea":
                field[i].value = sanitizeInput(field[i].value);
                isValid = countChar(field[i], 250);
                verif.push(isValid);
                break;
            default:
                break;
        }
    }
    if (checker(verif)) {
        formValidation();
        form.submit();
    } else {
        alert(`❌ Entrer un titre entre 2 et 10 caractères et une description entre 2 et 250 caractères.`);
    }
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
            data.splice(selectedTask.id, 1);
            localStorage.setItem("data", JSON.stringify(data));
            selectedTask.remove();
        }));
};

// ANCHOR fct de save des datas local
(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    createTasks();
})();

// ANCHOR fct écoute de dellAll
suppr.addEventListener(`click`, () => {
    dellAll();
});

// ANCHOR fct reste all tasks
let dellAll = () => {
    let modifs = document.querySelectorAll('.fa-edit');
    modifs.forEach((modif) => {
        data = [];
        localStorage.setItem("data", JSON.stringify(data));
        modif.parentElement.parentElement.remove();
    });
}

// ANCHOR fct demo
demo.addEventListener(`click`, () => {
    dellAll();
    for (let i = 1; i < 5; i++) {
        txtRadom();
        localStorage.setItem("data", JSON.stringify(data));
        createTasks();
    }
})

// ANCHOR fct radome 5 (Dès à 5 faces)
let D5 = () => {
    return (Math.floor(Math.random() * 5 + 1));
}

// ANCHOR fct text radome
let txtRadom = () => {
    switch (D5()) {
        case 1:
            data.push({
                text: `Tache exemple`,
                date: date.toLocaleDateString(),
                description: `Description de la tache en question`,
            });
            break;
        case 2:
            data.push({
                text: `MARTI !`,
                date: `05/09/1955`,
                description: `Il faut que tu retourne dans le future le 5 novembre 1995`,
            });
            break;
        case 3:
            data.push({
                text: `Changer les boutons`,
                date: `01/04/${date.getFullYear()}`,
                description: `Il faut changer le CSS des boutons pour le projet Easter Eggs.`,
            });
            break;
        case 4:
            data.push({
                text: `Test`,
                date: date.toLocaleDateString(),
                description: `Test de description`,
            });
            break;
        case 5:
            data.push({
                text: `Bonjour le monde`,
                date: `00/05/1996`,
                description: `Les premier pas de JavaScrip`,
            });
            break;
        default:
            break;
    }
}


// ANCHOR vérification
function countChar(input, nbMax) {
    if (input.value.length > 1 && input.value.length <= nbMax) {
        return true;
    } else {
        return false;
    }
}

let checker = (arr) => arr.every((parm) => parm === true);

// ANCHOR Empêche injection de code ou caract spé
function sanitizeInput(input) {
    // Enlever les balises HTML
    input = input.replace(/<[^>]*>/g, "");
    // Enlever les caractères spéciaux dangereux
    input = input.replace(/[^a-zA-Z0-9 ]/g, "");
    // Enlever les espaces multiples
    input = input.replace(/\s\s+/g, " ");
    console.log("input 4 => ", input);
    // Enlever les espaces en début et fin de chaîne
    input = input.trim();
    console.log("input 5 => ", input);
    return input;
}