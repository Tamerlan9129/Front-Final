const wrapper = document.querySelector(".wrapper");
const loader = document.querySelector(".loader");

const booksdata = fetch("http://localhost:3000/api/books").then((response) =>
  response.json()
);
const allbooks = document.getElementById("books");
function getBooks() {
  loader.style.display = "block";
  wrapper.style.display = "none";
  booksdata.then((data) => {
    loader.style.display = "none";
    wrapper.style.display = "block";
    data.map((books) => {
      const booksdiv = `
       

        <div class="bok">
        <div class="book-front">
          <div>
            <img src="${books.imageUrl}" alt="Dracula. The Un-Dead" class="book-cover" />
          </div>
          <div></div>
        </div>
        <div class="book-pages">
          <div></div>
          <div class="note-book">
            <h1 class="title">${books.title}</h1>
            <h4 class="author">${books.author}</h4>
            <p class="summary">
            ${books.synopsis}
            </p>
            <h6 class="year">Published:${books.publishDay}</h6>
          </div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div class="book-back"></div>
      </div>

        
        `;
      allbooks.insertAdjacentHTML("beforeend", booksdiv);
    });
  });
}
getBooks();



