(function () {
    // --- 1) Build the navbar HTML once ---
    const navHTML = `
  <nav id="site-nav">
    <ul class="nav-left">
      <li><a href="Home.html">Home</a></li>
      <li><a href="About Us.html">About Us</a></li>
      <li><a href="Contact Us.html">Contact Us</a></li>
    </ul>
    <ul class="nav-right">
      <li id="guestLinks">
        <a href="Registration.html">Registration</a>
        <a href="Sign In.html">Sign In</a>
      </li>
      <li><a href="Cart.html">Cart (<span id="cart-count">0</span>)</a></li>

      <li id="profileMenu" style="display:none; position:relative;">
        <a href="#" id="profileToggle">👤 <span id="userName">Profile</span></a>
        <div id="profilePopup" class="profile-popup" style="display:none;">
          <div class="profile-content">
            <h4>👤 <span id="popupName"></span></h4>
            <p>Username: <span id="popupUser"></span></p>
            <p>Email: <span id="popupEmail"></span></p>
            <button id="logoutBtn" class="btn btn-danger btn-sm">Logout</button>
          </div>
        </div>
      </li>
    </ul>
  </nav>
  `;

    // Inject navbar into placeholder
    const host = document.getElementById("nav-root");
    if (host) host.innerHTML = navHTML;

    // --- Helpers for cart + login state ---
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem("cart")) || { items: [] };
        const span = document.getElementById("cart-count");
        if (span) span.innerText = cart.items.length;
    }

    function applyAuthToNav() {
        const token = localStorage.getItem("token");
        const name = localStorage.getItem("username");
        const email = localStorage.getItem("email");

        const guestLinks = document.getElementById("guestLinks");
        const profileMenu = document.getElementById("profileMenu");
        const userName = document.getElementById("userName");
        const popupName = document.getElementById("popupName");
        const popupUser = document.getElementById("popupUser");
        const popupEmail = document.getElementById("popupEmail");

        if (token && name) {
            guestLinks.style.display = "none";
            profileMenu.style.display = "inline-block";
            userName.textContent = name;
            popupName.textContent = name;
            popupUser.textContent = name;
            popupEmail.textContent = email || "";
        } else {
            guestLinks.style.display = "inline-block";
            profileMenu.style.display = "none";
        }
    }

    // --- Popup and Logout ---
    document.addEventListener("click", (e) => {
        const toggle = document.getElementById("profileToggle");
        const popup = document.getElementById("profilePopup");
        if (!toggle || !popup) return;

        if (toggle.contains(e.target)) {
            e.preventDefault();
            popup.style.display = popup.style.display === "block" ? "none" : "block";
        } else if (!popup.contains(e.target)) {
            popup.style.display = "none";
        }
    });

    document.addEventListener("click", (e) => {
        if (e.target.id === "logoutBtn") {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            localStorage.removeItem("email");
            applyAuthToNav();
            window.location.href = "Sign In.html";
        }
    });

    updateCartCount();
    applyAuthToNav();
})();
