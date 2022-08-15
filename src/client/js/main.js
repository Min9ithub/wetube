import "regenerator-runtime";
import "../scss/styles.scss";

const themeBtn = document.getElementById("themeBtn");
const icon = themeBtn.querySelector("i");
const body = document.querySelector("body");

let themeIcon = false;

function changeTheme() {
  if (themeIcon == true) {
    themeIcon = false;
    icon.className = "far fa-sun";
    body.style.backgroundColor = "white";
    themeBtn.style.backgroundColor = "white";
    body.style.color = "black";
    icon.style.color = "black";
  } else {
    themeIcon = true;
    icon.className = "far fa-moon";
    body.style.backgroundColor = "black";
    themeBtn.style.backgroundColor = "black";
    body.style.color = "white";
    icon.style.color = "white";
  }
}

themeBtn.addEventListener("click", changeTheme);
