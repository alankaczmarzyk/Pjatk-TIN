import { getFormattedDate } from "../../helpers/dataHelper"
import { useTranslation } from 'react-i18next';

function CourierDetailsData({cour}) {
    const { t, i18n } = useTranslation();
    return (
        <>
            <p>{t('cour.fields.firstName')}: {cour.firstName}</p>
            <p>{t('cour.fields.lastName')}: {cour.lastName} </p>
            <p>{t('cour.fields.email')}: {cour.email} </p>
            <p>{t('cour.fields.role')}: {cour.role == "user"?t('cour.fields.user') : t('cour.fields.admin')} </p>
            <table className="table-list">
                <thead>
                    <tr>
                        <th>{t('cour.form.order.customer')}</th>
                        <th>{t('cour.form.order.weight')}</th>
                        <th>{t('cour.form.order.date')}</th>
                        <th>{t('cour.form.order.price')}</th>
                    </tr>
                </thead>
                <tbody>
                    {cour.orders.map(
                        orders =>
                            <tr key={orders._id}>
                                <td>{orders.customer.firstName +" "+orders.customer.lastName}</td>
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

export default CourierDetailsData