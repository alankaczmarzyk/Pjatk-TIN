const customersBaseUrl = 'http://localhost:3000/api/customers'

export function getCustomersApiCall() {
    const promise = fetch(customersBaseUrl)
    return promise;
}

export function getCustomerByIdApiCall(custId) {
    const url = `${customersBaseUrl}/${custId}`;
    const promise = fetch(url);
    return promise;
}

export function addCustomerApiCall(cust) {
    const custString = JSON.stringify(cust)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: custString
    }
    const promise = fetch(customersBaseUrl, options);
    return promise;
}

export function updateCustomerApiCall(custId, cust) {
    const url = `${customersBaseUrl}/${custId}`
    const custString = JSON.stringify(cust)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: custString
    }
    const promise = fetch(url, options);
    return promise;
}