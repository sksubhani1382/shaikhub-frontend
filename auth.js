// BACKEND URL (Render)
const backendBaseUrl = "https://shaikhub-backend.onrender.com";

// ---------------- REGISTER FUNCTION ----------------
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
        const response = await fetch(`${backendBaseUrl}/api/auth/register`, {
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
        alert("⚠️ Backend not reachable.");
        console.error("Register Error:", err);
    }
}


// ---------------- LOGIN FUNCTION ----------------
async function loginUser() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("⚠️ Please enter both email and password!");
        return;
    }

    try {
        const response = await fetch(`${backendBaseUrl}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert("✅ Login Successful!");
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.name);
            localStorage.setItem("email", data.email);

            window.location.href = "Home.html";
        } else {
            alert(`❌ Invalid credentials: ${data.error || data.message}`);
        }
    } catch (err) {
        alert("⚠️ Backend not reachable.");
        console.error(err);
    }
}
