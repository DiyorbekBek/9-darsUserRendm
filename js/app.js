const API = "https://randomuser.me/api/?results=18";
const overlay = document.getElementById("overlay");
const modal = document.getElementById("modal");
const html = document.documentElement;
const modalToggle = document.getElementById("dark-btn");
const template = document.querySelector("template");
const userList = document.getElementById("user-list");
const form = document.querySelector("form");
const clearBtn = document.getElementById("qlear-btn");

clearBtn.addEventListener("click", (e) => {
  e.preventDefault();
  userList.innerHTML = "";
});

form["name"].addEventListener("input", () => {
  const inputVal = form["name"].value.toLowerCase();
  const name = document.querySelectorAll(".user_name");
  name.forEach((item) => {
    console.log(item.parentElement);
    if (item.textContent.toLowerCase().includes(inputVal)) {
      item.parentElement.classList.remove("hidden");
    } else {
      item.parentElement.classList.add("hidden");
    }
  });
});

modalToggle.addEventListener("click", () => {
  html.classList.toggle("dark");
  if (html.classList.contains("dark")) {
    modalToggle.innerHTML = `<i class="fa-regular fa-sun fa-xl"></i>`;
  } else {
    modalToggle.innerHTML = `<i class="fa-solid fa-moon fa-xl"></i>`;
  }
});

const getData = (API) => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.addEventListener("readystatechange", () => {
      if (request.readyState < 4) {
        modal.classList.remove("hidden");
        overlay.classList.remove("hidden");
      } else if (request.readyState == 4 && request.status === 200) {
        const data = JSON.parse(request.responseText);
        modal.classList.add("hidden");
        overlay.classList.add("hidden");
        resolve(data.results);
      } else if (request.readyState === 4) {
        reject("Malumot ilishni iloji Yoq");
      }
    });
    request.open("GET", API);
    request.send();
  });
};

function uptadeUI(data) {
  data.forEach((item) => {
    const id = item.cell;
    const img = item.picture.large;
    const title = item.name.title;
    const fullName = `${item.name.first} ${item.name.last}`;
    const age = item.dob.age;
    const location = ` ${item.location.city} ${item.location.country}`;
    const gender = item.gender;

    const card = template.content.cloneNode(true);

    const imgEl = card.querySelector("#user-img");
    const titleEl = card.querySelector("#usr-title");
    const fullNameEl = card.querySelector("#usr-first");
    const ageEl = card.querySelector("#usr-age");
    const adress = card.querySelector("#usr-city");
    const genderEl = card.querySelector("#usr-gender");
    const delBtn = card.querySelector("#delBtn");

    delBtn.setAttribute("data-id", `${id}`);
    genderEl.innerHTML = `<i class="fa-solid fa-venus-mars"></i> ${gender}`;
    adress.textContent = location;
    titleEl.textContent = ` ${title}`;
    ageEl.textContent = ` ${age}`;
    fullNameEl.textContent = fullName;
    imgEl.src = img;
    userList.appendChild(card);
  });
}

const reload = () => {
  getData(API)
    .then((data) => {
      uptadeUI(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

document.addEventListener("DOMContentLoaded", reload);
document.addEventListener("click", (e) => {
  if (e.target.dataset.id) {
    e.target.parentElement.remove();
  }
});
