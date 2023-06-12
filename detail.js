//funzione che richiama il prodotto singolo con ID (metodo GET) alla pagina details.html
let apiUrl = "https://striveschool-api.herokuapp.com/api/product/"
let tokenKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdmNzgxNmI5YzBmNzAwMTQ0ODRmZmMiLCJpYXQiOjE2ODYwNzU0MTQsImV4cCI6MTY4NzI4NTAxNH0.6yTss36DlPn-9fiDNU5B87s0SYthkfeYIH9d38-9bbw"

const activeQuery = new URLSearchParams(window.location.search);
const activeId = activeQuery.get("id");

const nameItem = document.getElementById("name");
const brandItem = document.getElementById("brand");
const descriptionItem = document.getElementById("description");
const priceItem = document.getElementById("price");
const imageUrlItem = document.getElementById("imageUrl");


async function singleProduct() {
    try {
        const res = await fetch(apiUrl + activeId, {
            headers:
                { Authorization: tokenKey }
        });
        const json = await res.json();
        console.log(json)
        nameItem.innerHTML = json.name;
        descriptionItem.innerHTML = json.description;
        brandItem.innerHTML = json.brand;
        priceItem.innerHTML = json.price;
        imageUrlItem.src = json.imageUrl;
        myData = json;
        
    } catch (error) {
        console.log(error);
    }
}
singleProduct();
