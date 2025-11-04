// Load cart count on all pages
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || { items: [], total: 0 };
    const countSpan = document.getElementById("cart-count");
    if (countSpan) countSpan.innerText = cart.items.length;
}

// Load items on cart page
function loadCartPage() {
    let cart = JSON.parse(localStorage.getItem('cart')) || { items: [], total: 0 };

    const itemsDiv = document.getElementById("cart-items");
    const totalSpan = document.getElementById("cart-total");

    if (!itemsDiv || !totalSpan) return; // Not cart page

    itemsDiv.innerHTML = "";

    if (cart.items.length === 0) {
        itemsDiv.innerHTML = "<p>Your cart is empty.</p>";
        totalSpan.innerText = "0";
        updateCartCount();
        return;
    }

    cart.items.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "col-md-4";
        div.innerHTML = `
            <h4>${item.name}</h4>
            <p>Price: ${item.price} Rupees</p>
            <button onclick="removeItem(${index})" class="btn btn-danger btn-sm">Remove</button>
        `;
        itemsDiv.appendChild(div);
    });

    totalSpan.innerText = cart.total;
    updateCartCount();
}

// Remove item
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || { items: [], total: 0 };
    cart.total -= cart.items[index].price;
    cart.items.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCartPage();
}

// Run when page loads
window.onload = function () {
    updateCartCount();
    loadCartPage();
}