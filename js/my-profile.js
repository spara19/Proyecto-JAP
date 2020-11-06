//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    unique_user = sessionStorage.getItem("Email")
    if (localStorage.getItem(unique_user) === "complete") {
        showProfileInfo();
    }


});

function checkNewProfileValidation() {     // Valida que los cambios sean correctos.
    parentID = document.getElementById("new-profile-info-form");
    childIDs = parentID.querySelectorAll('*[id]');
    let local_validation = 1
    for (var i = 0, len = childIDs.length; i < len; ++i) {
        let input = childIDs[i]
        if (i != 1) { // Ignora validación opcional de segundo nombre.
            if (input.value.trim() === '') {
                input.className = "form-control input_error";  
                local_validation = 0  
            } else {
                input.className = "form-control input_success"; 
            }
        }
    }
    if (local_validation === 1) {
        saveNewProfile();
        showProfileInfo();
    }
}

function getModalIDS() { // Toma el nodo de IDs del modal (son todos inputs)
    parentID = document.getElementById("new-profile-info-form");
    childIDs = parentID.querySelectorAll('*[id]');
    return childIDs
}

function getModalInputsValues() { // Toma el valor de cada input del modal
    childIDs = getModalIDS()
    var inputs_values = [];    
    for (var i = 0, len = childIDs.length; i < len; ++i) {
        let input = childIDs[i].value;
        inputs_values.push(input);     
    }
    return inputs_values
}

function saveNewProfile() {   // Guarda, como objeto, los valores de los input. Luego como string para guardar en localStorage

    if (localStorage.getItem("profile_info_string") != null) {
        profile_info = JSON.parse(localStorage.getItem("profile_info_string"));
    } else {
        profile_info = {}
    }
    inputs_values = getModalInputsValues();
    unique_user = sessionStorage.getItem("Email");
    profile_info_user = {first_name: inputs_values[0], second_name: inputs_values[1], first_surname: inputs_values[2], second_surname: inputs_values[3], phone: inputs_values[4], email: inputs_values[5], age: inputs_values[6]};
    profile_info[unique_user] = profile_info_user;
    profile_info_string = JSON.stringify(profile_info);
    localStorage.setItem("profile_info_string", profile_info_string);
    localStorage.setItem(unique_user, "complete");

}

function getProfileDivsIDS() {  // Toma los ID de los div donde se muestra la info del usuario.
    names = document.getElementById("profile-names"); 
    surnames = document.getElementById("profile-surnames");
    phone = document.getElementById("profile-phone");
    email = document.getElementById("profile-email");
    age = document.getElementById("profile-age");
    inputs = [names, surnames, phone, email, age];
    return inputs;
}

function showProfileInfo() {      // Sobreescribe los div donde se muestra info de usuario, con nueva info.
    profile_inputs = getProfileDivsIDS();
    unique_user = sessionStorage.getItem("Email");
    new_profile_info_user = JSON.parse(localStorage.getItem("profile_info_string"));
    new_profile_info = new_profile_info_user[unique_user];

    profile_inputs[0].innerHTML = new_profile_info.first_name + " " + new_profile_info.second_name;
    profile_inputs[1].innerHTML = new_profile_info.first_surname + " " + new_profile_info.second_surname;        
    profile_inputs[2].innerHTML = new_profile_info.phone;   
    profile_inputs[3].innerHTML = new_profile_info.email;
    profile_inputs[4].innerHTML = new_profile_info.age;

    document.getElementById("profile_full_name").innerHTML =  new_profile_info.first_name + " " +  new_profile_info.first_surname
    
}

function loadActualProfile() {   // Hace que al abrir el modal, los inputs por default, muestren la info ya existente.
    unique_mail = sessionStorage.getItem("Email");
    if (localStorage.getItem(unique_mail) === "complete") {
        parentID = document.getElementById("new-profile-info-form");
        modal_inputs = parentID.querySelectorAll('*[id]');
        default_modal_inputs_users = JSON.parse(localStorage.getItem("profile_info_string"));
        default_modal_inputs = default_modal_inputs_users[unique_user];
            modal_inputs[0].value = default_modal_inputs.first_name;    
            modal_inputs[1].value = default_modal_inputs.second_name;    
            modal_inputs[2].value = default_modal_inputs.first_surname;
            modal_inputs[3].value = default_modal_inputs.second_surname;
            modal_inputs[4].value = default_modal_inputs.phone;
            modal_inputs[5].value = default_modal_inputs.email;
            modal_inputs[6].value = default_modal_inputs.age;  
    } 
}

///////////////////////////////////////////////////////////////////////////////////////

// Subir imagenes //

function getImgUploadMethod() {     // Obtiene el radio elegido
    
    var values = document.getElementsByName("imgUploadMethod");
    let selectedValue = ""
    for(var i = 0; i < values.length; i++) {
       if(values[i].checked == true) {
           selectedValue = values[i];
       }
     }
    return selectedValue.value;
}


function hideShowImageUploadOptions() {     // Muestra la opcion elegido, oculta la opuesta.

    let method_url = document.getElementById("div_profile_img_url");
    let method_upload = document.getElementById("div_profile_img_upload")
    var method = getImgUploadMethod();
    if (method === "upload") {
        method_upload.style.display = "block";
        method_url.style.display = "none";
    } else if (method === "url") {
        method_upload.style.display = "none";
        method_url.style.display = "block";
    }
}


function getuploadImage() {

    method = getImgUploadMethod();
    let img = document.getElementById("profile_img_"+method);
    let profile_image = document.getElementById("img_profile");
    profile_image.src = img.value;
    alert(img.value)
}