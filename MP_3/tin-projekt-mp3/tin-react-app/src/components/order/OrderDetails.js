import { Link, useParams } from 'react-router-dom'
import { getOrderByIdApiCall } from '../../apiCalls/orderApiCalls'
import React, { useEffect, useState } from "react"
import OrderDetailsData from './OrderDetailsData';
import { useTranslation } from 'react-i18next';

function OrderDetails() {
    let { ordId } = useParams()
    ordId = parseInt(ordId)
    const [orders, setOrder] = useState({});
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [message, setMessage] = useState(null);
    const { t, i18n } = useTranslation();

    function fetchOrderDetails() {
        getOrderByIdApiCall(ordId)
        .then(res =>{ console.log(res); return res.json();})
            .then(
                (data) => {
                    if (data.message) {
                        setOrder(null)
                        setOrder(data.message)
                    } else {
                        setOrder(data)
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
        fetchOrderDetails()
    }, [])

    let content
    if (error) {
        content = <p>Błąd: {error.message}</p>
    } else if (!isLoaded) {
        content = <p>{t('ord.details.loading')}</p>
    } else {
        content = <OrderDetailsData orderData={orders} />
    }

    return (
        <main>
             <h2>{t('ord.list.title')}</h2>
            { content }
            <div className="section-buttons">
                <Link to="/orders" className="list-actions-button-details">{t('form.actions.return')}</Link>
            </div>
        </main>
    )

}

export default OrderDetails