import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function CustomerListTableRow(props) {
    const cust = props.custData
    const { t, i18n } = useTranslation();
    return (
        <tr>
            <td>{cust.firstName}</td>
            <td>{cust.lastName}</td>
            <td>{cust.city}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`/customers/details/${cust._id}`} className="list-actions-button-details">{t('list.actions.details')}</Link></li>
                    <li><Link to={`/customers/edit/${cust._id}`} className="list-actions-button-edit">{t('list.actions.edit')}</Link></li>
                    <li><Link to={`/customers/delete/${cust._id}`} className="list-actions-button-delete">{t('list.actions.delete')}</Link></li>
                </ul>
            </td>
        </tr>
    )
}

export default CustomerListTableRow