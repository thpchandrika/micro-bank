window.onload = displayAccounts;

async function displayAccounts() {
    const username = localStorage.getItem("username");
    let response = await fetch(`http://localhost:5000/accounts/getaccoountsbyusername?username=${username}`);
    let json;
    if (response.ok) {
        json = await response.json();
        console.log(json);
        document.getElementById('tbodyAccountList').innerHTML = "";
        for (let a of json) {
            addRowToTable(a.accountNumber, a.accountHolder, a.accountType, a.balance);
        }
    }
    else alert("Error" + response.status);
}

function addRowToTable(accountNumber, accountHolder, accountType, balance) {
    let row = document.createElement('tr');
    row.setAttribute("id", accountNumber);
    for (let i = 0; i < arguments.length; i++) {
        let cell = document.createElement('td');
        if (i === 3) {
            arguments[i] = arguments[i].toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        }
        cell.appendChild(document.createTextNode(arguments[i]));
        row.appendChild(cell);
    }
    document.getElementById('tbodyAccountList').appendChild(row);
}