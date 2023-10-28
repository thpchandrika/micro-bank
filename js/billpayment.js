window.onload = populateAccountsDropdown;

const accountDropdown = document.getElementById("fromAccountDdl");
const accountDropdownUtility = document.getElementById("fromAccountUtilityDdl");
const username = localStorage.getItem("username");
const token = localStorage.getItem("authToken");
const form = document.getElementById('creditCardPaymentForm');
const formUtility = document.getElementById('utilityPaymentForm');

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

                    const option1 = document.createElement("option");
                    option1.value = a.accountNumber;
                    option1.text = `${a.accountNumber} (${a.accountType})`;
                    accountDropdownUtility.appendChild(option1);
                })
            }
        }).catch(console.error);
}

form.addEventListener('submit', async e => {
    e.preventDefault();
    const fromAccount = form.elements.fromAccountDdl.value;
    const toCreditCard = form.elements.toCreditCard.value;
    const creditCardVendor = form.elements.creditCardVendor.value;
    const amount = form.elements.amount.value;
    const note = form.elements.note.value;

    const data = JSON.stringify({ fromAccount, toCreditCard, creditCardVendor, amount, note, username });
    const accountOptions = {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${token}`
        }
    }
    await fetch("http://localhost:5000/accounts/creditpayment", accountOptions)
        .then(response => {
            if (response.ok || response.status === 401 || response.status === 400 || response.status === 404) {
                return response.json();
            } else {
                alert(new Error(`HTTP error! Status: ${response.status}`));
            }
        })
        .then(data => {
            console.log(data);
            if (data.message) {
                alert(data.message);
                document.getElementById("creditPaymentModal").classList.add("show");
            } else {
                alert(`Payment to credit card ${toCreditCard} successful.`);
                form.reset();
            }
        })
        .catch(error => {
            console.error("Error in payment" + error);
        })
})

formUtility.addEventListener('submit', async e => {
    e.preventDefault();
    const utilityCompany = formUtility.elements.utilityCompany.value;
    const fromAccountUtility = formUtility.elements.fromAccountUtilityDdl.value;
    const amountUtility = formUtility.elements.amountUtility.value;
    const notesUtility = formUtility.elements.notesUtility.value;
    const utilityUserId = formUtility.elements.utilityUserId.value;

    const data = JSON.stringify({ utilityCompany, fromAccountUtility, amountUtility, notesUtility, username, utilityUserId });
    const accountOptions = {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${token}`
        }
    }
    await fetch("http://localhost:5000/accounts/utilitypayment", accountOptions)
        .then(response => {
            if (response.ok || response.status === 401 || response.status === 400
                || response.status === 404 || response.status === 500) {
                return response.json();
            } else {
                alert(new Error(`HTTP error! Status: ${response.status}`));
            }
        })
        .then(data => {
            if (data.message) {
                alert(data.message);
                document.getElementById("utilityPaymentModal").classList.add("show");
            } else {
                alert(`Payment to utility ${utilityCompany} successful.`);
                formUtility.reset();
            }
        })
        .catch(error => {
            console.error("Error making payment" + error);
        })
})








