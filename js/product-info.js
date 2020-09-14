//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


////// Mostrar info de producto ////////////

function showproductInfo(){

    let htmlContentToAppend = "";

                htmlContentToAppend = `
                <div>
                <div class="description"> ${product_info.description} </div>
                <br>
                    <div> <div style="text-decoration: underline;">Informacioón general:</div>
                    Nombre: ${product_info.name}<br>  Categoría: <a href="category-info.html" class="link";>${product_info.category}</a><br>  Precio: ${product_info.currency}${product_info.cost} <br> Artículos vendidos: ${product_info.soldCount}
                    </div>
                </div>
                `

        document.getElementById("info").innerHTML = htmlContentToAppend;
        document.getElementById("nombreProducto").innerHTML = `<br><div class="text-center p-4" style="font-size: 3.5em;">${product_info.name}</div>`
        document.getElementById("precio").innerHTML = `<div class="text-center p-4"> <div style="font-size: 2.5em;">${product_info.currency} ${product_info.cost}</div> </div>`
        document.getElementById("sold").innerHTML = `Artículos vendidos: ${product_info.soldCount}`;
}

////////////////////////////////////////////

//////// Imagenes de galeria ///////////////

function showproductGallery(array) {
    let htmlImgToAppend = "";
    let htmlControlesToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlImgToAppend += `
        <img class="mySlides" src="${imageSrc}" style="width:100%; height: 100%;">
        `
        htmlControlesToAppend += `<button class="w3-button demo" onclick="currentDiv(${i+1})">${i+1}</button> `

    }
    document.getElementById("gallery").innerHTML += htmlImgToAppend;
    document.getElementById("botonesDireccion").innerHTML += htmlControlesToAppend;
}

/// Mostrar productos relacionados /// 

 function showproductsRelated(array, index) {
    let htmlProductsImgToAppend = "";

    for(let i = 0; i < index.length; i++){
        let number = index[i]
        let image = array[number].imgSrc;


        htmlProductsImgToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + image + `" alt="">
            </div>
        </div>
        `
    }
    document.getElementById("related_products").innerHTML += htmlProductsImgToAppend;
}

/////////Transformar numero de puntajes en estrellas a partir de un array ////////// 

function stars (array) {
    estrellas = ''
    for (let i = 0; i < 5; i++ ) {
        if (i < array.score) {
            estrellas += '<span class="fa fa-star checked"></span>'
        } else {
            estrellas += '<span class="far fa-star checked"></span>'
        }
     }
    return estrellas;
}

////

////////////////////////////////////////////
///////// Mostrar comentarios /////////////

function showComments(array) {
    document.getElementById("promedio").innerHTML = `<div class="promedio">${promedio(array)}<br>${starsN(promedio(array))}</div>`;          /// Doy un valor al promedio ///
    let htmlcommentsToAppend = "";

    for(let i = 0; i < array.length; i++){
        let comments = array[i];

        htmlcommentsToAppend += `
        <div> <strong> ${comments.user.replace("_", " ")} </strong></div> 
        <div> ${ stars(comments)}</div>
        <div> ${comments.description} </div> 
        <small class="text-muted"> ${comments.dateTime} </small>
        <br><hr>
        `
        

        document.getElementById("comments").innerHTML = htmlcommentsToAppend;
        document.getElementById("numeroComentarios").innerHTML = `Valoraciones: ${array.length}`
    }
    
}

/////////////////////////////////////////////////////////////////////////




document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product_info = resultObj.data;
            showproductInfo();
            showproductGallery(product_info.images);
            var relatedProductsIndex = product_info.relatedProducts
            

showDivs(slideIndex);

            getJSONData(PRODUCTS_URL).then(function(resultObj){
                if (resultObj.status === "ok")
                {
                  related_products = resultObj.data;
                  showproductsRelated(related_products, relatedProductsIndex);
                 }
             })

         }
        })
           
         getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
             if (resultObj.status === "ok") 
             {
                comments_info = resultObj.data;
                showComments(comments_info);
             }
         })
});   

/////////////// Obtener fecha y hora actual ///////

function currentDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var hh = today.getHours();
    var min = ('0' + today.getMinutes()).slice(-2);
    var ss = ('0' + today.getSeconds()).slice(-2);

    today = yyyy + '-' + mm + '-' + dd + '  ' + hh + ':' + min + ':' + ss ;
    return today

}

/////// Puntaje en estrellas a partir de un número ///////

function starsN (score) {
    estrellasN = ''
    contador = 0;  // para agregar solo una vez la fraccion de estrella
    if (score/Math.floor(score) == 1) { /// Parte de funcion usada para agregar estrellas de nuevos comentarios ///
    for (let i = 0; i < 5; i++ ) {
        if (i < score) {
            estrellasN += '<span class="fa fa-star checked"></span>'
        } else {
            estrellasN += '<span class="far fa-star checked"></span>'
        }
     }
    }
    else {                                      /// Parte de funcion usada para transformar el promedio en estrellas, usando mitades de estrellas 
        for (let i = 0; i < 5; i++ ) {
            if (i < Math.floor(score))  {
                estrellasN += '<span class="fa fa-star checked"></span>'
            } else if((contador == 0) && (score - Math.floor(score) >= 0.3) ) {
                estrellasN += '<span class="fas fa-star-half-alt checked"></span>'
                contador = 1
            }
             else {
                estrellasN += '<span class="far fa-star checked"></span>'
            }
         }
    }
    return estrellasN;
}

///////////////////////////////////////////////

var contadorcoment = 0
sessionStorage.setItem("comentarioH", contadorcoment)

////////// Agregar un nuevo comentario /////////

function newComment() {

if (sessionStorage.getItem("comentarioH") < 1) {

    var puntaje = document.getElementById("puntaje").value;
    var mensaje = document.getElementById("mensaje").value;

    if (puntaje !== "") {



    sessionStorage.setItem("comentarioH", contadorcoment+1);                  //// Contador para no realizar mas de un comentario ////
    document.getElementById("comments").innerHTML += `
        <div> <strong>${sessionStorage.getItem("Email")} </strong></div>
        <div> ${starsN(puntaje)} </div>
        <div> ${mensaje} </div>
        <small class="text-muted"> ${currentDate()}</small>
        <br><hr>
        `
        nuevoPromedio = promedio(comments_info)
        document.getElementById("promedio").innerHTML = `<div class="promedio">${nuevoPromedio}<br>${starsN(nuevoPromedio)}</div>`;        /// Modifico el promedio de volaroacion /// 
        alert("¡Gracias por su comentario!")
    }
    else {
        alert("Por favor, ingrese un puntaje")
    }
   
}
else {
    alert("Ya ha realizado un comentario para este producto")
}
document.getElementById("numeroComentarios").innerHTML = `Valoraciones: ${comments_info.length+1}`   /// Modificar el numero de valoraciones totales ///
}

document.getElementById("submitComment").addEventListener("click", newComment);     /// Invocar a la función de NewComment ///



////////////////// Prueba, PROMEDIO 

function promedio(array) {
    sumaParcial = 0;
    let contador = array.length;
    if (sessionStorage.getItem("comentarioH") == 0) {       /// Condicion para que modifique promedio en caso de nuevo comentario ///
    for (i=0; i < array.length; i++) {
        sumaParcial += array[i].score;
    } 
        sessionStorage.setItem("promedioInicial", sumaParcial)
        sumaTotal = sessionStorage.getItem("promedioInicial")
    } else {
        sumaTotal = Number(sumaTotal) + Number(document.getElementById("puntaje").value);
        contador += 1;
    }
    promedioT = (sumaTotal/contador);
    return promedioT;
}

////////////////////////////////////////////////
///// Parte dedicada a carrusel de imagenes ////
var slideIndex = 1;
function plusDivs(n) {
  showDivs(slideIndex += n);
}

function currentDiv(n) {
  showDivs(slideIndex = n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  if (n > x.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" w3-red", "");
  }
  x[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " w3-red";
}



