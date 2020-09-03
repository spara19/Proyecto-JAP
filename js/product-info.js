//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


////// Mostrar info de producto ////////////

function showproductInfo(){

    let htmlContentToAppend = "";

                htmlContentToAppend = `
                <div>
                <h3> ${product_info.name} </h3>
                <div> ${product_info.description} </div>
                <div> Categoría: ${product_info.category}
                <div> Precio: ${product_info.currency} ${product_info.cost}</div>
                <div> Articulos vendidos: ${product_info.soldCount} </div>
                <div></div>
                </div>
                `

        document.getElementById("info").innerHTML = htmlContentToAppend;
}

////////////////////////////////////////////

//////// Imagenes de galeria ///////////////

function showproductGallery(array) {
    let htmlImgToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlImgToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("gallery").innerHTML = htmlImgToAppend;
    }
}



/* function showproductsRelated(array, related) {
    let htmlImgToAppend = "";

    for(let i = 0; i < related.length; i++){
        let image = array[related[i]].imageSrc;

        htmlImgToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
        También te puede interesar...
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + image + `" alt="">
            </div>
        </div>
        `

        document.getElementById("related_products").innerHTML = htmlImgToAppend;
    }
    
}
*/

////////////////////////////////////////////
///////// Mostrar comentarios /////////////

function showComments(array) {
    let htmlcommentsToAppend = "";

    for(let i = 0; i < array.length; i++){
        let comments = array[i];

        htmlcommentsToAppend += `
        <div> <strong> ${comments.user.replace("_", " ")} </strong></div>
        <div> ${comments.score} </div>
        <div> ${comments.description} </div>
        <small class="text-muted"> ${comments.dateTime} </small>
        <br><hr>
        `
        

        document.getElementById("comments").innerHTML = htmlcommentsToAppend;
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
         }
        })
        /*
         getJSONData(PRODUCT_URL).then(function(resultObj){
            if (resultObj.status === "ok")
            {
              related_products = resultObj.data;
              showproductsRelated(related.products, relatedProducts);
             }
         })
         */   
         getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
             if (resultObj.status === "ok") 
             {
                comments_info = resultObj.data;
                showComments(comments_info);
             }
         })
        
              
              



            /*
            
            let categoryNameHTML  = document.getElementById("categoryName");
            let categoryDescriptionHTML = document.getElementById("categoryDescription");
            let productCountHTML = document.getElementById("productCount");
            let productCriteriaHTML = document.getElementById("productCriteria");
        
            categoryNameHTML.innerHTML = category.name;
            categoryDescriptionHTML.innerHTML = category.description;
            productCountHTML.innerHTML = category.productCount;
            productCriteriaHTML.innerHTML = category.productCriteria;

            //Muestro las imagenes en forma de galería
            showImagesGallery(category.images);
         
            */

});   

/////////////// Obtener fecha y hora actual ///////

function currentDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var hh = today.getHours();
    var min = today.getMinutes();
    var ss = today.getSeconds();

    today = yyyy + '-' + mm + '-' + dd + '  ' + hh + ':' + min + ':' + ss ;
    return today

    

}
////////// Defino el limite de comentarios a un mismo prodcuto en uno por sesion /////////

// if (sessionStorage.getItem("comentario_limite") != 1) {  /// SOlo me sirve si puedo guardar el comentario nuevo en un sesion
var contadorcoment = 0
sessionStorage.setItem("comentario_limite", contadorcoment)
// }

////////// Agregar un nuevo comentario /////////

function newComment() {

alert(sessionStorage.getItem("comentario_limite"))
if (sessionStorage.getItem("comentario_limite") < 1) {

    var puntaje = document.getElementById("puntaje").value;
    var mensaje = document.getElementById("mensaje").value;

    if (puntaje !== "") {

    sessionStorage.setItem("comentario_limite", contadorcoment+1);                  //// Contador para no realizar mas de un comentario ////
    document.getElementById("comments").innerHTML += `
        <div> <strong>${sessionStorage.getItem("Email")} </strong></div>
        <div> ${puntaje} </div>
        <div> ${mensaje} </div>
        <small class="text-muted"> ${currentDate()}</small>
        <br><hr>
        `
    }
    else {
        alert("Por favor, ingrese un puntaje")
    }
   
}
else {
    alert("Ya ha realizado un comentario para este producto")
}
}

document.getElementById("submitComment").addEventListener("click", newComment); 
