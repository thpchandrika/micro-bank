const authToken = localStorage.getItem('authToken');
console.log(authToken);
if (!authToken) {
    window.location.href = './login.html';
}