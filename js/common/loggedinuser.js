const loggedInUserName = localStorage.getItem("username");
const loggedInUserSpan = document.getElementById("loggedInUser");
loggedInUserSpan.classList.add("text-lg");
loggedInUserSpan.classList.add("text-info-lg");
loggedInUserSpan.textContent = `Welcome, ${loggedInUserName}`;