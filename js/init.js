const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  ////// Ir al login //////
  
  function gotoLogin() {
    if ((sessionStorage.getItem("Email") === null && sessionStorage.getItem("Contraseña") === null) && (window.location.href.split("/").pop() !== "login.html"))  {
        window.location.href = "login.html";    
    }
  }
  gotoLogin();

  ///////////////
/////// Nombre de usuario //////
  document.getElementById("nombreMail").innerHTML +=  `<div class="btn-group">
  <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">${(sessionStorage.getItem("Email"))}</button>
  </button>
  <div class="dropdown-menu">
    <a class="dropdown-item" href="cart.html">Mi carrito</a>
    <a class="dropdown-item" href="my-profile.html">Mi perfil</a>
    <div class="dropdown-divider"></div>
    <a class="dropdown-item" id="cerrarSesion">Cerrar sesión</a>
  </div>
</div>`


});
/// Fijar como se ejecuta la funcion de cerrar sesion, el onload sirve para que pueda tomar la ID fijada con JS /// 
onload = function() {
  document.getElementById("cerrarSesion").addEventListener("click", closeSession);
}

//// Funcion de cerrar sesion, elimina los datos guardados en los sessionStorage y manda al login ///
function closeSession() {
  var answer = confirm("¿Quiere cerrar sesión?");
  if (answer) {
  sessionStorage.removeItem("Email");
  sessionStorage.removeItem("Contraseña");
  window.location.href = "login.html"
}

}