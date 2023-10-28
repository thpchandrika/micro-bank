"use strict";

window.onload = loadAccountDetails;

const logutBtn = document.getElementById("logoutbtn");
logutBtn.addEventListener("click", function () {
    localStorage.removeItem("authToken");
    window.location.href = "./home.html"
});

async function loadAccountDetails() {
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("authToken");

    const setting = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }

    await fetch(`http://localhost:5000/accounts/getaccoountsbyusername?username=${username}`, setting)
        .then(async response => {
            if (response.ok) {
                return await response.json();
            }
            else {
                console.error(new Error(`HTTP error! Status: ${response.status}`));
            }
        }).then(data => {
            if (data) {
                data.forEach(account => {
                    const card = document.createElement('div');
                    card.classList.add('card');

                    card.innerHTML = `
                        <div class="card-header">
                        <h3>${account.accountType}</h3>
                        </div>
                        <div class="card-body">
                            <p class="card-text"><span class="fw-bold">Account Holder:</span> ${account.accountHolder}</p>
                            <p class="card-text"><span class="fw-bold">Account Number:</span> ${account.accountNumber}</p>
                            <p class="card-text"><span class="fw-bold">Balance:</span> 
                            ${account.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
                        </div>
                    `;
                    cardContainer.appendChild(card);
                })
            }
        }).catch(console.error);
}
