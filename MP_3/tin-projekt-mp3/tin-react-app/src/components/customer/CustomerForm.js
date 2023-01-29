import { Link, useParams, useNavigate } from "react-router-dom"
import React, { useEffect, useState } from "react"
import FormMode from '../../helpers/formHelper'
import { getCustomerByIdApiCall, updateCustomerApiCall, addCustomerApiCall } from '../../apiCalls/customerApiCalls'
import { checkRequired, checkTextLengthRange, checkEmail, checkZipCode } from "../../helpers/validationCommon"
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons";
import { formValidationKeys } from '../../helpers/formHelper'
import { useTranslation } from 'react-i18next';

function CustomerForm() {
    const [cust, setCust] = useState({
        'firstName': '',
        'lastName': '',
        'street': '',
        'city': '',
        'zipCode': '',
        'email': ''
    })
    const [errors, setErrors] = useState({
        'firstName': '',
        'lastName': '',
        'street': '',
        'city': '',
        'zipCode': '',
        'email': ''
    })
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(null)
    const [message, setMessage] = useState(null)
    const [redirect, setRedirect] = useState(false)

    const { custId } = useParams()
    const currentFormMode = custId ? FormMode.EDIT : FormMode.NEW
    const navigate = useNavigate()  
    const { t, i18n } = useTranslation();

    function fetchCustomerDetails() {
        getCustomerByIdApiCall(custId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        setMessage(data.message)
                    } else {
                        setCust(data)
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
            fetchCustomerDetails()
        }
    }, [])



    function validateField(fieldName, fieldValue) {
        let errorMessage = ''
        if (fieldName === 'firstName') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = formValidationKeys.len_2_60
            }
        }
        if (fieldName === 'lastName') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = formValidationKeys.len_2_60
            }
        }
        if (fieldName === 'email') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = formValidationKeys.len_2_60
            }else if(!checkEmail(fieldValue)) {
                errorMessage = formValidationKeys.isEmail
            }
        }
        if (fieldName === 'street') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = formValidationKeys.len_2_60
            }
        }
        if (fieldName === 'city') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = formValidationKeys.len_2_60
            }
        }
        if (fieldName === 'zipCode') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = formValidationKeys.len_2_60
            }else if(!checkZipCode(fieldValue)) {
                errorMessage = formValidationKeys.isZipCode
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
        setCust({
            ...cust,
            [name]: value
        })
    }


    function handleSubmit(event) {
        event.preventDefault()
        const isValid = validateForm()
        if (isValid) {
            let promise, response
            if (currentFormMode === FormMode.NEW) {
                promise = addCustomerApiCall(cust)
            } else if (currentFormMode === FormMode.EDIT) {
                promise = updateCustomerApiCall(custId, cust)
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
        Object.entries(cust).forEach(([key, value]) => {
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
            navigate('/customers')
        }
    }, [redirect])

   
    const errorsSummary = hasErrors() ? 'Formularz zawiera błędy.' : ''
    const fetchError = error ? `Błąd: ${error.message}` : ''
    const globalErrorMessage = errorsSummary || fetchError || message
    
    const pageTitle = currentFormMode === FormMode.NEW ? t('cust.form.add.pageTitle') : t('cust.form.edit.pageTitle')
    return (
        <main>
            <h2>{pageTitle}</h2>
            <form className="form" onSubmit={handleSubmit}>
                <FormInput
                    type="text"
                    label={t('cust.fields.firstName')}
                    required
                    error={errors.firstName}
                    name='firstName'
                    placeholder={t('placeholders.2_60')}
                    onChange={handleChange}
                    value={cust.firstName}
                />
                <FormInput
                    type="text"
                    label={t('cust.fields.lastName')}
                    required
                    error={errors.lastName}
                    name='lastName'
                    placeholder={t('placeholders.2_60')}
                    onChange={handleChange}
                    value={cust.lastName}
                />
                <FormInput
                    type="text"
                    label={t('cust.fields.street')}
                    required
                    error={errors.street}
                    name='street'
                    placeholder={t('placeholders.2_60')}
                    onChange={handleChange}
                    value={cust.street}
                />
                <FormInput
                    type="text"
                    label={t('cust.fields.city')}
                    required
                    error={errors.city}
                    name='city'
                    placeholder={t('placeholders.2_60')}
                    onChange={handleChange}
                    value={cust.city}
                />
                <FormInput
                    type="text"
                    label={t('cust.fields.postCode')}
                    required
                    error={errors.zipCode}
                    name='zipCode'
                    placeholder={t('placeholders.post_Code')}
                    onChange={handleChange}
                    value={cust.zipCode}
                />
                <FormInput
                    type="text"
                    label={t('cust.fields.mail')}
                    required
                    error={errors.email}
                    name='email'
                    placeholder={t('placeholders.mail')}
                    onChange={handleChange}
                    value={cust.email}
                />
                <div className="form-buttons">
                    <FormButtons
                        formMode={currentFormMode}
                        error={globalErrorMessage}
                        cancelPath="/customers"
                    />
                </div>
            </form>
        </main >
    ) 
}

export default CustomerForm