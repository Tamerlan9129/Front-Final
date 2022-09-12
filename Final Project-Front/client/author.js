const wrapper = document.querySelector(".wrapper");
const loader = document.querySelector(".loader");
const getAuthData = axios.get("http://localhost:3000/api/authors");

const authorAdd=document.getElementById("authors");
function getAllAuthors() {
  loader.style.display = "block";
  wrapper.style.display = "none";
  getAuthData.then((auth) => {
    loader.style.display = "none";
    wrapper.style.display = "block";
    auth.data.map((author) => {
     
      const authList = `
         


        <div class="cont">
        <div class="card">
            <!-- FRONT -->
            
            <div class="front">
                <section class="card-front">
                <div class="img">
                        <img src="${author.imgUrl}" alt="Fireworks" style="height:320px;width: 250px;">
                    </div>
                   
                    
                </section>
            </div>
            
            <div class="back">
                <section class="card-back">
                    <p>${author.biography}</p>
                    
                    
                </section>
            </div>
            <!-- END OF BACK -->
        </div>

          `;
      authorAdd.insertAdjacentHTML("beforeend", authList);
    });
  });
}
getAllAuthors();
