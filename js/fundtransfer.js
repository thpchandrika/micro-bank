window.onload = populateAccountsDropdown;

const accountDropdown = document.getElementById("fromAccountDdl");
const username = localStorage.getItem("username");
const form = document.getElementById("transferForm");
const token = localStorage.getItem("authToken");

async function populateAccountsDropdown() {
    const setting = {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    await fetch(`http://localhost:5000/accounts/getaccoountsbyusername?username=${username}`, setting)
        .then(async response => {
            if (response.ok) {
                return await response.json();
            } else {
                console.error(new Error(`HTTP error! Status: ${response.status}`));
            }
        }).then(data => {
            if (data.message) {
                console.error(data.message);
            } else {
                data.forEach((a) => {
                    const option = document.createElement("option");
                    option.value = a.accountNumber;
                    option.text = `${a.accountNumber} (${a.accountType})`;
                    accountDropdown.appendChild(option);
                })
            }
        }).catch(console.error);
}

form.addEventListener("submit", async e => {
    e.preventDefault();
    const toAccount = form.elements.toAccount.value;
    const amount = form.elements.amount.value;
    const note = form.elements.note.value;
    const fromAccountSelect = form.elements.fromAccountDdl;
    const fromAccount = fromAccountSelect.options[fromAccountSelect.selectedIndex].value;
    const username = localStorage.getItem("username");

    const setting = {
        method: "POST",
        body: JSON.stringify({ fromAccount, toAccount, amount, note, username }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }
    await fetch("http://localhost:5000/accounts/transferfunds", setting)
        .then(async response => {
            if (response.ok || response.status === 404 || response.status === 400) {
                return await response.json();
            }
            else {
                console.error(new Error(`HTTP error! Status: ${response.status}`));
            }
        }).then(data => {
            if (data.message) {
                alert(data.message);
            } else {
                alert("Amount transferred successfully");
                form.reset();
            }

        }).catch(console.error);
})