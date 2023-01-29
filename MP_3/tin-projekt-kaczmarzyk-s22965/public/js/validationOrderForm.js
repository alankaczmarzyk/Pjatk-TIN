function validateForm() {
    let valid=true;
    const courierInput = document.getElementById('courier');
    const customerInput = document.getElementById('customer');
    const weightInput = document.getElementById('weight');
    const dateInput = document.getElementById('date');
    const priceInput = document.getElementById('price');

    const errorCourier = document.getElementById('errorCourier');
    const errorCustomer = document.getElementById('errorCustomer');
    const errorWeight = document.getElementById('errorWeight');
    const errorDate = document.getElementById('errorDate');
    const errorPrice = document.getElementById('errorPrice');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([courierInput, customerInput, weightInput, dateInput, priceInput], 
        [errorCourier, errorCustomer, errorWeight, errorDate, errorPrice], errorsSummary);    

    
        if(!checkRequired(courierInput.value) || courierInput.value == "-- Wybierz kuriera --") {
            valid = false;
            courierInput.classList.add("error-input");
            errorCourier.innerText = "Pole jest wymagane";
        }


        if(!checkRequired(customerInput.value) || customerInput.value == "-- Wybierz klienta --") {
            valid = false;
            customerInput.classList.add("error-input");
            errorCustomer.innerText = "Pole jest wymagane";
        }


        if(!checkRequired(weightInput.value)) {
            valid = false;
            weightInput.classList.add("error-input");
            errorWeight.innerText = "Pole jest wymagane";
        }else if (!checkNumber(weightInput.value)) {
            valid=false;
            weightInput.classList.add("error-input");
            errorWeight.innerText = "Pole powinno być liczbą";
        }else if(!checkNumberRange(weightInput.value,0.1,1_000_000)){
            valid=false;
            weightInput.classList.add("error-input");
            errorWeight.innerText = "Pole powinno być liczbą o mimimalnej wadze 0.1kg";

        }

        
        let nowDate = new Date(),
            month = '' + (nowDate.getMonth() +1),
            day = '' + nowDate.getDate(),
            year = nowDate.getFullYear();

        if(month.length < 2) 
            month = '0'+ month;
        if(day.length < 2) 
            day = '0' + day;

        const nowString = [year, month, day].join('-');

        if(!checkRequired(dateInput.value)) {
            // valid = false;
            // dateInput.classList.add("error-input");
            // errorDate.innerText = "Pole jest wymagane";
        }else if (!checkDate(dateInput.value)) {
            valid=false;
            dateInput.classList.add("error-input");
            errorDate.innerText = "Pole powinno zawierać datę w formacie yyyy-MM-dd (np. 2000-01-01)";
        }else if(checkDateIfAfter(dateInput.value,nowString)){
            valid=false;
            dateInput.classList.add("error-input");
            errorDate.innerText = "Data dostarczenia przesyłki nie może być z przyszłości";

        }


        if(!checkRequired(priceInput.value)) {
            valid = false;
            priceInput.classList.add("error-input");
            errorPrice.innerText = "Pole jest wymagane";
        }else if (!checkNumber(priceInput.value)) {
            valid=false;
            priceInput.classList.add("error-input");
            errorPrice.innerText = "Pole powinno być liczbą";
        }else if(!checkNumberRange(priceInput.value,1,1_000_000)){
            valid=false;
            priceInput.classList.add("error-input");
            errorPrice.innerText = "Pole powinno być liczbą w zakresie od 1 do 1000000";

        }


        if(!valid){
            errorsSummary.innerText="Formularz zawiera błędy";
        }
    
        return valid;


}