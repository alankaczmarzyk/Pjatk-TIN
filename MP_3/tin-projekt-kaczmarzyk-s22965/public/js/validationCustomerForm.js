function validateForm() {
    let valid=true;
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const streetInput = document.getElementById('street');
    const cityInput = document.getElementById('city');
    const zipCodeInput = document.getElementById('zipCode');
    const emailInput = document.getElementById('mail');


    const errorFirstName = document.getElementById('errorFirstName');
    const errorLastName = document.getElementById('errorLastName');
    const errorStreet = document.getElementById('errorStreet');
    const errorCity = document.getElementById('errorCity');
    const errorZipCode = document.getElementById('errorZipCode');
    const errorEmail = document.getElementById('errorMail');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([firstNameInput, lastNameInput, streetInput, cityInput, zipCodeInput, emailInput], 
        [errorFirstName, errorLastName, errorStreet, errorCity, errorZipCode, errorEmail], errorsSummary);


    if(!checkRequired(firstNameInput.value)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole jest wymagane";
    }else if (!checkTextLengthRange(firstNameInput.value, 2, 60)) {
        valid=false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }


    if(!checkRequired(lastNameInput.value)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "Pole jest wymagane";
    }else if (!checkTextLengthRange(lastNameInput.value, 2, 60)) {
        valid=false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }


    if(!checkRequired(streetInput.value)) {
        valid = false;
        streetInput.classList.add("error-input");
        errorStreet.innerText = "Pole jest wymagane";
    }else if (!checkTextLengthRange(streetInput.value, 2, 60)) {
        valid=false;
        streetInput.classList.add("error-input");
        errorStreet.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }


    if(!checkRequired(cityInput.value)) {
        valid = false;
        cityInput.classList.add("error-input");
        errorCity.innerText = "Pole jest wymagane";
    }else if (!checkTextLengthRange(cityInput.value, 2, 60)) {
        valid=false;
        cityInput.classList.add("error-input");
        errorCity.innerText = "Takie miasto nie istnieje";
    }

    if(!checkRequired(zipCodeInput.value)) {
        valid = false;
        zipCodeInput.classList.add("error-input");
        errorZipCode.innerText = "Pole jest wymagane";
    } else if(!checkZipCode(zipCodeInput.value)) {
        valid = false;
        zipCodeInput.classList.add("error-input");
        errorZipCode.innerText = "Kod pocztowy nie został wpisany poprawnie";
    }


    function checkZipCode(value){
        if (!value)
            return false;
        
        value = value.toString().trim();
        const re = /^\d\d-\d\d\d$/;
        
        return re.test(value);
        }



    if (!checkRequired(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "Pole jest wymagane";
    }else if(!checkTextLengthRange(emailInput.value, 5,  60)){
        valid=false;
        emailInput.classList.add("error-input");
        errorEmail.innerHTML = "Pole powinno zawierać od 5 do 60 znaków";
    }else if(!checkEmail(emailInput.value)){
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "Email nie został wpisany poprawnie";
    }

    function checkEmail(value){
    if (!value)
        return false;
    
    value = value.toString().trim();
    const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    
    return re.test(value);
    }


    if(!valid){
        errorsSummary.innerText="Formularz zawiera błędy";
    }

    return valid;
}