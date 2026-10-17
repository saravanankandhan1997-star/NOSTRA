// NOSTRA - Beginner JavaScript Project
 
// 1. Product details
 
const products = [

    {

        id: "n201",

        name: "Everyday Beige Top",

        category: "Women",

        type: "Casual wear",

        price: 699,

        image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80"

    },

    {

        id: "n202",

        name: "Classic Cotton Tee",

        category: "Men",

        type: "Everyday casual",

        price: 499,

        image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=600&q=80"

    },

    {

        id: "n203",

        name: "Floral Day Dress",

        category: "Women",

        type: "Day wear",

        price: 1199,

        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80"

    },

    {

        id: "n204",

        name: "Relaxed Casual Shirt",

        category: "Men",

        type: "Casual wear",

        price: 899,

        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=600&q=80"

    },

    {

        id: "n205",

        name: "Soft Neutral Jacket",

        category: "Women",

        type: "Smart casual",

        price: 1499,

        image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=600&q=80"

    },

    {

        id: "n206",

        name: "Weekend Denim Jacket",

        category: "Men",

        type: "Weekend wear",

        price: 1599,

        image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=600&q=80"

    },

    {

        id: "n207",

        name: "Soft Everyday Blouse",

        category: "Women",

        type: "Everyday style",

        price: 799,

        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80"

    },

    {

        id: "n208",

        name: "Classic Smart Jacket",

        category: "Men",

        type: "Smart casual",

        price: 1799,

        image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=600&q=80"

    }

];
 
 
// Different storage name for this version of NOSTRA.
 
const cartName = "nostraBeigeCart";
 
 
// 2. Get the saved shopping cart.
 
function getCart() {

    try {

        return JSON.parse(localStorage.getItem(cartName)) || [];

    } catch (error) {

        return [];

    }

}
 
 
// 3. Save the cart and refresh the display.
 
function saveCart(cart) {

    localStorage.setItem(cartName, JSON.stringify(cart));
 
    showCartCount();

    displayCart();

}
 
 
// 4. Create one product card.
 
function makeProductCard(product) {

    return `
<div class="product-card">
<img src="${product.image}" alt="${product.name}" loading="lazy">
 
            <div class="product-details">
<p class="product-category">

                    ${product.category} | ${product.type}
</p>
 
                <h3>${product.name}</h3>
 
                <p class="product-price">₹${product.price}</p>
 
                <button

                    class="add-to-cart"

                    data-product-id="${product.id}"
>

                    ♡ Add to Bag
</button>
</div>
</div>

    `;

}
 
 
// 5. Show four featured products on the Home page.
 
function showHomeProducts() {

    const homeContainer = document.getElementById("home-products");
 
    if (homeContainer === null) {

        return;

    }
 
    homeContainer.innerHTML = "";
 
    for (let i = 0; i < 4; i++) {

        homeContainer.innerHTML += makeProductCard(products[i]);

    }

}
 
 
// 6. Search, filter and sort products.
 
function showAllProducts() {

    const productContainer = document.getElementById("all-products");
 
    if (productContainer === null) {

        return;

    }
 
    const searchText =

        document.getElementById("search-input").value.toLowerCase();
 
    const category =

        document.getElementById("category-filter").value;
 
    const sortValue =

        document.getElementById("sort-filter").value;
 
    // Keep products that match the search and category.
 
    let filteredProducts = products.filter(function (product) {

        const nameMatches =

            product.name.toLowerCase().includes(searchText);
 
        const categoryMatches =

            category === "All" || product.category === category;
 
        return nameMatches && categoryMatches;

    });
 
    // Sort by price.
 
    if (sortValue === "low") {

        filteredProducts.sort(function (a, b) {

            return a.price - b.price;

        });

    }
 
    if (sortValue === "high") {

        filteredProducts.sort(function (a, b) {

            return b.price - a.price;

        });

    }
 
    // Display products.
 
    productContainer.innerHTML = "";
 
    filteredProducts.forEach(function (product) {

        productContainer.innerHTML += makeProductCard(product);

    });
 
    document.getElementById("results-count").textContent =

        "Showing " + filteredProducts.length + " products";
 
    // Show a message if no products match.
 
    const noResults = document.getElementById("no-results");
 
    if (filteredProducts.length === 0) {

        noResults.classList.remove("hidden");

    } else {

        noResults.classList.add("hidden");

    }

}
 
 
// 7. Set up the search and filter controls.
 
function setupFilters() {

    const searchInput = document.getElementById("search-input");

    const categoryFilter = document.getElementById("category-filter");

    const sortFilter = document.getElementById("sort-filter");

    const clearButton = document.getElementById("clear-filters");
 
    // These controls only exist on the Collections page.
 
    if (searchInput === null) {

        return;

    }
 
    searchInput.addEventListener("input", showAllProducts);

    categoryFilter.addEventListener("change", showAllProducts);

    sortFilter.addEventListener("change", showAllProducts);
 
    // Read the category from the link clicked on the Home page.
 
    const url = new URLSearchParams(window.location.search);

    const selectedCategory = url.get("category");
 
    if (selectedCategory === "Men" || selectedCategory === "Women") {

        categoryFilter.value = selectedCategory;

    }
 
    // Reset all filters.
 
    clearButton.addEventListener("click", function () {

        searchInput.value = "";

        categoryFilter.value = "All";

        sortFilter.value = "default";
 
        showAllProducts();

    });
 
    showAllProducts();

}
 
 
// 8. Add a product to the cart.
 
function addToCart(productId) {

    const cart = getCart();
 
    const existingItem = cart.find(function (item) {

        return item.id === productId;

    });
 
    if (existingItem) {

        existingItem.quantity = existingItem.quantity + 1;

    } else {

        cart.push({

            id: productId,

            quantity: 1

        });

    }
 
    saveCart(cart);
 
    alert("Added to your NOSTRA bag!");

}
 
 
// 9. Show the number of items in the bag.
 
function showCartCount() {

    const cart = getCart();
 
    let count = 0;
 
    cart.forEach(function (item) {

        count = count + item.quantity;

    });
 
    const countElement = document.getElementById("cart-count");
 
    if (countElement !== null) {

        countElement.textContent = count;

    }

}
 
 
// 10. Display shopping bag items.
 
function displayCart() {

    const cartContainer = document.getElementById("cart-items");
 
    if (cartContainer === null) {

        return;

    }
 
    const cart = getCart();
 
    cartContainer.innerHTML = "";
 
    let total = 0;
 
    cart.forEach(function (item) {

        // Find the matching product by its ID.
 
        const product = products.find(function (p) {

            return p.id === item.id;

        });
 
        if (product === undefined) {

            return;

        }
 
        total = total + product.price * item.quantity;
 
        // The card and cart use the same product image URL.
 
        cartContainer.innerHTML += `
<div class="cart-item">
<img src="${product.image}" alt="${product.name}">
 
                <div class="cart-item-details">
<h3>${product.name}</h3>
<p>₹${product.price}</p>
 
                    <button

                        class="quantity-button"

                        data-action="minus"

                        data-id="${product.id}"
>−</button>
 
                    <span>${item.quantity}</span>
 
                    <button

                        class="quantity-button"

                        data-action="plus"

                        data-id="${product.id}"
>+</button>
 
                    <br>
 
                    <button

                        class="remove-button"

                        data-action="remove"

                        data-id="${product.id}"
>Remove</button>
</div>
</div>

        `;

    });
 
    document.getElementById("cart-total").textContent = "₹" + total;
 
    const emptyMessage = document.getElementById("empty-cart");
 
    if (cart.length === 0) {

        emptyMessage.classList.remove("hidden");

    } else {

        emptyMessage.classList.add("hidden");

    }

}
 
 
// 11. Open and close the shopping bag.
 
function openCart() {

    document.getElementById("cartOverlay").classList.remove("hidden");

    displayCart();

}
 
function closeCart() {

    document.getElementById("cartOverlay").classList.add("hidden");

}
 
 
// 12. Handle the buttons.
 
document.addEventListener("click", function (event) {

    const addButton = event.target.closest(".add-to-cart");
 
    if (addButton) {

        addToCart(addButton.dataset.productId);

        return;

    }
 
    if (event.target.closest("#openCart")) {

        openCart();

        return;

    }
 
    if (

        event.target.closest("#closeCart") ||

        event.target.id === "cartOverlay"

    ) {

        closeCart();

        return;

    }
 
    const cartButton = event.target.closest("[data-action]");
 
    if (cartButton) {

        const action = cartButton.dataset.action;

        const productId = cartButton.dataset.id;
 
        let cart = getCart();
 
        // Remove a product.
 
        if (action === "remove") {

            cart = cart.filter(function (item) {

                return item.id !== productId;

            });

        }
 
        // Increase quantity.
 
        if (action === "plus") {

            cart.forEach(function (item) {

                if (item.id === productId) {

                    item.quantity = item.quantity + 1;

                }

            });

        }
 
        // Decrease quantity.
 
        if (action === "minus") {

            cart.forEach(function (item) {

                if (item.id === productId) {

                    item.quantity = item.quantity - 1;

                }

            });
 
            cart = cart.filter(function (item) {

                return item.quantity > 0;

            });

        }
 
        saveCart(cart);

    }

});
 
 
// 13. Simple demo checkout.
 
const checkoutButton = document.getElementById("checkout-button");
 
if (checkoutButton !== null) {

    checkoutButton.addEventListener("click", function () {

        const cart = getCart();
 
        if (cart.length === 0) {

            alert("Your shopping bag is empty!");

        } else {

            alert("Thank you for shopping with NOSTRA! Demo order completed.");
 
            saveCart([]);

            closeCart();

        }

    });

}
 
 
// 14. Contact form demo.
 
const contactForm = document.getElementById("contact-form");
 
if (contactForm !== null) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();
 
        document.getElementById("contact-message").textContent =

            "Thank you! Your demo message has been submitted.";
 
        contactForm.reset();

    });

}
 
 
// 15. Newsletter form demo.
 
const newsletterForm = document.getElementById("newsletter-form");
 
if (newsletterForm !== null) {

    newsletterForm.addEventListener("submit", function (event) {

        event.preventDefault();
 
        document.getElementById("newsletter-message").textContent =

            "Thank you for joining NOSTRA! (Demo only)";
 
        newsletterForm.reset();

    });

}
 
 
// 16. Start the website.
 
showHomeProducts();

setupFilters();

showCartCount();

displayCart();
 