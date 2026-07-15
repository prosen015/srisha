const wishlistList = document.getElementById("wishlist-list");

let products = [];
let wishlist = [];

async function loadWishlist() {

    try {

        const response = await fetch("data/products.json");

        products = await response.json();

        wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

        renderWishlist();

    } catch (error) {

        console.error(error);

    }

}

function renderWishlist() {

    wishlistList.innerHTML = "";

    if (wishlist.length === 0) {

        wishlistList.innerHTML = `
            <h2 style="text-align:center;width:100%;padding:40px;">
                ❤️ Your Wishlist is Empty
            </h2>
        `;

        return;

    }

    wishlist.forEach(id => {

        const product = products.find(p => p.id === id);

        if (!product) return;

        wishlistList.innerHTML += `

        <div class="product-card">

            <img src="${product.image}" alt="${product.name}">

            <h3>${product.name}</h3>

            <div class="rating">
                ⭐ ${product.rating}
                <span>(${product.reviews})</span>
            </div>

            <div class="price">
                <span class="new-price">₹${product.price}</span>
                <span class="old-price">₹${product.oldPrice}</span>
            </div>

            <button class="cart-btn"
            onclick="addToCart(${product.id})">

            Add To Cart

            </button>

            <button class="cart-btn"
            onclick="removeWishlist(${product.id})"
            style="background:#e53935; margin-top:10px;">

            Remove

            </button>

        </div>

        `;

    });

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

    alert("Added to Cart");

}

function removeWishlist(id){

    wishlist = wishlist.filter(item => item !== id);

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    renderWishlist();

}

loadWishlist();