import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { isAuthenticated } from '../../helpers/authHelper'

function CourierListTableRow(props) {
    const cour = props.courData
    const { t, i18n } = useTranslation();
    return (
        <tr>
            <td>{cour.firstName}</td>
            <td>{cour.lastName}</td>
            <td>{cour.role == "user"?t('cour.fields.user') : t('cour.fields.admin')}</td>
            {isAuthenticated() &&
            <td>
                <ul className="list-actions">
                    <li><Link to={`/couriers/details/${cour._id}`} className="list-actions-button-details">{t('list.actions.details')}</Link></li>
                    <li><Link to={`/couriers/edit/${cour._id}`} className="list-actions-button-edit">{t('list.actions.edit')}</Link></li>
                    <li><Link onClick={(e)=>props.deleteCourier(e,cour._id)} className="list-actions-button-delete">{t('list.actions.delete')}</Link></li>
                </ul>
            </td>
        }

    {!isAuthenticated() &&
            <td>
                <ul className="list-actions">
                    <li>{t('auth.status')}</li>
                </ul>
            </td>
        }
        </tr>
    )
}

export default CourierListTableRow