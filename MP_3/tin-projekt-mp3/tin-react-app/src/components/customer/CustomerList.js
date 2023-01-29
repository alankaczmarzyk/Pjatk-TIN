import { Link } from 'react-router-dom'
import { getCustomersApiCall } from '../../apiCalls/customerApiCalls'
import CustomerListTable from './CustomerListTable';
import React, { useEffect, useState } from "react"
import { useTranslation } from 'react-i18next';

function CourierList() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [customers, setCustomers] = useState([]);  
    let content;
    const { t, i18n } = useTranslation();

    function fetchCustomerList() {
        getCustomersApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true)
                    setCustomers(data)
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
    }

    useEffect(() => {
        fetchCustomerList()
    }, [])

   
    if (error) {
        content = <p>Błąd: {error.message}</p>
    } else if (!isLoaded) {
        content = <p>{t('cust.details.loading')}.</p>
    } else {
        content = <CustomerListTable custList={customers} />
    }

return (
    <main>
        <h2>{t('cust.list.pageTitle')}</h2>
        { content}
        <p className="section-buttons">
            <Link to="/customers/add" className="button-add">{t('cust.list.addNew')}</Link>
        </p>
    </main>
)

}

export default CourierList