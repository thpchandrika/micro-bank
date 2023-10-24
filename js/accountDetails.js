window.onload = displayAccounts;

async function displayAccounts() {
    let response = await fetch("http://localhost:5000/accounts");
    let json;
    if (response.ok) {
        json = await response.json();
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
    for (let e of arguments) {
        let cell = document.createElement('td');
        cell.appendChild(document.createTextNode(e));
        row.appendChild(cell);
    }
    document.getElementById('tbodyAccountList').appendChild(row);
}