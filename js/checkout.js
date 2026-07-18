const summary = document.getElementById("order-summary");

const id = Number(localStorage.getItem("buyNowProduct"));

async function loadCheckout(){

    const response = await fetch("data/products.json");

    const products = await response.json();

    const product = products.find(p=>p.id===id);

    if(!product){

        summary.innerHTML="<h2>No Product Selected</h2>";

        return;

    }

    summary.innerHTML=`

    <div class="checkout-card">

        <img src="${product.image}" width="180">

        <h3>${product.name}</h3>

        <p>Brand : ${product.brand}</p>

        <p>Price : ₹${product.price}</p>

        <p>Stock : ${product.stock}</p>

    </div>

    `;

}

document.getElementById("checkout-form")
.addEventListener("submit",function(e){

    e.preventDefault();

    alert("Order Placed Successfully 🎉");

    localStorage.removeItem("buyNowProduct");

    window.location.href="index.html";

});

loadCheckout();