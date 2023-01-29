import { Link } from 'react-router-dom'
import { deleteCourierApiCall, getCouriersApiCall } from '../../apiCalls/courierApiCalls'
import CourierListTable from './CourierListTable';
import React, { useEffect, useState } from "react"
import { useTranslation } from 'react-i18next';

function CourierList() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [couriers, setCouriers] = useState([]);  
    let content;
    const { t, i18n } = useTranslation();

    function fetchCourierList() {
        getCouriersApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true)
                    setCouriers(data)
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
    }

    function deleteCourier(e, id) {
        e.preventDefault();
        deleteCourierApiCall(id)
            .then(res => res.json())
            .then(
                (data) => {
                    fetchCourierList()
                },
                (error) => {
                    setError(error)
                }
            )
    }

    useEffect(() => {
        fetchCourierList()
    }, [])

   
    if (error) {
        content = <p>Błąd: {error.message}</p>
    } else if (!isLoaded) {
        content = <p>{t('cour.details.loading')}</p>
    } else {
        content = <CourierListTable courList={couriers} deleteCourier={deleteCourier} />
    }

return (
    <main>
        <h2>{t('cour.list.pageTitle')}</h2>
        { content}
        <p className="section-buttons">
            <Link to="/couriers/add" className="button-add">{t('cour.list.addNew')}</Link>
        </p>
    </main>
)

}

export default CourierList