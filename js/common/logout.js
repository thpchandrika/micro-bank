const logoutbtn = document.getElementById("logoutbtn");
logoutbtn.addEventListener("click", function () {
    localStorage.removeItem("authToken");
    window.location.href = "./home.html"
});