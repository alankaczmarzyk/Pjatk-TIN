import { Link, useParams, useNavigate } from "react-router-dom"
import React, { useEffect, useState } from "react"
import FormMode from '../../helpers/formHelper'
import {getFormattedDate} from '../../helpers/dataHelper'
import { getOrderByIdApiCall, updateOrderApiCall, addOrderApiCall } from '../../apiCalls/orderApiCalls'
import { checkRequired, checkTextLengthRange, checkEmail } from "../../helpers/validationCommon"
import { getCouriersApiCall } from '../../apiCalls/courierApiCalls'
import { getCustomersApiCall } from '../../apiCalls/customerApiCalls'
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons";
import { formValidationKeys } from '../../helpers/formHelper'
import { useTranslation } from 'react-i18next';

function OrderForm() {
    const [ord, setOrd] = useState({
        'courier_id': '',
        'customer_id': '',
        'weight': '',
        'date': '',
        'price': '',
    })
    const [errors, setErrors] = useState({
        'courier_id': '',
        'customer_id': '',
        'weight': '',
        'date': '',
        'price': '',
    })
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(null)
    const [message, setMessage] = useState(null)
    const [redirect, setRedirect] = useState(false)

    const { ordId } = useParams()
    const currentFormMode = ordId ? FormMode.EDIT : FormMode.NEW
    const navigate = useNavigate()  
    const [cours, setCours] = useState([]);
    const [custs, setCusts] = useState([]);
    const { t, i18n } = useTranslation();


    function fetchOrderDetails() {
        getOrderByIdApiCall(ordId)
            .then(res => res.json())
            .then(
                (data) => {
                    console.log(data);
                    if (data.message) {
                        setMessage(data.message)
                    } else {
                        setOrd(data)
                        setMessage(null)
                    }
                    setIsLoaded(true)
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                })      
    }

    function fetchCouriers(){
        getCouriersApiCall()
        .then(res => res.json())
        .then(
            (data) => {
                if (data.message) {
                    setMessage(data.message)
                } else {
                    setCours(data)
                    setMessage(null)
                }
                setIsLoaded(true)
            },
            (error) => {
                setIsLoaded(true)
                setError(error)
            })
        }

        function fetchCustomers(){
            getCustomersApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        setMessage(data.message)
                    } else {
                        setCusts(data)
                        setMessage(null)
                    }
                    setIsLoaded(true)
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                })
            }    


    useEffect(() => {
        if (currentFormMode === FormMode.EDIT) {
            fetchOrderDetails()
          
        }
        fetchCouriers()
        fetchCustomers()
    }, [])



    function validateField(fieldName, fieldValue) {
        let errorMessage = ''
        if (fieldName === 'weight') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = formValidationKeys.len_2_60
            }
        }
        if (fieldName === 'date') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } 
        }
        if (fieldName === 'price') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = formValidationKeys.len_2_60
            }
        }
        return errorMessage;
    }

    function handleChange(event) {
        const { name, value } = event.target
        const errorMessage = validateField(name, value)
        setErrors({
            ...errors,
            [name]: errorMessage
        })
        setOrd({
            ...ord,
            [name]: value
        })
    }


    function handleSubmit(event) {
        ord.courier_id = parseInt(ord.courier_id);
        ord.customer_id = parseInt(ord.customer_id);
        event.preventDefault()
        const isValid = validateForm()
        if (isValid) {
            let promise, response
            if (currentFormMode === FormMode.NEW) {
                promise = addOrderApiCall(ord)
            } else if (currentFormMode === FormMode.EDIT) {
                promise = updateOrderApiCall(ordId, ord)
            }
            if (promise) {
                promise
                    .then(
                        (data) => {
                            response = data
                            if (response.status === 201 || response.status === 500) {
                                return data.json()
                            }
                        }
                    )
                    .then(
                        (data) => {
                            if (!response.ok && response.status === 500) {
                                const serverFieldsErrors = {...errors}
                                for (const i in data) {
                                    const errorItem = data[i]
                                    const errorMessage = errorItem.message
                                    const fieldName = errorItem.path
                                    serverFieldsErrors[fieldName] = errorMessage
                                }
                                setErrors(serverFieldsErrors)
                                setError(null)
                            } else {
                                setRedirect(true)
                            }
                        },
                        (error) => {
                            setError(error)
                        }
                    )
            }
        }
    }

    function validateForm() {
        let isValid = true
        let serverFieldsErrors = {...errors}
        Object.entries(ord).forEach(([key, value]) => {
            const errorMessage = validateField(key, value)
            serverFieldsErrors[key] = errorMessage
            if (errorMessage.length > 0) {
                isValid = false
            }
        })
        setErrors(serverFieldsErrors)
        return isValid
    }

    function hasErrors() {
        Object.values(errors).forEach((value) => {
            if (value.length > 0) {
                return true
            }
        })
        return false
    }

    useEffect(() => {
        if (redirect) {
            navigate('/orders')
        }
    }, [redirect])

   
    const errorsSummary = hasErrors() ? 'Formularz zawiera błędy.' : ''
    const fetchError = error ? `Błąd: ${error.message}` : ''
    const globalErrorMessage = errorsSummary || fetchError || message
    
    const pageTitle = currentFormMode === FormMode.NEW ? t('ord.form.add.pageTitle') : t('ord.form.edit.pageTitle')
    return (
        <main>
            <h2>{pageTitle}</h2>
            <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="courier_id">{t('ord.fields.courierData')}: <abbr title="required" aria-label="required">*</abbr></label>
                <select id="courier_id" name="courier_id" required onChange={handleChange}>
                    <option value="">--- Wybierz kuriera ---</option>

                    {cours.map(cour =>
                        (<option key={cour._id} value={cour._id} label={cour.firstName + " " + cour.lastName} selected={ord.courier_id === cour._id} ></option>)
                    )}
                </select>
                <span id="errorCourier" className="errors-text"></span>

                <label htmlFor="customer_id">{t('ord.fields.customerData')}: <abbr title="required" aria-label="required">*</abbr></label>
                <select id="customer_id" name="customer_id" required onChange={handleChange}>
                    <option value="">--- Wybierz klienta ---</option>
                    {custs.map(cust =>
                          (<option key={cust._id} value={cust._id} label={cust.firstName + " " + cust.lastName} selected={ord.customer_id === cust._id}></option>)
                    )}
                </select>
                <span id="errorCustomer" className="errors-text"></span>

                <FormInput
                    type="date"
                    label={t('ord.fields.date')}
                    required
                    error={errors.date}
                    name='date'
                    onChange={handleChange}
                    value={ord.date && getFormattedDate(ord.date)}
                />      
                <FormInput
                    type="text"
                    label={t('ord.fields.weight')}
                    required
                    error={errors.weight}
                    name='weight'
                    placeholder={t('placeholders.weight')}
                    onChange={handleChange}
                    value={ord.weight}
                />
                <FormInput
                    type="text"
                    label={t('ord.fields.price')}
                    required
                    error={errors.price}
                    name='price'
                    placeholder={t('placeholders.price')}
                    onChange={handleChange}
                    value={ord.price}
                />
                <div className="form-buttons">
                    <FormButtons
                        formMode={currentFormMode}
                        error={globalErrorMessage}
                        cancelPath="/orders"
                    />
                </div>
            </form>
        </main >
    ) 
}

export default OrderForm