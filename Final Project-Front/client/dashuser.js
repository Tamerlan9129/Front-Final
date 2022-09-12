const userTableBody = document.getElementById("user-table-body");
const wrapper = document.querySelector(".wrapper");
const loader = document.querySelector(".loader");

renderUserList();
function renderUserList() {
    loader.style.display = "block";
  wrapper.style.display = "none";
  axios.get("http://localhost:3000/api/users").then((users) =>{
    loader.style.display = "none";
    wrapper.style.display = "block";
    users.data.map((user) => {
      const userRow = `  
            <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.surname}</td>
            <td>${user.mail}</td>
            <td>${user.password}</td>
           </tr>     
            `;
      userTableBody.insertAdjacentHTML("beforeend", userRow);
    })
});
}


function logOut() {
  if (!localStorage.length) {
    location.href = "index.html";
  }
}

logOut()