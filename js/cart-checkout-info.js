function currentDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  var hh = today.getHours();
  var min = ('0' + today.getMinutes()).slice(-2);
  var ss = ('0' + today.getSeconds()).slice(-2);

  today = yyyy + '-' + mm + '-' + dd + ' ---  ' + hh + ':' + min + ':' + ss ;
  return today

}

function showcheckoutInfo() {
    let htmlCheckOutInfoToAppend = "";
    let htmlCheckOutProdcutsInfoToAppend = "";
    let htmlPaymentMethodInfoToAppend = "";
    var checkout_products = JSON.parse(localStorage.getItem("articles_array_checkout"));
    var checkout_paymente_info = JSON.parse(localStorage.getItem("payment_method_info"));
    alert(checkout_paymente_info);
////
    for(let i = 0; i < checkout_products.length; i++){

////
      htmlCheckOutProdcutsInfoToAppend +=   `
        <tr>
          <td class="center">${i+1}</td>
          <td class="left strong">${checkout_products[i].name}</td>
          <td class="left">Autos</td>
          
          <td class="right">${checkout_products[i].unitCost.replace('<strong>','')}</td>
            <td class="center">${checkout_products[i].count}</td>
          <td class="right">${checkout_products[i].subtotal.replace('<strong>','')}</td>
        </tr>`
    }
////

  if (localStorage.getItem("have_card") === "yes") {
    
    htmlPaymentMethodInfoToAppend = `
    <div>Tarjeta: ${checkout_paymente_info[2]}</div>
    <div>Venc.: ${checkout_paymente_info[1]} </div>
    <div>Nombre: ${checkout_paymente_info[0]}</div> `
  }
    else {
      htmlPaymentMethodInfoToAppend = `
      <div>PAYPAL</div>
 `
    }

////


    htmlCheckOutInfoToAppend += `
        <div class="container">
        <div class="card">
      <div class="card-header">
      Invoice
      <strong>Número de compra/recibo</strong> 
        <span class="float-right"> <strong>Fecha:</strong> ${currentDate()}</span>
      
      </div>
      <div class="card-body">
      <div class="row mb-4">
      <div class="col-sm-6">
      <!--<h6 class="mb-3">Para:</h6>-->
      <div>
      <strong>Dirección de envío:</strong>
      </div>
      <div>${localStorage.getItem("calle")} ${localStorage.getItem("numeroPuerta")}</div>
      <div>Esq. ${localStorage.getItem("esquina")}</div>
      <div>${localStorage.getItem("barrio")}</div>
      <div>${localStorage.getItem("departamento")}, ${localStorage.getItem("pais")}</div>
      </div>
      
      <div class="col-sm-6">
      <div>
      <strong>Forma de pago:</strong>
      </div>
        ${htmlPaymentMethodInfoToAppend}
      </div>
      
      
      
      </div>
      
      <div class="table-responsive-sm">
        <table class="table table-striped">
          <thead>
            <tr>
            <th class="center">#</th>
            <th>Artículo</th>
            <th>Categoría</th>
            
            <th class="right">Costo por unidad</th>
              <th class="center">Cantidad</th>
            <th class="right">Total</th>
            </tr>
          </thead>
          <tbody>
          ${htmlCheckOutProdcutsInfoToAppend}
          </tbody>
        </table>
      </div>
      <div class="row">
      <div class="col-lg-4 col-sm-5">
      
      </div>
      
      <div class="col-lg-4 col-sm-5 ml-auto">
      <table class="table table-clear">
        <tbody>
        <tr>
          <td class="left">
          <strong>Subtotal</strong>
          </td>
          <td class="right">${localStorage.getItem("subtotal_checkOut")}</td>
        </tr>
        <tr>
          <td class="left">
          <strong>Envío (${localStorage.getItem("shipping_checkOut")}%)</strong>
          </td>
          <td class="right">${localStorage.getItem("precioEnvio_checkOut")}</td>
        </tr>
        <tr>
          <td class="left">
          <strong>Total</strong>
          </td>
          <td class="right">
          <strong>${localStorage.getItem("total_checkOut")}</strong>
          </td>
          </tr>
        </tbody>
      </table>
      
      </div>
      
      </div>
      
      </div>
      </div>
      </div>
        `

        document.getElementById("cart_checkout_info").innerHTML += htmlCheckOutInfoToAppend;
    }



document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_2_URL).then(function(resultObj){
        if (resultObj.status === "ok") 
        {
           cart_products_info = resultObj.data;
           showcheckoutInfo()

        }
    })
}); 