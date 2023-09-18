const welcomeText = document.getElementById("userName");
const userNameEmail = sessionStorage.getItem("currentUserLoggedIN");
const users = JSON.parse(sessionStorage.getItem("users"));
const currentuser = users.find((value) => value[0] == userNameEmail);
function initsession() {
  welcomeText.innerHTML = `welcome to the website:${currentuser[1].fullname}`;
}
function logout() {
  sessionStorage.removeItem("currentUserLoggedIN");

  let counter = 5;
  const id = setInterval(() => {
    counter--;
    welcomeText.innerHTML = `good bye ${currentuser[1].fullname} you will log out from the website on ${counter}`;
    if (counter == 0) {
      clearInterval(id);
    }
  }, 1000);

  setTimeout(() => {
    window.location.href = "login.html";
  }, 5000);
}
