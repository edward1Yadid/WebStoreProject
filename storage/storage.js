const localStorage1 = document.getElementById("localStorage");
const sessionStorage1 = document.getElementById("sessionStorage");
const localStorageBtn = document.querySelector(".localStorageBtn");
const sessionStorageBtn = document.querySelector(".sessionStorageBtn");

localStorageBtn.addEventListener("click", localStorageSet);
sessionStorageBtn.addEventListener("click", sessionStorageSet);
let counter = 0;
function localStorageSet() {
  localStorage.setItem(counter, localStorage1.value);
  counter++;
}
function sessionStorageSet() {
  sessionStorage.setItem(counter, sessionStorage1.value);
  counter++;
}

function readFromLocalStorage() {
  console.log(localStorage.getItem(counter));
}
// readFromLocalStorage();

function saveObjectinLocalStorage() {
  const arr = [
    { name: "Edward", age: 30 },
    { name: "Dan", age: 20 },
  ];
  //convert object into a string and set in
  localStorage.setItem("users", JSON.stringify(arr));
  console.log(localStorage);
  const users = localStorage.getItem("users");
  /*Storage { 0: "function toString() {\n    [native code]\n}", users: '[{"name":"Edward","age":30},{"name":"Dan","age":20}]', length: 2 } */
  //convert string to object
  console.log(JSON.parse(users));
  /*Array [ {…}, {…} ]
​
0: Object { name: "Edward", age: 30 }
​
1: Object { name: "Dan", age: 20 }
​
length: 2 */
}
saveObjectinLocalStorage();
