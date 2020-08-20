function gotoLogin() {
    if (sessionStorage.getItem("Email") === null && sessionStorage.getItem("Contraseña") === null) {
        window.location.href = "login.html";
    }
}
gotoLogin();

document.getElementById("nombreMail").innerHTML += "<b>" + sessionStorage.getItem("Email") + "</b>"


    
// if (sessionStorage.getItem("Email") === null && sessionStorage.getItem("Contraseña") === null) {
 //   window.location.href = "login.html";


