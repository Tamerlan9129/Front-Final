const switchers = [...document.querySelectorAll(".switcher")];

switchers.forEach((item) => {
  item.addEventListener("click", function () {
    switchers.forEach((item) =>
      item.parentElement.classList.remove("is-active")
    );
    this.parentElement.classList.add("is-active");
  });
});

const regButton = document.querySelector(".fa-user-tie");
const regModal = document.querySelector(".login-sign");
const closeModal = document.querySelector(".fa-xmark");

const signUpBtn = document.querySelector(".btn-signup");
const loginBtn = document.querySelector(".btn-login");
const logouticon = document.getElementById("logout");
const load = document.getElementById("loader");
const dashadder = document.getElementById("dashadd");
regButton.addEventListener("click", () => {
  regModal.style.display = "block";
});

closeModal.addEventListener("click", () => {
  regModal.style.display = "none";
});

signUpBtn.addEventListener("click", (e) => {
 
  e.preventDefault();
  const newUser = {
    name: document.getElementById("name").value,
    surname: document.getElementById("surname").value,
    mail: document.getElementById("signup-email").value,
    password: document.getElementById("signup-password").value,
  };
  axios.post("http://localhost:3000/api/books/signup", newUser);
});

loginBtn.addEventListener(
  "click",
  (e) => {
    e.preventDefault();
    const logData = {
      mail: document.getElementById("login-email").value,
      password: document.getElementById("login-password").value,
    };

    
    setTimeout(() => {
      axios
        .post("http://localhost:3000/api/books/login", logData)
        .then((response) => 
        {
          regButton.style.display = "none";
          logouticon.style.display = "block";
          localStorage.setItem("User", JSON.stringify(logData));
          console.log(regButton);
          showNotification("success","Success!","Your request was completed successfully.");
          (regModal.style.display = "none")
         
         setTimeout(() => {
          location.reload()
        }
        , 1500);
         
        
        }).catch(
          () => {
     
          showNotification("error",
          "Error!",
          "Your request did not complete successfully.");
         
        });
    }) 
  },
  3000
);


logouticon.addEventListener("click", () => {
  {
    localStorage.removeItem("User");
    location.reload();
  }
});

checkLog();
function checkLog() {
  if (localStorage.length) {
    const users = localStorage.getItem("User");
    const parsedUser = JSON.parse(users);
    const dashboard = `
    <li id="dashmenu" class="navbar__link after-transform"><a href="./dashboard.html">Dashboard</a></li>`;
    dashadder.insertAdjacentHTML("beforeend", dashboard);
    regButton.innerHTML = `${parsedUser.mail}`;
   regButton.onclick=""
    logouticon.style.display = "block";
  }
}

// new notification line

var notification;
var container = document.querySelector("#notification-container");
var visible = false;
var queue = [];

function createNotification() {
  notification = document.createElement("div");
  var btn = document.createElement("button");
  var title = document.createElement("div");
  var msg = document.createElement("div");
  btn.className = "notification-close";
  title.className = "notification-title";
  msg.className = "notification-message";
  btn.addEventListener("click", hideNotification, false);
  notification.addEventListener("animationend", hideNotification, false);
  notification.addEventListener("webkitAnimationEnd", hideNotification, false);
  notification.appendChild(btn);
  notification.appendChild(title);
  notification.appendChild(msg);
}

function updateNotification(type, title, message) {
  notification.className = "notification notification-" + type;
  notification.querySelector(".notification-title").innerHTML = title;
  notification.querySelector(".notification-message").innerHTML = message;
}

function showNotification(type, title, message) {
  if (visible) {
    queue.push([type, title, message]);
    return;
  }
  if (!notification) {
    createNotification();
  }
  updateNotification(type, title, message);
  container.appendChild(notification);
  visible = true;
}

function hideNotification() {
  if (visible) {
    visible = false;
    container.removeChild(notification);
    if (queue.length) {
      showNotification.apply(null, queue.shift());
    }
  }
}

document
  .querySelector("#success-btn")
  .addEventListener(
    "click",showNotification.bind( null, "success","Success!","Your request was completed successfully."),false
  );
document
  .querySelector("#error-btn")
  .addEventListener(
    "click",
    showNotification.bind(
      null,
      "error",
      "Error!",
      "Your request did not complete successfully."
    ),
    false
  );
document
  .querySelector("#info-btn")
  .addEventListener(
    "click",
    showNotification.bind(
      null,
      "info",
      "Information",
      "Don't forget to checkout the new features"
    ),
    false
  );
document
  .querySelector("#warning-btn")
  .addEventListener(
    "click",
    showNotification.bind(
      null,
      "warning",
      "Warning!",
      "Your battery is running low."
    ),
    false
  );


 