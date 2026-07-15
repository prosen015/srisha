const productList = document.getElementById("product-list");
const searchInput = document.getElementById("search-input");

let allProducts = [];

// =======================
// Load Products
// =======================

async function loadProducts() {

    try {

        const response = await fetch("data/products.json");

        allProducts = await response.json();

        displayProducts(allProducts);

    } catch (error) {

        console.error("Products load failed:", error);

    }

}

// =======================
// Display Products
// =======================

function displayProducts(products) {

    productList.innerHTML = "";

    products.forEach(product => {

        productList.innerHTML += `

        <div class="product-card">

            <span class="badge">-${product.discount}%</span>

            <button
class="wishlist-btn"
onclick="toggleWishlist(${product.id})">

<i class="${
(JSON.parse(localStorage.getItem('wishlist')) || []).includes(product.id)
? 'fa-solid'
: 'fa-regular'
} fa-heart"></i>

</button>

            <a href="product.html?id=${product.id}">
                <img src="${product.image}" alt="${product.name}">
            </a>

            <h3>
                <a href="product.html?id=${product.id}">
                    ${product.name}
                </a>
            </h3>

            <div class="rating">
                ⭐ ${product.rating}
                <span>(${product.reviews})</span>
            </div>

            <div class="price">
                <span class="new-price">₹${product.price}</span>
                <span class="old-price">₹${product.oldPrice}</span>
            </div>

            <button class="cart-btn" onclick="addToCart(${product.id})">
                Add to Cart
            </button>

        </div>

        `;

    });

}

// =======================
// Add To Cart
// =======================

function addToCart(id) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const item = cart.find(product => product.id === id);

    if (item) {

        item.qty++;

    } else {

        cart.push({
            id: id,
            qty: 1
        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

}

// =======================
// Cart Counter
// =======================

function updateCartCount() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    cart.forEach(item => {

        total += item.qty || 1;

    });

    const count = document.getElementById("cart-count");

    if (count) {

        count.textContent = total;

    }

}

// =======================
// Live Search
// =======================

if (searchInput) {

    searchInput.addEventListener("input", function () {

        const keyword = this.value.toLowerCase().trim();

        if (keyword === "") {

            displayProducts(allProducts);
            return;

        }

        const filtered = allProducts.filter(product =>
            product.name.toLowerCase().includes(keyword)
        );

        displayProducts(filtered);

    });

}

// =======================
// Start
// =======================

loadProducts();

const categoryButtons = document.querySelectorAll(".category-card");

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        const category = button.dataset.category;

        if (category === "All") {

            displayProducts(allProducts);

            return;

        }

        const filtered = allProducts.filter(product =>
            product.category === category
        );

        displayProducts(filtered);

    });

});

updateWishlistCount();
updateCartCount();
function updateWishlistCount(){

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const count = document.getElementById("wishlist-count");

    if(count){

        count.textContent = wishlist.length;

    }

}

function addToWishlist(id){

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if(!wishlist.includes(id)){

        wishlist.push(id);

        localStorage.setItem("wishlist", JSON.stringify(wishlist));

        alert("Added to Wishlist ❤️");

    }

    updateWishlistCount();

}

function toggleWishlist(id){

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if(wishlist.includes(id)){

        wishlist = wishlist.filter(item => item !== id);

    }else{

        wishlist.push(id);

    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    updateWishlistCount();

    displayProducts(allProducts);

}