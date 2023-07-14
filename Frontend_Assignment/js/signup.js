//Store user sign up inputs into local storage

document.getElementById("signup").addEventListener("click", () =>{

    localStorage.setItem("username", document.getElementById("signupusername").value)

    localStorage.setItem("password", document.getElementById("signuppassword").value)

    localStorage.setItem("email", document.getElementById("signupemail").value)
});