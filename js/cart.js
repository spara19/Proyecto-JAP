
// Funcion que muestra la informacion de la productos del carrito

function showcartProducts(array) {
    let htmlProductsToAppend = "";

    for(let i = 0; i < array.length; i++){
        let cart_products = array[i];



        htmlProductsToAppend += `
        <div class="articuloCarrito"> 
        <div class="img_cart_container"><img src="${cart_products.src}" class="img_cart_products"> </div>
        <div class="carrito_art_info"> ${cart_products.name}</div>
        <div class="carrito_art_info"> ${cart_products.currency}${cart_products.unitCost} </div>
        <div class="carrito_art_info"> <input class="form-control" type="number" id="cart_${i}_units" value="${cart_products.count}" min="1" onclick="precioSubtotal(${i}); newCost()"></div>
        <div class="carrito_art_info" id="cart_${i}_cost" style="float: right;;"> <strong>UYU  ${convertir(cart_products.currency)*cart_products.count*cart_products.unitCost}</strong></div>
        </div>
        <br>
        `
    }

    document.getElementById("cart_products_ID").innerHTML += htmlProductsToAppend;
}

///////// Convertir a UYU en caso de que el precio esté en USD ////////////
function convertir(moneda) {
    if (moneda === "USD") {
        conversor = 40
    } else {
        conversor = 1
    }
    return conversor;
}

////////////////////////////////////////

/*function precioProductos(array) {
    precio_productos = 0;
    for(let i = 0; i < array.length; i++){
        let cart_products = array[i];
        if (cart_products.currency === "USD") {
            precio_productos += cart_products.unitCost*40
        } else {
            precio_productos += cart_products.unitCost
        }
        
     }
     return precio_productos;
}
*/



/// Funcion que traduce el método de envío en un porcentaje extra ///
function precioEnvio() {
    tipo_envio = metodoEnvio()
    porcentaje_extra = 0
    if (tipo_envio == "Standard") {
        porcentaje_extra = 0.05
        }
        else if (tipo_envio == "Express") {
        porcentaje_extra = 0.07
        }
        else if (tipo_envio == "Premium") {
        porcentaje_extra = 0.15
        }
    return (porcentaje_extra)
    }

//////////////////////////////////////////////////////////////

function precioFinal(array) {
    precio_final = 0;
    for(let i = 0; i < array.length; i++){
        let cart_products = array[i];
        if (cart_products.currency === "USD") {
            precio_final += cart_products.unitCost*40
        } else {
            precio_final += cart_products.unitCost
        }
        
     }
     alert(precio_final)    
}

///////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_2_URL).then(function(resultObj){
        if (resultObj.status === "ok") 
        {
           cart_products_info = resultObj.data;
           showcartProducts(cart_products_info.articles);
           showPrices(cart_products_info.articles);
        }
    })
}); 

/////////////////////////////////////////////////////////////////////////

//// Funcion que modifica el precio subtotal dependiendo de cantidad de productos, de cada producto ////

function precioSubtotal(article) {
 units = document.getElementById("cart_"+article+"_units").value;
 units_price = cart_products_info.articles[article].unitCost
 subtotal = units*units_price
 document.getElementById("cart_"+article+"_cost").innerHTML = "<strong> UYU " + convertir(cart_products_info.articles[article].currency)*subtotal + "</strong>"; /// Convertir() pasa de dolares a uruguayos ///
}
/////////////////////////////////////////////////////////////////////////

//// Function que toma el tipo de envio elegido ////////////////////////

function metodoEnvio() {
    var values = document.getElementsByName("shipingType");

for(var i = 0; i < values.length; i++) {
   if(values[i].checked == true) {
       selectedValue = values[i].value;
   }
 }
 return selectedValue;
}

////////////////////////////////////////////////////////////////////////////////

/////// Funcion para visualizar los costos //////////////////

function showPrices(array) {
    let htmlPricesToAppend = "";
    let subtotal = 0;

    for(let i = 0; i < array.length; i++){
        let cart_products = array[i];
        subtotal += convertir(cart_products.currency)*cart_products.count*cart_products.unitCost
    }

    
    htmlPricesToAppend += `
    <div> 
        <div>
            <div class="costo_izquierda">Subtotal</div>
            <div class="costo_derecha" id="precioSubtotal">UYU ${subtotal}</div>
        </div><br><br>
        <div>
            <div class="costo_izquierda">Costo de envío</div>
            <div class="costo_derecha" id="precioEnvio">UYU ${precioEnvio()*subtotal}</div>
        </div><br><br>
        <div>
            <div class="costo_izquierda">COSTO TOTAL</div>
            <div class="costo_derecha" id="precioTotal">UYU ${(1+precioEnvio())*subtotal}</div>
        </div>
    </div>
    `
document.getElementById("costos").innerHTML = htmlPricesToAppend;
    
}

//////////////////////////////////////////////////////////////////////

///////// Funcion que modifica valor de lista de costos ////////

function newCost() {
    let precioSubtotal = 0;
    let precioTotal = 0;
    let productos = cart_products_info.articles
    for(let i = 0; i <productos.length; i++) {
       let units = document.getElementById("cart_"+i+"_units").value;
       precioSubtotal += convertir(productos[i].currency)*units*productos[i].unitCost;
    }
    precioTotal = precioSubtotal*(1+precioEnvio()).toFixed(0)

    document.getElementById("precioSubtotal").innerHTML = "UYU " + precioSubtotal.toFixed(0)
    document.getElementById("precioEnvio").innerHTML = "UYU " + (precioSubtotal*precioEnvio()).toFixed(0)
    document.getElementById("precioTotal").innerHTML = "UYU " + precioTotal

}

////////////////////////////////////////////////////////////////////////////////////////

onload = function() {
    document.getElementById("premiumradio").addEventListener("click", newCost);
    document.getElementById("expressradio").addEventListener("click", newCost);
    document.getElementById("standardradio").addEventListener("click", newCost);

    }