const token = localStorage.getItem('token');
let lienLogin = document.querySelector('#login-nav');
console.log('token');

if(token){
    lienLogin.innerText = "logout"
}