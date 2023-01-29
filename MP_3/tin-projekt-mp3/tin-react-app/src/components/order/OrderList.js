import React, { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import OrderListTable from './OrderListTable';
import {deleteOrderApiCall, getOrdersApiCall } from '../../apiCalls/orderApiCalls'
import { useTranslation } from 'react-i18next';

function OrderList() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [orders, setOrders] = useState([]);
    let content;
    const { t, i18n } = useTranslation();

    function fetchOrdersList() {
        getOrdersApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true)
                    setOrders(data)
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
    }

    function deleteOrder(e, id) {
        e.preventDefault();
        deleteOrderApiCall(id)
            .then(res => res.json())
            .then(
                (data) => {
                    fetchOrdersList()
                },
                (error) => {
                    setError(error)
                }
            )
    }

    useEffect(() => {
        fetchOrdersList()
    }, [])

    if (error) {
        content = <p>Błąd: {error.message}</p>
    } else if (!isLoaded) {
        content = <p>{t('cour.details.loading')}</p>
    } else if (orders.length === 0) {
        content = <p>{t('ord.list.noData')}</p>
    } else {
        content = <OrderListTable ordersList={orders} deleteOrder={deleteOrder}/>
    }

    return (
        <main>
            <h2>{t('ord.list.pageTitle')}</h2>
            { content }
            <p className="section-buttons">
                <Link to="/orders/add" className="button-add">{t('ord.list.addNew')}</Link>
            </p>
        </main>
    )
}

export default OrderList