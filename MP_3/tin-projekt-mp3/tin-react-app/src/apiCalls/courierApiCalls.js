import { getCurrentUser } from "../helpers/authHelper";
const couriersBaseUrl = 'http://localhost:3000/api/couriers'


export function getCouriersApiCall() {
    const promise = fetch(couriersBaseUrl)
    return promise;
}

export function getCourierByIdApiCall(courId) {
    const url = `${couriersBaseUrl}/${courId}`;
    const promise = fetch(url);
    return promise;
}

export function addCourierApiCall(cour) {
    console.log(cour)
    const user = getCurrentUser()
    const empString = JSON.stringify(cour)
    let token
    if (user && user.token) {
        token = user.token
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: empString
    }
    const promise = fetch(couriersBaseUrl, options);
    return promise;
}

export function updateCourierApiCall(courId, cour) {
    const user = getCurrentUser()
    const url = `${couriersBaseUrl}/${courId}`
    const courString = JSON.stringify(cour)
    let token
    if (user && user.token) {
        token = user.token
    }

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: courString
    }
    const promise = fetch(url, options);
    return promise;
}

export function deleteCourierApiCall(courId) {
    const user = getCurrentUser()
    let token
    if (user && user.token) {
        token = user.token
    }
    const url = `${couriersBaseUrl}/${courId}`
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