import React, { useEffect, useState } from "react"
import { Link, useParams } from 'react-router-dom'
import { getCourierByIdApiCall } from '../../apiCalls/courierApiCalls'
import CourierDetailsData from './CourierDetailsData';
import { useTranslation } from 'react-i18next';

function CourierDetails() {
    let { courId } = useParams()
    courId = parseInt(courId)
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [couriers, setCouriers] = useState([]);  
    const [message, setMessage] = useState([]);  
    const { t, i18n } = useTranslation();

    function fetchCourierDetails() {
        getCourierByIdApiCall(courId)
            .then(res =>{ console.log(res); return res.json();})
            .then(
                (data) => {
                    if (data.message) {
                        setCouriers(null)
                        setMessage(data.message)
                    } else {
                        setCouriers(data)
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
        fetchCourierDetails()
    }, [])

    let content;

    if (error) {
        content = <p>Error: {error.message}</p>
    } else if (!isLoaded) {
        content = <p>{t('cour.details.loading')}</p>
    } else if (message) {
        content = <p>{message}</p>
    } else {
        content = <CourierDetailsData cour={couriers} />
    }
    return (
        <main>
            <h2>{t('cour.list.title')}</h2>
            {content} 
            <div className="section-buttons">
                <Link to="/couriers" className="list-actions-button-details">{t('form.actions.return')}</Link>
            </div>
        </main>
    )

}
export default CourierDetails