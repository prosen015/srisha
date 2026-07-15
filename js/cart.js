const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");

let products = [];
let cart = [];

async function loadCart() {

    try {

        const response = await fetch("data/products.json");
        products = await response.json();

        cart = JSON.parse(localStorage.getItem("cart")) || [];

        renderCart();

    } catch (err) {

        console.error(err);

    }

}

function renderCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <h2 style="text-align:center;padding:40px">
                Your cart is empty
            </h2>
        `;

        totalPrice.innerHTML = "Total : ₹0";

        return;
    }

    let total = 0;

    cart.forEach((item,index)=>{

        const product = products.find(p=>p.id===item.id);

        if(!product) return;

        const subtotal = product.price * item.qty;

        total += subtotal;

        cartItems.innerHTML += `

<div class="product-card">

<img src="${product.image}" alt="${product.name}">

<h3>${product.name}</h3>

<div class="rating">
⭐ ${product.rating}
<span>(${product.reviews})</span>
</div>

<div class="price">

<span class="new-price">₹${product.price}</span>

</div>

<div class="qty-box">

<button onclick="decreaseQty(${index})">−</button>

<span>${item.qty}</span>

<button onclick="increaseQty(${index})">+</button>

</div>

<h4 style="padding:10px 15px;">
Subtotal : ₹${subtotal}
</h4>

<button class="cart-btn"
onclick="removeItem(${index})">

Remove

</button>

</div>

`;

    });

    totalPrice.innerHTML = `Total : ₹${total}`;

}

// =========================
// Increase Quantity
// =========================
function increaseQty(index){

    cart[index].qty++;

    saveCart();

}

// =========================
// Decrease Quantity
// =========================
function decreaseQty(index){

    if(cart[index].qty > 1){

        cart[index].qty--;

    }else{

        cart.splice(index,1);

    }

    saveCart();

}

// =========================
// Remove Item
// =========================
function removeItem(index){

    cart.splice(index,1);

    saveCart();

}

// =========================
// Save Cart
// =========================
function saveCart(){

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    renderCart();

}

// =========================
// Update Cart Count
// =========================
function updateCartCount(){

    let total = 0;

    cart.forEach(item => {

        total += item.qty;

    });

    const count = document.getElementById("cart-count");

    if(count){

        count.textContent = total;

    }

}

// =========================
// Start
// =========================
loadCart();