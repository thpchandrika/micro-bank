"use strict"

const form = document.getElementById("loginform");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("loginemail").value;
    const password = document.getElementById("loginpassword").value;

    const loginOptions = {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
            "Content-Type": 'application/json'
        }
    }
    await fetch("http://localhost:5000/users/login", loginOptions)
        .then(response => response.json())
        .then(data => {
            if (data.token && data.username) {
                localStorage.setItem("authToken", data.token);
                localStorage.setItem("username", data.username);
                window.location.href = "./dashboard.html";
            } else {
                alert("Login failed! Check your credentials.")
            }
        })
        .catch(error => console.error("Error: " + error));
})