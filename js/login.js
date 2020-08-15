//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});

document.getElementById("SubmitButton").addEventListener("click", DatosUsuario); 

function DatosUsuario() {
var usuario = document.getElementById("inputEmail").value;
var contra = document.getElementById("inputPassword").value;
sessionStorage.setItem("Email", usuario);
sessionStorage.setItem("Contraseña", contra);
alert(sessionStorage.getItem("Email"));
}

document.getElementById("SubmitButton").addEventListener("click", GoToIndex);

function GoToIndex() {
    alert(sessionStorage.getItem("Email"))
    if (sessionStorage.getItem("Email")=== null) {
        window.location.replace("www.google.com")
    }
    }
