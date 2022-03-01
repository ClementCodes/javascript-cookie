/** @format */

const [btns, inputs] = [
  document.querySelectorAll("button"),
  document.querySelectorAll("input"),
];
// const btns = document.querySelectorAll("button")
// const inputs = document.querySelectorAll("input")

const [infoTxt, affichage] = [
  document.querySelector(".info-txt"),
  document.querySelector(".affichage"),
];
// const infoTxt = document.querySelector(".info-txt")
// const affichage = document.querySelector(".affichage")
let dejaFait = false;

const today = new Date();

const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
// console.log(nextWeek);

let day = ("0" + nextWeek).slice(9, 11);
let month = ("0" + (today.getMonth() + 1)).slice(-2);
let year = today.getFullYear();

// console.log(day);
// console.log(month);
// console.log(year);

// document.querySelector('input[type=date]').value = day, month,year
var date = document.querySelector('Input[type="date"]');

date.value = `${day}-${month}-${year}`;

btns.forEach((btn) => {
  btn.addEventListener("click", btnAction);
});

function btnAction(event) {
  let nvOj = {};
  inputs.forEach((input) => {
    let attrName = input.getAttribute("name");
    // console.log(attrName);

    let attrValeur =
      attrName !== "cookieExpire" ? input.value : input.valueAsDate;

    // console.log(attrValeur);
    nvOj[attrName] = attrValeur;

    // console.log(nvOj[attrName]);
  });
  // console.log(nvOj);
  let description = event.target.getAttribute("data-cookie");

  if (description === "creer") {
    creerCookie(nvOj.cookieName, nvOj.cookieValue, nvOj.cookieExpire);
  } else if (description === "toutAfficher") {
    listeCookies();
  }
}

const creerCookie = (name, value, exp) => {
  infoTxt.innerText = " ";
  affichage.childNodes.forEach((child) => child.remove);
  affichage.innerHTML = " ";
  //si le cookie a un meme nom

  let cookies = document.cookie.split(";");

  // console.log(cookies);
  cookies.forEach((cook) => {
    cook = cook.trim();
    // console.log(cook);

    let formatCookie = cook.split("=");

    if (formatCookie[0] === encodeURIComponent(name)) {
      dejaFait = true;
    }
  });
  if (dejaFait) {
    infoTxt.innerText = "un cookie possede déjà ce nom";
  }

  // sil e cookie n 'a pas de nom
  if (name.length === 0) {
    infoTxt.innerText = "impossible de définir un cookie without name";
    return;
  }

  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(
    value
  )};expire=${exp.toUTCString()}`;

  let info = document.createElement("li");
  info.innerText = `Cookie${name} créé !`;
  affichage.appendChild(info);
  setTimeout(() => {
    info.remove();
  }, 1500);
};

function listeCookies() {
  let cookies = document.cookie.split(";");
  if (cookies.join() === " ") {
    infoTxt.innerText = "Pas de cookies à afficher";
    return;
  }

  cookies.forEach((cookie) => {
    cookie = cookie.trim();
    let formatCookie = cookie.split("=");
    console.log(formatCookie);

    infoTxt.innerText = "Cliquez sur un cookie dans la liste pour le supprimer";
    let item = document.createElement("li");
    item.innerText = `Nom: ${decodeURIComponent(
      formatCookie[0]
    )}, Valeur: ${decodeURIComponent(formatCookie[1])}`;
    affichage.appendChild(item);

    item.addEventListener("click", () => {
      document.cookie = `${formatCookie[0].toUpperCase()} =;expires=${new Date(
        0
      )}`;
      item.innerText = `Cookie ${formatCookie[0].toUpperCase()}  supprimé;`;

      setTimeout(() => {
        item.remove();
      }, 1000);
    });
  });
}
listeCookies();
