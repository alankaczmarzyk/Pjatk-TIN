import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom'

function CourierAccessDenied(props) {
    const { t, i18n } = useTranslation();
    return (
        <main>
        <table className="table-list" >
            <thead>
                <tr>
                    <th>Brak dostępu.</th>
                </tr>
            </thead>
            <tbody>
                <th>Zaloguj się na konto admina.</th>
            </tbody>
        </table><br></br>
                    <div className="section-buttons">
                    <Link to="/couriers" className="form-button-cancel">{t('form.actions.return')}</Link>
                </div>

     </main>                  
    )
}

export default CourierAccessDenied