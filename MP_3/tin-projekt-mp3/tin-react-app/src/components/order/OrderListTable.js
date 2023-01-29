import OrderListTableRow from './OrderListTableRow'
import { useTranslation } from 'react-i18next';

function OrderListTable(props) {
    const orders = props.ordersList
    const { t, i18n } = useTranslation();
    return (
        <table className="table-list">
            <thead>
                <tr>
                    <th>{t('ord.fields.courierData')}</th>
                    <th>{t('ord.fields.customerData')}</th>
                    <th>{t('ord.fields.weight')}</th>
                    <th>{t('list.actions.title')}</th>
                </tr>
            </thead>
            <tbody>
                {orders.map(order =>
                    <OrderListTableRow orderData={order} key={order._id} deleteOrder={props.deleteOrder}/>
                )}
            </tbody>
        </table>
    )
}

export default OrderListTable