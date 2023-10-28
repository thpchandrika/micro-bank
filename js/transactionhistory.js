window.onload = displayTransactions;

const form = document.getElementById("transferForm");
const token = localStorage.getItem("authToken");
const searchForm = document.getElementById("filterForm");
const username = localStorage.getItem("username");

async function displayTransactions() {
    let response = await fetch(`http://localhost:5000/accounts/transactionhistorybyusername?username=${username}`);
    let json;
    if (response.ok) {
        json = await response.json();
        console.log("history", json);
        document.getElementById('transactionHistoryList').innerHTML = "";
        for (let a of json) {
            addRowToTable(a.id, a.date, a.description, a.amount, a.balance, a.transactionAccount, a.transactionType);
        }
    }
    else alert("Error" + response.status);
}

function addRowToTable(id, date, description, amount, balance, transactionhistory, transactionType) {
    let row = document.createElement('tr');
    row.setAttribute("id", id);
    for (i = 0; i < arguments.length - 1; i++) {
        let cell = document.createElement('td');
        if (i === 3 || i === 4) {
            arguments[i] = arguments[i].toLocaleString('en-US',
                { style: 'currency', currency: 'USD' });
        }
        if (arguments[i] < 0) {
            arguments[i] = "-" + arguments[i];
        }
        cell.appendChild(document.createTextNode(arguments[i]));
        if (transactionType === "DEPOSIT" && i === 3) {
            cell.classList.add("text-success");
        } else if (transactionType === "WITHDRAWAL" && i === 3) {
            cell.classList.add("text-danger");
        }
        row.appendChild(cell);
    }
    document.getElementById('transactionHistoryList').appendChild(row);
}

searchForm.addEventListener("submit", async e => {
    e.preventDefault();
    let fromDate = searchForm.elements.fromDate.value;
    let toDate = searchForm.elements.toDate.value;

    console.log(fromDate, toDate, username);
    const settings = {
        method: "GET",
        headers: {
            "Content-Type": "applicatio/json",
            "Authorization": `Bearer ${token}`
        }
    }

    fetch(`http://localhost:5000/accounts/filtertransaction?fromDate=${fromDate}&toDate=${toDate}&username=${username}`,
        settings)
        .then(async response => {
            if (response.ok) {
                return await response.json();
            }
            else {
                console.error(new Error(`HTTP error! Status: ${response.status}`));
            }
        }).then(data => {
            document.getElementById("transactionHistoryList").innerHTML = "";
            for (let element of data) {
                addRowToTable(element.id, element.date, element.description, element.amount, element.balance, element.transactionAccount, element.transactionType);
            }
        }).catch(console.error);
})