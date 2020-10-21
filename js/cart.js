
// Funcion que muestra la informacion de la productos del carrito

function showcartProducts(array) {
    let htmlProductsToAppend = "";

    for(let i = 0; i < array.length; i++){
        let cart_products = array[i];


        htmlProductsToAppend += `
        <div class="articuloCarrito"> 
        <div class="img_cart_container"><img src="${cart_products.src}" class="img_cart_products"> </div>
        <div class="carrito_art_info" id="cart_${i}_name"> ${cart_products.name}</div>
        <div class="carrito_art_info" id="cart_${i}_unitcost"> ${cart_products.currency}${cart_products.unitCost} </div>
        <div class="carrito_art_info"> <input class="form-control" style="width: 35%; margin : 0 auto;" type="number" id="cart_${i}_units" value="${cart_products.count}" min="1" onclick="precioSubtotal(${i}); newCost()"></div>
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
           if (localStorage.getItem("saveAdress_control") == 1) {
            load_savedAdress() 
           }

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
    <div class="costos"> 
        <div class="costos_in" >
            <div class="costo_izquierda">
                <div>Subtotal</div>
                <small class="text-muted"> Suma de cantidad de productos comprados multiplicado por su respectivo precio unitario </small>
            </div>
            <div class="costo_derecha" id="precioSubtotal">UYU ${subtotal}</div>
        </div>
        <div class="costos_in"> 
            <div class="costo_izquierda">
                <div>Costo de envío</div>
                <small class="text-muted"> Costo de envío en función del tipo de envío elegido </small>
            </div>
            <div class="costo_derecha" id="precioEnvio">UYU ${precioEnvio()*subtotal}</div>
        </div>
        <div class="costos_in"> 
            <div class="costo_izquierda">
                <div><strong>TOTAL</strong></div>
                <small class="text-muted"> Suma de costo subtotal más costo de envío </small>
            </div>
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
     // precioTotal = precioSubtotal*(1+precioEnvio()).toFixed(0)

    document.getElementById("precioSubtotal").innerHTML = "UYU " + precioSubtotal.toFixed(0)
    document.getElementById("precioEnvio").innerHTML = "UYU " + (precioSubtotal*precioEnvio()).toFixed(0)
    document.getElementById("precioTotal").innerHTML = "UYU " + (precioSubtotal*(1+precioEnvio())).toFixed(0)

}

////////////////////////////////////////////////////////////////////////////////////////

onload = function() {
    document.getElementById("premiumradio").addEventListener("click", newCost);
    document.getElementById("expressradio").addEventListener("click", newCost);
    document.getElementById("standardradio").addEventListener("click", newCost);

    }

//////////////////////////////////////////////////////////////////////////////////////

function saveAdress() {
    var calle = document.getElementById("calle_ID").value;
    var esquina = document.getElementById("esquina_ID").value;
    var numero_puerta = document.getElementById("numeroPuerta_ID").value;
    var departamento = document.getElementById("departamento_ID").value;
    var pais = document.getElementById("pais_ID").value;
    var barrio = document.getElementById("barrio_ID").value;
    
    localStorage.setItem("calle", calle);
    localStorage.setItem("esquina", esquina);
    localStorage.setItem("departamento", departamento);
    localStorage.setItem("numeroPuerta", numero_puerta);
    localStorage.setItem("pais", pais);
    localStorage.setItem("barrio", barrio);

    
}

function saveAdress_control() {

    saveAdress()
    var saveAdress_control = 1
    localStorage.setItem("saveAdress_control", saveAdress_control)

}

function load_savedAdress() {

    document.getElementById("calle_ID").value = localStorage.getItem("calle")
    document.getElementById("esquina_ID").value = localStorage.getItem("esquina") 
    document.getElementById("numeroPuerta_ID").value = localStorage.getItem("numeroPuerta")
    document.getElementById("departamento_ID").value = localStorage.getItem("departamento")
    document.getElementById("pais_ID").value = localStorage.getItem("pais")
    document.getElementById("barrio_ID").value = localStorage.getItem("barrio")
}

function resetAdress() {
    localStorage.removeItem("saveAdress_control")
    localStorage.removeItem("calle")
    localStorage.removeItem("esquina") 
    localStorage.removeItem("numeroPuerta")
    localStorage.removeItem("departamento")
    localStorage.removeItem("pais")
    localStorage.removeItem("barrio")

    document.getElementById("calle_ID").value = "";
    document.getElementById("esquina_ID").value = "";
    document.getElementById("numeroPuerta_ID").value = "";
    document.getElementById("departamento_ID").value = "";
    document.getElementById("pais_ID").value = "";
    document.getElementById("barrio_ID").value = "";

}
// Tomar el método de pago elegido
function paymentMethod() {
    var values = document.getElementsByName("paymentMethod");
let selectedValue = "";
for(var i = 0; i < values.length; i++) {
   if(values[i].checked == true) {
       selectedValue = values[i].value;
   }
 }
 return selectedValue;
}
/////////////////////////////////////////////
let write_payment_method = "false"
function printPaymentMethod(action) {
    if (write_payment_method === "false" && action === "add") {
    
        write_payment_method = "true";
        let method = paymentMethod();
        if (method === "credit"){
            var name = "Tarjeta"
        } else if (method === "debit") {
            var name = "Débito"
            clase = "payment_print_image"
        } else if (method === "transfer") {
            var name = "Transferencia"
            var clase = "payment_print_image"
        } else if (method === "paypal") {
            var name = "Paypal"
            var clase = "payment_print_image"
        }
        document.getElementById("forma_pago_elegida").innerHTML = 
        `
        <div> ${name}
        <div> <img class="${clase}" src="img/${method}_icon.png" alt=""> </div>
        </div>             
        `
         /// Cambia el nombre de la imagen que busca, dependiendo del método elegido
        write_payment_method = "false"
    }
    else if (action === "delete") {
        document.getElementById("forma_pago_elegida").innerHTML = 
        ``
    }
}
////////////////////////////////////////////////////////
/// Verificar que la info del método de pago elegido esté completa
window.payment_validation = 0
function checkPaymenteValidation() {
    var cc_name = document.getElementById("cc-name")
    var cc_expiration = document.getElementById("cc-expiration")
    var cc_number = document.getElementById("cc-number")
    var cc_cvv = document.getElementById("cc-cvv")
    var card_payment_inpunts = [cc_name, cc_expiration, cc_number, cc_cvv];
    window.card_payment_inpunts = card_payment_inpunts        // Inputs de tarjeta, variable global para usar cuando guarda info
    var card_number = document.getElementById("bank_number");
    var payment_method = paymentMethod();
    let local_validation = 1 // Si es 1, todos los campos están llenos

    if (payment_method === "credit" || payment_method ==="debit") {    /// Revisar solo los campos de tarjeta
        for (let i = 0; i < card_payment_inpunts.length; i++) {        /// Cambiar los recuadros de los campos en caso de tener o no valor
            let input = card_payment_inpunts[i];
        
            if (input.value.trim() === '') {
                input.className = "form-control input_error";   // Cambio de clase en campos obligatorios vacios
                local_validation = 0                                    // Si hay algun campo vacío, que cambie el valor de validity
            } else {
                input.className = "form-control input_success"; // Cambio de clase en campos obligatorios completos
            }
        
        }
    } else if (payment_method === "transfer") {  //// Checkeo campo de número de cuenta
        let input = card_number;
        if (input.value.trim() === '') {
            input.className = "form-control input_error";   // Cambio de clase en campos obligatorios vacios
            local_validation = 0                                    // Si hay algun campo vacío, que cambie el valor de validity
        } else {
            input.className = "form-control input_success"; // Cambio de clase en campos obligatorios completos
        }
    }
    // Validaciòn de paypal no requiere nada
    if (payment_method === "paypal") {
        local_validation = 1
    }
    if (local_validation === 1) {     /// Si están todos los campos llenos, que cierre el modal
        printPaymentMethod("add")
        document.getElementById("savePaymentModal").setAttribute("data-dismiss", "modal");
        document.getElementById("paymentModal_button").className = "btn btn-success btn-lg";

    } else {
        document.getElementById("savePaymentModal").removeAttribute("data-dismiss"); /// Sí hay algún campo incompleto, que no se cierre el Modal
        printPaymentMethod("delete")    // Borrar el div que dice que método de pago de eligió
        document.getElementById("paymentModal_button").className = "btn btn-danger btn-lg"
    }
    window.payment_validation = local_validation  /// Defino como variable global la variable con verifica si están los campons completos
    
}
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
/// Verificar que los valores del input no estén vacios
function checkAdressValidation(){
    var calle = document.getElementById("calle_ID");
    var esquina = document.getElementById("esquina_ID");
    var numero_puerta = document.getElementById("numeroPuerta_ID");
    var departamento = document.getElementById("departamento_ID");
    var pais = document.getElementById("pais_ID");
    var barrio = document.getElementById("barrio_ID");

    var local_validation = 1  // Si es 1, es que todos los campos obligatorios estan llenos

    var array_inputs = [calle, esquina, numero_puerta, departamento, pais, barrio];


    for (let i = 0; i < array_inputs.length; i++) {        /// Cambiar los recuadros de los campos en caso de tener o no valor
    let input = array_inputs[i]

    if (input.value.trim() === '') {
        input.className = "form-control input_error";   // Cambio de clase en campos obligatorios vacios
        local_validation = 0                                    // Si hay algun campo vacío, que cambie el valor de validity
    } else {
        input.className = "form-control input_success"; // Cambio de clase en campos obligatorios completos
    }

    }
    window.adress_validation = local_validation
}
function checkGlobalValidation() {
    if (window.payment_validation === 0) {
        alert("Por favor, elija un método de pago")
        document.getElementById("paymentModal_button").className = "btn btn-danger btn-lg"; // Marcar en rojo el boton de método de pagos
    }
    checkAdressValidation()    
    if (window.adress_validation === 0) {                                       // Si falta algún campo, avisar con alerta
        alert("Por favor, rellene los campos marcados en rojo")
    }
    if ((window.adress_validation === 1) && (window.payment_validation === 1)){
        // Guardo información de dirección
        saveAdress()
        /// Guardo en información de costos y envío
        var subtotal_checkOut = document.getElementById("precioSubtotal").innerHTML;
        var precioEnvio_checkOut = document.getElementById("precioEnvio").innerHTML;
        var total_checkOut = document.getElementById("precioTotal").innerHTML;
        var shipping_checkOut = (precioEnvio()*100).toFixed(0)
        localStorage.setItem("subtotal_checkOut", subtotal_checkOut); 
        localStorage.setItem("precioEnvio_checkOut", precioEnvio_checkOut)
        localStorage.setItem("total_checkOut", total_checkOut);
        localStorage.setItem("shipping_checkOut", shipping_checkOut)

        // Guardo información de artículos
        var articles_array = [];
        var articles_objets = [];
        for (let i = 0; i < cart_products_info.articles.length; i++) 
        {
            let unitCost_checkout = document.getElementById("cart_"+i+"_cost").innerHTML
            let name_checkout =   document.getElementById("cart_"+i+"_name").innerHTML
            let subtotal_checkout = document.getElementById("cart_"+i+"_cost").innerHTML
            let count_checkout =    document.getElementById("cart_"+i+"_units").value

            var articles = {name: name_checkout, unitCost: unitCost_checkout, count: count_checkout , subtotal: subtotal_checkout}
            articles_objets.push(articles);
        }

            articles_array = [JSON.stringify(articles_objets)];  // Transformo objeto en string
            localStorage.setItem("articles_array_checkout", articles_array); // Guardo info de artículos


        // Guardo información de método de pago
        payment_method = paymentMethod();
            if (payment_method === "credit" || payment_method ==="debit") {
                localStorage.setItem("payment_method_selected", "card");
                var payment_inpunts_values = []
                for (let i = 0; i < window.card_payment_inpunts.length; i++) {
                    payment_inpunts_values.push(window.card_payment_inpunts[i].value)  // Tomo los valores de cada input
                }
                localStorage.setItem("payment_method_info", JSON.stringify(payment_inpunts_values))

            } else if (payment_method === "transfer") {
                let payment_inpunts_values = document.getElementById("bank_number").value;
                localStorage.setItem("payment_method_info", JSON.stringify(payment_inpunts_values));
                localStorage.setItem("payment_method_selected", "transfer")
            } else if (payment_method === "paypal") {
                localStorage.setItem("payment_method_selected", "paypal")
            }

        //
        alert("¡Gracias por su compra!")
        setTimeout( goToCheckOut, 3000); // Redirigir con 3 seg de delay
        }
}

function goToCheckOut() {
    window.location.href = "cart-checkout-info.html"; // Redirigir a página de info de compra
}

/*
//////////////////////
////// OPCION 1 //////
//// Ocultar DIVS ////
function prove() {
        var x = document.getElementById("card_info_form");
        if (x.style.display === "none") {
          x.style.display = "block";
        } else {
          x.style.display = "none";
        }

}
///////////////////////////
*/

//////////////////////
////// OPCION 2 //////
/// Anular los DIVS //
function change_card_inputs(action) {
    parentID = document.getElementById("card_info_form"); // Agarra una ID
    childIDs = parentID.querySelectorAll('*[id]')         // Agarra los ID dentro del ID anterior
    for (var i = 0, len = childIDs.length; i < len; ++i) {
        if (action === "block") { 
            childIDs[i].readOnly = true;                // "Blockea" los input elegidos
            childIDs[i].className = "form-control"      /// Saca el recuadro rojo o verde de la validación 
            parentID.className = "payment_hide_inputs";
        }
        else if (action === "unblock") {
            childIDs[i].readOnly = false;
            parentID.classList.remove("payment_hide_inputs");
        }
    }
}

function change_transfer_inputs(action) {
    parentID = document.getElementById("transfer_info_form");
    childIDs = parentID.querySelectorAll('*[id]')
    for (var i = 0, len = childIDs.length; i < len; ++i) {
        if (action === "block") { 
            childIDs[i].readOnly = true;
            childIDs[i].className = "form-control"
            parentID.className = "payment_hide_inputs"
        }
        else if (action === "unblock") {
            childIDs[i].readOnly = false;
            parentID.classList.remove("payment_hide_inputs");
        }
    }
}
