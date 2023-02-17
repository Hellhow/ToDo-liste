// const de nos éléments
const form = document.getElementById("form");
const input = document.getElementById("input");
const msg = document.getElementById("msg");
const posts = document.getElementById("posts");

// let de stockage
let data = {};

// écouteur du formulaire sur le submit
form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("button clicked");
    formValidation();
});

// empêcher les utilisateurs de soumettre des champs de saisie vides
let formValidation = () => {
    if (input.value === "") {
        msg.innerHTML = "Post cannot be blank";
        msg.classList.add(`txt-red`);
        console.log("failure");
    } else {
        console.log("success");
        msg.classList.remove(`txt-red`);
        msg.innerHTML = "";
        acceptData();
    }
};

// fct pour valider les datas
let acceptData = () => {
    data["text"] = input.value;
    console.log(data);
    createPost();
};

// fct pour ajouter le contenue html des nouveaux postes
let createPost = () => {
    posts.innerHTML += `
    <div class="d-flex fd-col g-1">
      <p>${data.text}</p>
      <span class="options">
        <i onClick="editPost(this)" class="fas fa-edit"></i>
        <i onClick="deletePost(this)" class="fas fa-trash-alt"></i>
      </span>
    </div>
    `;
    input.value = "";
};