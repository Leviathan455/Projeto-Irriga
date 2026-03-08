document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener("submit", async (e) => {

            e.preventDefault();

            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            const response = await fetch("http://localhost:3000/auth/login", {

                method: "POST",
                headers: { "Content-Type": "application/json" },

                body: JSON.stringify({
                    username,
                    password
                })

            });

            const data = await response.json();

            if (data.token) {

                localStorage.setItem("token", data.token);

                window.location.href = "./dashboard.html";

            } else {

                document.getElementById("error").innerText = data.error;

            }

        });

    }

    const registerForm = document.getElementById("registerForm");

    if (registerForm) {

        registerForm.addEventListener("submit", async (e) => {

            e.preventDefault();

            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            const response = await fetch("http://localhost:3000/auth/register", {

                method: "POST",
                headers: { "Content-Type": "application/json" },

                body: JSON.stringify({
                    username,
                    password
                })

            });

            const data = await response.json();

            if (data.id) {

                window.location.href = "./login.html";

            } else {

                document.getElementById("error").innerText = data.error;

            }

        });

    }

});

function logout() {

    localStorage.removeItem("token");

    window.location.href = "./login.html";

}