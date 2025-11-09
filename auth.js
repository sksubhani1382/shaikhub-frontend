// ---- REGISTER FUNCTION ----
async function registerUser(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const mobile = document.getElementById("mobile")?.value.trim() || "";
    const password = document.getElementById("password").value.trim();

    if (!name || !email || !mobile || !password) {
        alert("⚠️ Please fill in all fields!");
        return;
    }

    try {

        // ---- REGISTER FUNCTION ----
        const response = await fetch("https://sksshophub-backend.onrender.com/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, mobile, password })
        });


        const data = await response.json();

        if (response.ok) {
            alert("✅ Registered Successfully!");
            window.location.href = "Sign In.html";
        } else {
            alert("❌ " + (data.error || data.message || "Registration failed"));
        }
    } catch (err) {
        alert("⚠️ Backend not reachable. Please check your Spring Boot app.");
        console.error("Register Error:", err);
    }
}



// ================= GLOBAL LOGIN HANDLER =================
document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");

    const profileMenu = document.getElementById("profileMenu");
    const popupName = document.getElementById("popupName");
    const popupEmail = document.getElementById("popupEmail");

    // Show or hide profile menu
    if (token && username) {
        if (profileMenu) {
            profileMenu.style.display = "inline";
            document.getElementById("userName").innerText = username;
        }
        if (popupName && popupEmail) {
            popupName.innerText = username;
            popupEmail.innerText = username; // show username instead of email
        }
    } else {
        if (profileMenu) profileMenu.style.display = "none";
    }
});



// ================= LOGIN SUCCESS HANDLER =================
async function loginUser() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("⚠️ Please enter both email and password!");
        return;
    }

    try {
        // ---- LOGIN FUNCTION ----
        const response = await fetch("https://sksshophub-backend.onrender.com/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });


        const data = await response.json();

        if (response.ok) {
            alert("✅ Login Successful!");
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.name);
            localStorage.setItem("email", data.email);
            window.location.href = "https://sksubhani1382.github.io/sksshophub/Home.html";

        } else {
            alert(`❌ Invalid credentials: ${data.error || data.message || "Please check email or password"}`);
        }
    } catch (error) {
        alert("⚠️ Server error: " + error.message);
        console.error("Login Error:", error);
    }
}


// ================= LOGOUT FUNCTION =================
function logoutUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    alert("👋 You have been logged out successfully.");
    window.location.href = "Sign In.html";
}
