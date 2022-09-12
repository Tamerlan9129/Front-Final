const tableAuthBody = document.getElementById("table-auth");
const addAutbtn = document.getElementById("add");
const survClose = document.getElementById("surclose");
const survModal = document.getElementById("survey-form");
const autName = document.getElementById("nameaut");
const autImg = document.getElementById("imageur");
const autBio = document.getElementById("bio");
const wrapper = document.querySelector(".wrapper");
const loader = document.querySelector(".loader");

survClose.addEventListener("click", () => {
  survModal.style.display = "none";
});
addAutbtn.addEventListener("click", () => {
  survModal.style.display = "block";
});
function renderAuthorList() {
  loader.style.display = "block";
  wrapper.style.display = "none";
  axios.get("http://localhost:3000/api/authors").then((author) =>
    author.data.map((authors) => {
      loader.style.display = "none";
      wrapper.style.display = "block";
      const authorRow = `  
            <tr>
            <td>${authors.id}</td>
            <td> <img style="width:100px;height:100px;" src="${authors.imgUrl}" alt="photo"></td>
            <td>${authors.name}</td>
            <td>${authors.biography}</td>
            <td>
            <i class="fa-solid fa-edit" id="edit-aut"></i>
            <i onclick=" deleteAuth(${authors.id})" class="fa-solid fa-trash" id="delete-aut"></i>
            </td>
           </tr>     
            `;

      tableAuthBody.insertAdjacentHTML("beforeend", authorRow);
    })
  );
}

renderAuthorList();

function deleteAuth(id) {
  axios.delete(`http://localhost:3000/api/authors/${id}`);
}

function addAuthors() {
  const addAutor = {
    name: autName.value,
    imgUrl: autImg.value,
    biography: autBio.value,
  };
  axios.post("http://localhost:3000/api/authors", addAutor);
}


function logOut() {
  if (!localStorage.length) {
    location.href = "index.html";
  }
}
logOut()