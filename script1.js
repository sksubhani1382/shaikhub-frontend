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



// === PROFILE UI HANDLING ===
function applyAuthUI() {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("userName") || "Profile";

    const profileMenu = document.getElementById("profileMenu");
    const registerLink = document.getElementById("registerLink");
    const signInLink = document.getElementById("signInLink");
    const userNameSpan = document.getElementById("userName");

    if (!profileMenu || !registerLink || !signInLink || !userNameSpan) return;

    if (token) {
        profileMenu.style.display = "inline";
        registerLink.style.display = "none";
        signInLink.style.display = "none";
        userNameSpan.textContent = name;
    } else {
        profileMenu.style.display = "none";
        registerLink.style.display = "inline";
        signInLink.style.display = "inline";
    }
}

let profilePopupOpen = false;
function toggleProfilePopup() {
    const popup = document.getElementById("profilePopup");
    if (!popup) return;

    if (profilePopupOpen) {
        popup.style.display = "none";
        profilePopupOpen = false;
    } else {
        loadProfilePopup();
        popup.style.display = "block";
        profilePopupOpen = true;
    }
}

async function loadProfilePopup() {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
        const res = await fetch(`${backendBaseUrl}/api/user/profile`, {
            headers: { "Authorization": "Bearer " + token }
        });
        if (res.ok) {
            const user = await res.json();
            document.getElementById("popupName").textContent = user.name;
            document.getElementById("popupEmail").textContent = user.email;
            localStorage.setItem("userName", user.name);
            document.getElementById("userName").textContent = user.name;
        }
    } catch (err) {
        console.error("Error fetching user profile:", err);
    }
}

function logoutUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    alert("You have been logged out!");
    applyAuthUI();
    window.location.href = "Sign In.html";
}

window.addEventListener("click", function (e) {
    const popup = document.getElementById("profilePopup");
    const menu = document.getElementById("profileMenu");
    if (!popup || !menu) return;
    if (profilePopupOpen && !popup.contains(e.target) && !menu.contains(e.target)) {
        popup.style.display = "none";
        profilePopupOpen = false;
    }
});

document.addEventListener("DOMContentLoaded", applyAuthUI);
