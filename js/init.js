const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";
const CART_INFO_2_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";

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
changeNavBar();
});
/// Fijar como se ejecuta la funcion de cerrar sesion, el onload sirve para que pueda tomar la ID fijada con JS /// 
onload = function() {
  if (window.location.href.split("/").pop() !== "login.html") {
  document.getElementById("cerrarSesion").addEventListener("click", closeSession);
  }
}

//// Funcion de cerrar sesion, elimina los datos guardados en los sessionStorage y manda al login ///
function displayUserMenu() {
  if (window.location.href.split("/").pop() !== "login.html") {
    document.getElementById("nombreMail").innerHTML +=  `<div class="btn-group">
        <button type="button" class="btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">${(sessionStorage.getItem("Email"))}</button>
        </button>
        <div class="dropdown-menu">
          <a class="dropdown-item" href="cart.html">Mi carrito</a>
          <a class="dropdown-item" href="my-profile.html">Mi perfil</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" id="cerrarSesion">Cerrar sesión</a>
        </div>
      </div>`
    }
  }

function closeSession() {
  var answer = confirm("¿Quiere cerrar sesión?");
  if (answer) {
    sessionStorage.removeItem("Email");
    sessionStorage.removeItem("Contraseña");
    window.location.href = "login.html"
  }
}


function reportWindowSize() {
  let widthOutput = window.innerWidth;
  return widthOutput
}

window.addEventListener('resize', function() {
  if (window.location.href.split("/").pop() !== "login.html") {
    changeNavBar()
  }
})

function changeNavBar() {
  let windowsWidth = reportWindowSize();
  if (windowsWidth < 768) {
    smallNavBar();
  } else if (windowsWidth >= 767){
    normalNavBar();
  }
}

function smallNavBar() {
      var navBar = document.getElementsByTagName("nav");
      navBar[0].className = "navbar navbar-expand-lg navbar-dark bg-dark site-header sticky-top py-1"
      var newnavBar =   `
      <a class="navbar-brand" href="index.html">Inicio</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav container d-flex flex-column flex-md-row justify-content-between">
          <a class="nav-item nav-link" href="categories.html">Categorías <span class="sr-only">(current)</span></a>
          <a class="nav-item nav-link" href="products.html">Productos</a>
          <a class="nav-item nav-link" href="sell.html">Vender</a>
          <a id="nombreMail" class="nav-item nav-link" href=""></a>
        </div>
      </div>
      `
      navBar[0].innerHTML = newnavBar
      displayUserMenu()
}

function normalNavBar() {
    var navBar = document.getElementsByTagName("nav");
    navBar[0].className = "site-header sticky-top py-1 bg-dark"
    var newnavBar = `
    <div class="container d-flex flex-column flex-md-row justify-content-between">
      <a class="py-2 d-none d-md-inline-block" href="index.html">Inicio</a>
      <a class="py-2 d-none d-md-inline-block" href="categories.html">Categorías</a>
      <a class="py-2 d-none d-md-inline-block" href="products.html">Productos</a>
      <a class="py-2 d-none d-md-inline-block" href="sell.html">Vender</a>
      <a id="nombreMail" class="py-2 d-none d-md-inline-block" href=""></a>
    </div>
    `

    navBar[0].innerHTML = newnavBar
    displayUserMenu()
}