"use strict"

const logutBtn = document.getElementById("logoutbtn");
logutBtn.addEventListener("click", function () {
    localStorage.removeItem("authToken");
    window.location.href = "./home.html"
});