import { Link } from "react-router-dom"
import { useTranslation } from 'react-i18next';

function OrderListTableRow(props) {
    const ord = props.orderData
    const { t, i18n } = useTranslation();
    return (
        <tr>
            <td>{ord.courier.firstName+" "+ord.courier.lastName}</td>
            <td>{ord.customer.firstName +" "+ord.customer.lastName}</td>
            <td>{ord.weight}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`/orders/details/${ord._id}`} className="list-actions-button-details">{t('list.actions.details')}</Link></li>
                    <li><Link to={`/orders/edit/${ord._id}`} className="list-actions-button-edit">{t('list.actions.edit')}</Link></li>
                    <li><Link onClick={(e)=>props.deleteOrder(e,ord._id)} className="list-actions-button-delete">{t('list.actions.delete')}</Link></li>
                </ul>
            </td>
        </tr>
    )
}

export default OrderListTableRow