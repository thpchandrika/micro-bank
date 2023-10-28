const form = document.getElementById("createAccountForm");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const accountHolderName = form.elements.fullname.value;
    const dob = form.elements.dob.value;
    const emailAddress = form.elements.email.value;
    const phoneNumber = form.elements.phone.value;
    const state = form.elements.state.value;
    const city = form.elements.city.value;
    const zip = form.elements.zipcode.value;
    const ssn = form.elements.ssn.value;
    const initialDeposit = parseFloat(form.elements.initialDeposit.value);
    const accountType = form.elements.accountTypeDdl.value;

    const username = localStorage.getItem("username");
    const token = localStorage.getItem("authToken");

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
                form.reset();
            }
        })
        .catch(error => {
            console.error("Error creating account" + error);
        })
})