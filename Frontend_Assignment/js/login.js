//check the user login inputs with the local storage data
document.getElementById("login").addEventListener("click", () => {
    if(document.getElementById("loginusername").value == localStorage.getItem("username") &&
        document.getElementById("loginpassword").value == localStorage.getItem("password")){
        document.getElementById("loginform").action = "index.html";
    }
    else{
        alert("Your login details is incorrect. Please make sure you have an account.");
    }
});

