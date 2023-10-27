const form = document.getElementById("createAccountForm");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const accountHolderName = document.getElementById("fullname").value;
    const dob = document.getElementById("dob").value;
    const emailAddress = document.getElementById("email").value;
    const phoneNumber = document.getElementById("phone").value;
    const state = document.getElementById("state").value;
    const city = document.getElementById("city").value;
    const zip = document.getElementById("zipcode").value;
    const ssn = document.getElementById("ssn").value;
    const initialDeposit = document.getElementById("initial_deposit").value;
    const accountTypeDropdown = document.getElementById("accountTypeDdl");
    const accountType = accountTypeDropdown.options[accountTypeDropdown.selectedIndex].value;

    // const formData = new FormData(this);
    //console.log(formData);
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("authToken");
    //formData.append("username", localStorage.getItem("username"))

    const data = JSON.stringify({ accountHolderName, dob, emailAddress, phoneNumber, state, city, zip, ssn, initialDeposit, accountType, username });
    const accountOptions = {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${token}`
        }
    }
    await fetch("http://localhost:5000/accounts/createAccount", accountOptions)
        .then(response => {
            if (!response.ok) {
                alert(new Error(`HTTP error! Status: ${response.status}`));
            } else {
                return response.json();
            }
        })
        .then(data => {
            if (data.message) {
                alert(data.message);
            } else {
                alert("Account created successfully");
            }
            //form.reset();
        })
        .catch(error => {
            console.error("Error creating account" + error);
        })
})