const bookTableBody = document.getElementById("table-book");
const addBookbtn = document.getElementById("add-book");
const modal = document.getElementById("survey-form");
const modalClose = document.getElementById("surclose");
const bookTitle = document.getElementById("title");
const bookAuthor = document.getElementById("author");
const bookPublisher = document.getElementById("publisher");
const bookPrice = document.getElementById("price");
const bookImage = document.getElementById("image");
const soldPiece = document.getElementById("sold");
const synopsis = document.getElementById("comment");
const editBtn = document.getElementById("editBook");
const datetime = document.getElementById("publishdate");
const submitBtn = document.getElementById("submit");
const wrapper = document.querySelector(".wrappper");
const loader = document.querySelector(".loader");

function addBooks() {
  const inputCheck = document.querySelectorAll(`input[name="movie"]:checked`);
  const genreChekced = [];
  const cover = [];
  const bookCover = document.querySelectorAll(
    `input[name="book-cover"]:checked`
  );
  Array.from(inputCheck).forEach(function (values) {
    genreChekced.push(values.id);
  });
  Array.from(bookCover).forEach(function (info) {
    cover.push(info.id);
  });

  const addBook = {
    title: bookTitle.value,
    author: bookAuthor.value,
    publisher: bookPublisher.value,
    sold: soldPiece.value,
    price: bookPrice.value,
    imageUrl: bookImage.value,
    synopsis: synopsis.value,
    genre: genreChekced,
    publishDay: datetime.value,
    bookCover: cover,
  };
  console.log(addBook);
  axios.post("http://localhost:3000/api/books", addBook);
}

addBookbtn.addEventListener("click", () => {
  modal.style.display = "block";
});

modalClose.addEventListener("click", () => {
  modal.style.display = "none";
});

function editBook(id) {
  modal.style.display = "block";

  axios.get(`http://localhost:3000/api/books/${id}`).then((book) => {
    (bookTitle.value = book.data.title),
      (soldPiece.value = book.data.sold),
      (datetime.value = book.data.publishDay),
      (bookAuthor.value = book.data.author),
      (bookImage.value = book.data.imageUrl),
      (synopsis.value = book.data.synopsis),
      (bookPublisher.value = book.data.publisher),
      (bookPrice.value = book.data.price),
      book.data.bookCover === "soft"
        ? (document.getElementById("soft").checked = true)
        : (document.getElementById("hard").checked = true),
      book.data.genre.map(
        (genre) => (document.getElementById(`${genre}`).checked = true)
      );
  });
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    deleteBook(id);
  });
}

function renderBookList() {
  loader.style.display = "block";
  wrapper.style.display = "none";
  axios.get("http://localhost:3000/api/books").then(books =>
    books.data.map((book) => {
      loader.style.display = "none";
      wrapper.style.display = "block";
      const bookRow = `
               <tr>
                    <td>${book.id}</td>
                    <td> <img style="width:100px;height:100px;" src="${book.imageUrl}" alt="photo"></td>
                    <td>${book.title}</td>
                    <td>${book.publisher}</td>
                    <td>${book.genre}</td>
                    <td>${book.publishDay}</td>
                    <td>${book.price}</td>
                   
                    <td>
                    <i class="fa-solid fa-edit" onclick="editBook(${book.id})" id="editBook"></i>
                    <i onclick="deleteBook(${book.id})" class="fa-solid fa-trash" id="delete" ></i>
                    </td>
                </tr>    
            `;
      bookTableBody.insertAdjacentHTML("beforeend", bookRow);
    })
  );
}

function deleteBook(id) {
  axios.delete(`http://localhost:3000/api/books/${id}`);
}
renderBookList();

function logOut() {
  if (!localStorage.length) {
    location.href = "index.html";
  }
}
logOut()