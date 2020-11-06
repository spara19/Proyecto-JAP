//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


////////////////////////////
const ORDER_ASC_BY_PRICE = "AZ";
const ORDER_DESC_BY_PRICE = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
var currentproductsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

function sortproducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRICE){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}


function showproductsList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentproductsArray.length; i++){
        let product = currentproductsArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))){

                htmlContentToAppend += `
                <div class="col-md-4">
                <a href="product-info.html" class="list-group-item-action">
                <h4 class="text-center p-1 border_products_title font-weight-bold"> ${product.name} </h4> 
                <div class="card mb-4 shadow-sm">
                  <img src="${product.imgSrc}" alt="${product.desc}" class="bd-placeholder-img card-img-top img-thumbnail"<rect width="100%" height="100%" fill="#55595c"/></>
                  <div class="card-body">
                    <p class="card-text">${product.description}.</p>
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="btn-group font-weight-bold">
                        ${product.currency} ${product.cost}
                      </div>
                      <small class="text-muted">${product.soldCount} artículos vendidos</small>
                    </div>
                  </div>
                </div> 
                </a>
              </div>
                `
        }

        document.getElementById("products").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowproducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentproductsArray = productsArray;
    }

    currentproductsArray = sortproducts(currentSortCriteria, currentproductsArray);

    //Muestro las categorías ordenadas
    showproductsList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowproducts(ORDER_BY_PROD_COUNT, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowproducts(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowproducts(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowproducts(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showproductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showproductsList();
    });
});

////////////
function buscar() {
    texto = document.getElementById("searchBar").value.toLowerCase();
    lista = [];

    for (let products of productsArray) {
        nombre = products.name.toLowerCase();
        descripcion = products.description.toLowerCase();
        
        if ((nombre.indexOf(texto) !== -1) || (descripcion.indexOf(texto) !== -1)) {
            lista.push (products);
        }
    }
        if (lista.length == 0) {
            document.getElementById("products").innerHTML = "<p class='noResultFound' >" + "No hay elementos que coincidan con su búsqueda :(" + "</p>"
        }


    currentproductsArray = lista  
    showproductsList()

}
document.getElementById("searchBar").addEventListener("keyup", buscar) 

////////////





document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data;
            //Muestro las categorías ordenadas
            showproductsList(productsArray);
        }
    });
});