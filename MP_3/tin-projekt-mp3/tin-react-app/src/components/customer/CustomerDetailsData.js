import { getFormattedDate } from "../../helpers/dataHelper"
import { useTranslation } from 'react-i18next';

function CustomerDetailsData({cust}) {
    const { t, i18n } = useTranslation();
    return (
        <>
            <p>{t('cust.fields.firstName')}:: {cust.firstName}</p>
            <p>{t('cust.fields.lastName')}:: {cust.lastName} </p>
            <p>{t('cust.fields.street')}:: {cust.street} </p>
            <p>{t('cust.fields.city')}:: {cust.city} </p>
            <p>{t('cust.fields.postCode')}:: {cust.zipCode} </p>
            <p>{t('cust.fields.mail')}:: {cust.email} </p>
            <h2>{t('cust.form.order.title')}</h2>
            <table className="table-list">
                <thead>
                    <tr>
                        <th>{t('cust.form.order.courier')}</th>
                        <th>{t('cust.form.order.weight')}</th>
                        <th>{t('cust.form.order.date')}</th>
                        <th>{t('cust.form.order.price')}</th>
                    </tr>
                </thead>
                <tbody>
                    {cust.orders.map(
                        orders =>
                            <tr key={orders._id}>
                                <td>{orders.courier.firstName +" "+orders.courier.lastName}</td>
                                <td>{orders.weight}</td>
                                <td>{orders.date ? getFormattedDate(orders.date) : ""}</td>
                                <td>{orders.price}</td>
                            </tr>
                    )}
                </tbody>
            </table>
        </>
    )
}

export default CustomerDetailsData