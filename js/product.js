const productContainer = document.getElementById("product-details");

const params = new URLSearchParams(window.location.search);
const productId = Number(params.get("id"));

async function loadProduct() {

    try {

        const response = await fetch("data/products.json");
        const products = await response.json();

        const product = products.find(p => p.id === productId);

        if (!product) {

            productContainer.innerHTML = "<h2>Product Not Found</h2>";
            return;

        }

        showProduct(product);

    } catch (err) {

        console.error(err);

    }

}

function showProduct(product) {

    productContainer.innerHTML = `

<div class="product-details-card">

    <div class="product-image">

        <img src="${product.image}" alt="${product.name}">

    </div>

    <div class="product-info">

        <h1>${product.name}</h1>

        <p><strong>Brand:</strong> ${product.brand}</p>

        <p><strong>Category:</strong> ${product.category}</p>

        <div class="rating">
            ⭐ ${product.rating}
            <span>(${product.reviews} Reviews)</span>
        </div>

        <h2 class="new-price">₹${product.price}</h2>

        <p class="old-price">₹${product.oldPrice}</p>

        <p>
            <strong>Stock:</strong>
            ${
                product.stock > 0
                ? '<span style="color:green;">In Stock</span>'
                : '<span style="color:red;">Out of Stock</span>'
            }
        </p>

        <p style="margin:20px 0;">
            ${product.description}
        </p>

        <button class="cart-btn"
        onclick="addToCart(${product.id})">

            Add to Cart

        </button>

        <button class="buy-btn"
        onclick="buyNow(${product.id})">

            Buy Now

        </button>

    </div>

</div>

`;

}

function addToCart(id){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const item = cart.find(p => p.id === id);

    if(item){

        item.qty++;

    }else{

        cart.push({
            id:id,
            qty:1
        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product Added Successfully");

}

function buyNow(id){

    localStorage.setItem("buyNowProduct", id);

    window.location.href = "checkout.html";

}

loadProduct();