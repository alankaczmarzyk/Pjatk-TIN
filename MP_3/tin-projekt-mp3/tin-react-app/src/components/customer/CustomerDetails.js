import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getCustomerByIdApiCall } from '../../apiCalls/customerApiCalls'
import CustomerDetailsData from './CustomerDetailsData';
import { useTranslation } from 'react-i18next';


function CustomerDetails() {
    let { custId } = useParams()
    custId = parseInt(custId)
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [customers, setCustomers] = useState([]);  
    const [message, setMessage] = useState([]);  
    const { t, i18n } = useTranslation();
    
    function fetchCustomerDetails() {
        getCustomerByIdApiCall(custId)
            .then(res =>{ console.log(res); return res.json();})
            .then(
                (data) => {
                    if (data.message) {
                        setCustomers(null)
                        setMessage(data.message)
                    } else {
                        setCustomers(data)
                        setMessage(null)
                    }
                    setIsLoaded(true)
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
    }

    useEffect(() => {
        fetchCustomerDetails()
    }, [])

    let content;

    if (error) {
        content = <p>Error: {error.message}</p>
    } else if (!isLoaded) {
        content = <p>{t('cust.details.loading')}</p>
    } else if (message) {
        content = <p>{message}</p>
    } else {
        content = <CustomerDetailsData cust={customers} />
    }
    return (
        <main>
            <h2>{t('cust.list.title')}</h2>
            {content} 
            <div className="section-buttons">
                <Link to="/customers" className="list-actions-button-details">{t('form.actions.return')}</Link>
            </div>
        </main>
    )
   
}
export default CustomerDetails