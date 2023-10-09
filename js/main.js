// SELECT ELEMENTS
const productsCont = document.querySelector(".products-container");
const cartItemsLi = document.querySelector(".cart-items");
const total = document.querySelector(".subtotal");
const cartPopUp = document.querySelector(".cart");
const closeBtn = document.querySelector(".close-icon");
const cardIcon = document.getElementsByClassName("card-icon");

// OPEN CART
 function openCart() {
    cartPopUp.classList.add('open');
 }
// CLOSE CART
closeBtn.addEventListener("click", () => {
    cartPopUp.classList.add("close");
    cartPopUp.classList.remove("open");
})

// RENDER PRODUCTS
function renderProducts() {
    products.forEach((product) => {

        productsCont.innerHTML += `<div class="product-card">
        <div class="card-img">
            <img src="${product.imgSrc}">
        </div>
        <div class="products-text">
            <div class="product-title">${product.name}</div>
            <div class="product-price">${product.price} €</div>
            <div class="product-icons">
                <div onclick = "addToCart(${product.id}); openCart()"><i class="fa-solid fa-cart-arrow-down card-icon"></i></div>
                <div class="fav-icon"><i class="fa-solid fa-heart"></i></div>
            </div>
        </div>
    </div>`
      
    })
}

renderProducts();

// CART ARRAY
let cart = [];

// ADD TO CART
function addToCart(id) {
    if (cart.some((el) => el.id) === id) {
        changeQuantity("plus", id);
    } else {
    let item = products.find((el) => el.id === id);
    cart.push({
        ...item,
        numberOfUnits: 1,
    });
    }

   updateCart(); 
}

// UPDATE CART
function updateCart() {
    renderCartItems();
    renderSubtotal();
}

// CALCULATE AND RENDER SUBTOTAL
function renderSubtotal() {
    let totalPrice = 0, totalItems = 0;

    cart.forEach((el) => {
        totalPrice += el.price * el.numberOfUnits;
        totalItems += el.numberOfUnits;
    })
    total.innerHTML = `Subtotal ${totalItems} items: ${totalPrice} €`;
  
}

function renderCartItems() {
    // clear cart elements
    cartItemsLi.innerHTML = ""; 
    cart.forEach((el) => {
        cartItemsLi.innerHTML += `<div class="cart-item">
        <div class="item-info">
            <div class="item-info-img"><img src="${el.imgSrc}" alt=""></div>
            <h4 class="item-info-text">${el.name}</h4>
        </div>
        <div class="unit-price">
            <p>${el.price} €</p>
        </div>
        <div class="units">
            <div class="minus-btn" onclick = "changeQuantity('minus', ${el.id})">-</div>
            <div class="number">${el.numberOfUnits}</div>
            <div class="plus-btn" onclick = "changeQuantity('plus', ${el.id})">+</div>
        </div>
    </div>`
    })
}

// CHANGE QUANTITY OF ITEMS
function changeQuantity(action, id) {
    cart = cart.map((el) => {
        let numberOfUnits = el.numberOfUnits;
        if (el.id === id) {
            if (action === "minus" && numberOfUnits > 1) {
                numberOfUnits--;
            }else if (action === "plus" && numberOfUnits < el.instock) {
                numberOfUnits++;
            }
        }
        return {
            ...el,
            numberOfUnits,
        };
    });
    updateCart();
}

