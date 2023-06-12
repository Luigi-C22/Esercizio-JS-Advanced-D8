let endPointUrl = "https://striveschool-api.herokuapp.com/api/product/"
let token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdmNzgxNmI5YzBmNzAwMTQ0ODRmZmMiLCJpYXQiOjE2ODYwNzU0MTQsImV4cCI6MTY4NzI4NTAxNH0.6yTss36DlPn-9fiDNU5B87s0SYthkfeYIH9d38-9bbw"

let cardSection = document.getElementById("cardSection")


//estrazione dei dati dall'API
async function getData() {
    try {
        const res = await fetch(endPointUrl, { headers: { Authorization: token } });
        const json = await res.json();
        console.table(json);
        json.forEach(element => {
            showItems(element);
        });

    } catch (error) {
        console.log(error);
    }
}

//creazione delle card per ogni item
function showItems(element){
    const showCard = document.createElement("div");
    showCard.innerHTML = `
    <img src="${element.imageUrl}" class="card-img-top img-fluid mt-1  btn-3d cardShadow" alt="immagine">
    <div class="card-body ">
        <h4 class="text-uppercase">${element.name}</h4>
      <div>
        <p class="card-text">${"Brand: " + element.brand}</p>  
        <p class="card-text">${"Caratteristiche: " + element.description}</p>
        <button class="btn btn-primary m-1">${"Price: " + element.price + " €"}</button>
      </div>
      <div class="d-flex justify-content-between">
        <button class="btn btn-warning btn-3d btn-sm m-1"><a class="text-decoration-none" href = "details.html?id=${element._id}" target = "_blank">Details</a></button>
        <button class="btn btn-success btn-3d btn-sm m-1">${"Add to cart"}</button>
      </div> 
    </div>`;
    
    showCard.classList.add("card", "mx-1", "g-3", "col-sm-6","col-md-4","col-lg-3","col-xl-2");
    cardSection.append(showCard);

}


 
 getData();