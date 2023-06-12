let endPointUrl = "https://striveschool-api.herokuapp.com/api/product/"
let token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdmNzgxNmI5YzBmNzAwMTQ0ODRmZmMiLCJpYXQiOjE2ODYwNzU0MTQsImV4cCI6MTY4NzI4NTAxNH0.6yTss36DlPn-9fiDNU5B87s0SYthkfeYIH9d38-9bbw"

let inputDesc = document.getElementById("inputDesc")
let inputBrand = document.getElementById("inputBrand")
let inputPrice = document.getElementById("inputPrice")
let imgUrl = document.getElementById("imgUrl")
let inputName = document.getElementById("inputName")

//variabili per la modale PUT
let upDesc = document.getElementById("upDesc")
let upBrand = document.getElementById("upBrand")
let upPrice = document.getElementById("upPrice")
let upUrl = document.getElementById("upUrl")
let upName = document.getElementById("upName")


let addBtn = document.getElementById("addBtn")
let cardSection = document.getElementById("cardSection")
let resultBox = document.getElementById("result-box")

let myId = 0;

addBtn.addEventListener("click", addItems) //bottone 'Go! nella pagina Backoffice'

//funzione POST per creare gli elementi
async function addItems() {

    const payload = {
        "name": inputName.value,
        "description": inputDesc.value,
        "brand": inputBrand.value,
        "imageUrl": imgUrl.value,
        "price": inputPrice.value,
    }
    console.log(payload)
    try {
        const res = await fetch(endPointUrl, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                Authorization: token,
                "Content-Type": "application/json"

            }

        });
    } catch (error) {
        console.log(error);
    }
    checkLines();
    getProduct();
}

//funzione PUT per modificare gli elementi
async function updateItems() {

    const payload = {
        "name": upName.value,
        "description": upDesc.value,
        "brand": upBrand.value,
        "imageUrl": upUrl.value,
        "price": upPrice.value,
    }
    console.log(payload)
    try {
        const res = await fetch(endPointUrl + myId, {
            method: "PUT",
            body: JSON.stringify(payload),
            headers: {
                Authorization: token,
                "Content-Type": "application/json"

            }

        });
    } catch (error) {
        console.log(error);
    }
    checkLines();
    getProduct();
}

//funzione per richiamare gli elementi nei campi da modificare
async function showPost() {
    const res = await fetch(endPointUrl + activeId);
    const json = await res.json();
    // Riempio i campi degli input associati al post:
    nameInput.value = json.name;
    descInput.value = json.description;
    priceInput.value = json.price;
}

//funzione che richiama il prodotto singolo con ID (metodo GET)
async function singleProduct() {
    try {
        const res = await fetch(endPointUrl + myId, {
            headers:
                { Authorization: token }
        });
        const json = await res.json();
        
        upName.value = json.name
        upDesc.value = json.description
        upBrand.value = json.brand
        upPrice.value = json.price
        upUrl.value = json.imageUrl
        myData = json
    } catch (error) {
        console.log(error);
    }
}

//funzione che richiama tutti i prodotti inseriti GET
async function getProduct() {
    try {
        const res = await fetch(endPointUrl, {
            headers:
                { Authorization: token }
        });
        const json = await res.json();
        json.forEach(product => {
            createPost(product)
        });
        myData = json
    } catch (error) {
        console.log(error);
    }
}
getProduct();

// modale per l'Edit
const myModal = document.getElementById("modaleEdit");
function editModale(_id) {
    const bootstrapModal = new bootstrap.Modal(modaleEdit);
    myId = _id
    singleProduct()
    bootstrapModal.show();
    console.log(_id)
}

// funzione che aggiorna la lista degli items
function checkLines() {
   let tabella = document.getElementById("result-box")
    const length = tabella.children.length
    
    if (length > 0) {
        for (let index = 0; index < length; index++) {
            tabella.removeChild(tabella.children[0]);
        }   
    }
}

//funzione DELETE per eliminare gli elementi
async function delItems(idDeleted) {

    try {
        const res = await fetch(endPointUrl + idDeleted, {
            method: "DELETE",
            headers: {
                Authorization: token,
                "Content-Type": "application/json"

            }

        });
    } catch (error) {
        console.log(error);
    }
    checkLines();
    getProduct();
}

//funzione per creare elementi - "POST"
function createPost(product) {


    const riga = document.createElement('tr');
    riga.className = "lista"
    const nameProduct = document.createElement('td');
    nameProduct.innerText = product.name;

    const descProduct = document.createElement('td');
    descProduct.innerText = product.description;

    const brandProduct = document.createElement('td');
    brandProduct.innerText = product.brand;

    const priceProduct = document.createElement('td');
    priceProduct.innerText = product.price;

    const imageProduct = document.createElement('td');
    imageProduct.src = product.imageUrl;

    const actionsButton = document.createElement('td');

    const editBtn = document.createElement("button"); //creazione del bottone "Edit"
    editBtn.classList.add("btn", "btn-sm", "mx-1", "btn-primary");
    editBtn.onclick = () => editModale(product._id); //lettura dell'ID
    const editImg = document.createElement("i"); //creazione della icona matita nel bottone "Edit"
    editImg.classList.add("fa-solid", "fa-pencil", "me-1");
    const editTxt = document.createElement("span");
    editTxt.innerText = "Edit";
    editBtn.append(editImg, editTxt);
    

    const delBtn = document.createElement("button"); //creazione del bottone "Delete"
    delBtn.classList.add("btn", "btn-sm", "mx-1", "btn-danger");
    delBtn.onclick = () => delItems(product._id); //lettura dell'ID da eliminare
    const delImg = document.createElement("i"); //creazione icona cestino nel bottone "Delete"
    delImg.classList.add("fa-solid", "fa-trash", "me-1");
    const delTxt = document.createElement("span");
    delTxt.innerText = "Delete";
    delBtn.append(delImg, delTxt);

    actionsButton.append(editBtn, delBtn)
    resultBox.appendChild(riga);
    riga.append(nameProduct, descProduct, brandProduct, imageProduct, priceProduct, actionsButton)
}