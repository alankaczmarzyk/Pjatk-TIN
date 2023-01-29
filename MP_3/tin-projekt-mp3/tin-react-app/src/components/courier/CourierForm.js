import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import FormMode from '../../helpers/formHelper'
import { getCouriersApiCall, updateCourierApiCall, addCourierApiCall, getCourierByIdApiCall } from '../../apiCalls/courierApiCalls'
import { checkRequired, checkTextLengthRange, checkEmail } from "../../helpers/validationCommon"
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons";
import FormSelect from "../form/FormSelect";
import { formValidationKeys } from '../../helpers/formHelper'

export const ROLES = {USER:"user", ADMIN:"admin"}


function CourierForm() {
    const { courId } = useParams()
    const navigate = useNavigate()  
    const { t, i18n } = useTranslation();
    const currentFormMode = courId ? FormMode.EDIT : FormMode.NEW
    const [cour, setCour] = useState({
        'firstName': '',
        'lastName': '',
        'email': '',
        'role': ROLES.USER,
        ...(!courId && {password: ''})
    })
    const [errors, setErrors] = useState({
        'firstName': '',
        'lastName': '',
        'email': '',
        'password': '',
        'role':''
    })
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(null)
    const [message, setMessage] = useState(null)
    const [redirect, setRedirect] = useState(false)



    function fetchCourierDetails() {
        getCourierByIdApiCall(courId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        setMessage(data.message)
                    } else {
                        setCour(data)
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
            fetchCourierDetails()
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
            }else if (!checkEmail(fieldValue)) {
                errorMessage = formValidationKeys.isEmail
            }
        }
        console.log(fieldName)
        console.log(currentFormMode===FormMode.NEW)
        console.log(cour)
        if (fieldName === 'password' && currentFormMode===FormMode.NEW)  {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.notEmpty
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
        setCour({
            ...cour,
            [name]: value
        })
    }


    function handleSubmit(event) {
        event.preventDefault()
        const isValid = validateForm()
        if (isValid) {
            let promise, response
            if (currentFormMode === FormMode.NEW) {
                promise = addCourierApiCall(cour)
            } else if (currentFormMode === FormMode.EDIT) {
                promise = updateCourierApiCall(courId, cour)
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
                            }else if(response.status === 401){
                                navigate('/noaccess')
                            } 
                            else {
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
        Object.entries(cour).forEach(([key, value]) => {
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
            navigate('/couriers')
        }
    }, [redirect])

   
    const errorsSummary = hasErrors() ? 'Formularz zawiera błędy.' : ''
    const fetchError = error ? `Błąd: ${error.message}` : ''
    const globalErrorMessage = errorsSummary || fetchError || message
    
    const pageTitle = currentFormMode === FormMode.NEW ? t('cour.form.add.pageTitle') : t('cour.form.edit.pageTitle')
    return (
        <main>
            <h2>{pageTitle}</h2>
            <form className="form" onSubmit={handleSubmit}>
                <FormInput
                    type="text"
                    label={t('cour.fields.firstName')}
                    required
                    error={errors.firstName}
                    name='firstName'
                    placeholder={t('placeholders.2_60')}
                    onChange={handleChange}
                    value={cour.firstName}
                />
                <FormInput
                    type="text"
                    label={t('cour.fields.lastName')}
                    required
                    error={errors.lastName}
                    name='lastName'
                    placeholder={t('placeholders.2_60')}
                    onChange={handleChange}
                    value={cour.lastName}
                />
                <FormInput
                    type="text"
                    label={('Email')}
                    required
                    error={errors.email}
                    name='email'
                    placeholder={t('placeholders.mail')}
                    onChange={handleChange}
                    value={cour.email}
                />
                <FormInput
                    type="password"
                    label={t('cour.fields.password')}
                    required={currentFormMode===FormMode.NEW}
                    error={errors.password}
                    name='password'
                    onChange={handleChange}
                />
                <FormSelect
                    error={errors.role}
                    label={t('cour.fields.role')}
                    required
                    name='role'
                    options={Object.entries(ROLES).map(([key,value]) =>({label: key, value: value}))}
                    onChange={handleChange}
                    value={cour.role}
                />
                <div className="form-buttons">
                    <FormButtons
                        formMode={currentFormMode}
                        error={globalErrorMessage}
                        cancelPath="/couriers"
                    />
                </div>
            </form>
        </main >
    ) 
}

export default CourierForm;