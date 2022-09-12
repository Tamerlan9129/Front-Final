const bookslist = document.getElementById("first-3");
const swipers = document.getElementById("swiper");
const wrapper = document.querySelector(".wrapper");
const loader = document.querySelector(".loader");

const fetcheddata = fetch("http://localhost:3000/api/books").then((response) =>
  response.json()
);
const authordata = fetch("http://localhost:3000/api/authors").then((response) =>
  response.json()
);
const authordiv = document.getElementById("authors");
function authorsMain() {
  loader.style.display = "block";
  wrapper.style.display = "none";
  authordata.then((data) => {
    data.map((authors, index) => {
      loader.style.display = "none";
      wrapper.style.display = "block";
      console.log(authors);
      const addAutor = `


    <div class="boxs">
    <div class="cards">
      <div class="imgBx">
          <img src="${authors.imgUrl}" alt="images">
      </div>
      <div class="details">
          <h2>${authors.name}</h2>
      </div>
    </div>




    `;
      if (index < 5) {
        authordiv.insertAdjacentHTML("beforeend", addAutor);
      }
    });
  });
}
authorsMain();
function booka() {
  loader.style.display = "block";
  wrapper.style.display = "none";
  fetcheddata.then((data) => {
    loader.style.display = "none";
    wrapper.style.display = "block";
    const best = data
      .sort((book1, book2) => book2.sold - book1.sold)
      .slice(0, 5);
    best.map((map) => {
      const addbook1 = `<div class="books-item">

      
      
        <img id="bookimg" src="${map.imageUrl}" alt="img">
        <h3>Title: ${map.title}</h3>
        <p>Author: ${map.author}</p>
        <p>Price: ${map.price}$</p>
        </div> 


       




        `;
      bookslist.insertAdjacentHTML("beforeend", addbook1);
    });
  });
}
myfunc();

booka();
function myfunc() {
  fetcheddata.then((data) =>
    data.map((datas, index) => {
      console.log(datas);
      if (index < 4) {
        const addbooks = ` 
<a href="#"  class="swiper-slide"><img id="swipebook" src="${datas.imageUrl}" alt=""></a>

    `;
        swipers.insertAdjacentHTML("beforeend", addbooks);
      }
    })
  );
}
// fetcheddata.then((data) => console.log("thi is fetched data",data));
