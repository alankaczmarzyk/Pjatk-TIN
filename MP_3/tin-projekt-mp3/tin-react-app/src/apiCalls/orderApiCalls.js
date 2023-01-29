import { getCurrentUser } from "../helpers/authHelper";
const ordersBaseUrl = 'http://localhost:3000/api/orders'

export function getOrdersApiCall() {
    const promise = fetch(ordersBaseUrl)
    return promise;
}

export function getOrderByIdApiCall(custId) {
    const url = `${ordersBaseUrl}/${custId}`;
    const promise = fetch(url);
    return promise;
}

export function addOrderApiCall(ord) {
    const ordString = JSON.stringify(ord)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: ordString
    }
    const promise = fetch(ordersBaseUrl, options);
    return promise;
}

export function updateOrderApiCall(ordId, ord) {
    const url = `${ordersBaseUrl}/${ordId}`
    const ordString = JSON.stringify(ord)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: ordString
    }
    const promise = fetch(url, options);
    return promise;
}

export function deleteOrderApiCall(ordId) {
    const user = getCurrentUser()
    let token
    if (user && user.token) {
        token = user.token
    }
    const url = `${ordersBaseUrl}/${ordId}`
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    const promise = fetch(url, options);
    return promise;
}