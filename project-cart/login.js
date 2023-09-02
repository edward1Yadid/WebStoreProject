//////////////////////////////////////////////////////////////////////usersData////////////////////////////////////////
function user(
  username,
  email,
  fullname,
  password,
  lastLoginDate,
  permissioinSet
) {
  this.username = username;
  this.email = email;
  this.fullname = fullname;
  this.password = password;
  this.lastLoginDate = lastLoginDate;
  this.permissioinSet = permissioinSet;
}

function userAtsessionstorage() {
  const userkey = "users";
  if (!!sessionStorage.getItem(userkey)) {
    let users = JSON.parse(sessionStorage.getItem(userkey));
    users.forEach(
      (user) => (user[1].permissioinSet = new Set(user[1].permissioinSet))
    );
    console.log(users);
    return new Map(users);
  } else {
    const user1 = new user(
      "user1",
      "user1@gmail.com",
      "user 1",
      "A123456",
      null,
      ["EMPTY_CART", "DISCOUNT_15"]
    );
    const user2 = new user(
      "user2",
      "user2@gmail.com",
      "user 2",
      "A123456",
      null,
      ["EMPTY_CART", "REMOVE_FROM_CART", "ADD_TO_CART"]
    );
    const user3 = new user(
      "user3",
      "user3@gmail.com",
      "user 3",
      "A123456",
      null
    );
    const user4 = new user(
      "user4",
      "user4@gmail.com",
      "user 4",
      "A123456",
      null,
      ["EMPTY_CART", "DISCOUNT_15", "ADD_TO_CART", "REMOVE_FROM_CART"]
    );
    const user5 = new user(
      "user5",
      "user5@gmail.com",
      "user 5",
      "A123456",
      null,
      ["EMPTY_CART", "REMOVE_FROM_CART", "ADD_TO_CART"]
    );

    const users = [
      [user1.email, user1],
      [user2.email, user2],
      [user3.email, user3],
      [user4.email, user4],
      [user5.email, user5],
    ];

    sessionStorage.setItem(userkey, JSON.stringify(users));
    users.forEach(
      (user) => (user[1].permissioinSet = new Set(user[1].permissioinSet))
    );
    return new Map(users);
  }
}

const users = userAtsessionstorage();

//////////////////////////////////////////////////////////////////////validation////////////////////////////////////////

const formLogin = document.querySelector(".form-login");

// check validation for form
formLogin.addEventListener("submit", validaiton);
function validaiton(element) {
  element.preventDefault();

  const email = document.getElementById("email").value;

  const password = document.getElementById("password").value;
  if (!checkUserAndPassword(email, password)) {
    alert("Email or password is invalid!");
  } else if (!isUserExist(email, password)) {
    alert("user was not found for the given credentials");
  } else {
    updateUaerLastLoggedInDate(email);
    sessionStorage.setItem("currentUserLoggedIN", email);

    window.location.href = "index.html";
  }
}

function checkUserAndPassword(email, password) {
  const emailRegex = /^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return (
    emailRegex.test(email) &&
    password.length > 6 &&
    password.toLowerCase() !== password
  );
}

function isUserExist(email, password) {
  if (users.has(email)) {
    return users.get(email).password == password;
  }
  return false;
}

function updateUaerLastLoggedInDate(email) {
  const now = new Date();
  const year = now.getFullYear();
  const month =
    now.getMonth() < 10
      ? "0" + (now.getMonth() + 1)
      : "" + (now.getMonth() + 1);
  const day =
    now.getDate() + 1 < 10
      ? "0" + (now.getDate() + 1)
      : "" + (now.getDate() + 1);
  const hour = now.getHours() < 10 ? "0" + now.getHours() : "" + now.getHours();
  const minuts =
    now.getMinutes() < 10 ? "0" + now.getMinutes() : "" + now.getMinutes();

  let DateTime = `${day}-${month}-${year} ${hour}:${minuts}`;
  users.get(email).lastLoginDate = DateTime;
}
