function gotoLogin() {
    if (sessionStorage.getItem("Email") === null && sessionStorage.getItem("Contraseña") === null) {
        window.location.href = "login.html";
    }
}
gotoLogin();



    
// if (sessionStorage.getItem("Email") === null && sessionStorage.getItem("Contraseña") === null) {
 //   window.location.href = "login.html";


