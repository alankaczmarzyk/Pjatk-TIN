import { getFormattedDate } from '../../helpers/dataHelper';
import { useTranslation } from 'react-i18next';

function OrderDetailsData(props) {
    const { t, i18n } = useTranslation();
    const order = props.orderData
    const orderDate = order.date ? getFormattedDate(order.date) : ""
   
    return (
        <>
            <p>{t('ord.fields.courierData')}: {order.courier.firstName +" "+order.courier.lastName}</p>
            <p>{t('ord.fields.customerData')}: {order.customer.firstName +" "+order.customer.lastName} </p>
            <p>{t('ord.fields.weight')}: {order.weight} </p>
            <p>{t('ord.fields.date')}: {orderDate} </p>
            <p>{t('ord.fields.price')}: {order.price} </p>
        </>
    )
}

export default OrderDetailsData