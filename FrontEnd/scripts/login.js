let form = document.querySelector("form");
let errorUser = document.querySelector("#popup-error");

form.addEventListener("submit", async (event) => {

    event.preventDefault();
    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;
   
        try{
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email ,password })
            });

            if (!response.ok) {
            const errorMessage = await response.text();
            errorUser.classList.add("login-error")
            errorUser.classList.remove("login-placeholder")
            throw new Error(errorMessage);
            }

            const data = await response.json();
            console.log('Connecté', data);
            const token = data.token;
            localStorage.setItem('token', token);
            window.location.href = "http://127.0.0.1:5500/FrontEnd/index.html";
        } catch (error) { 
            console.error('Login échoué:', error.message);           
        }
    
})

