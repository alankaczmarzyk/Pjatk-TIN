import React from "react"
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { isAuthenticated } from '../../helpers/authHelper'
import {getUserCredentials } from "../../helpers/authHelper";


function Navigation(props) {
    const { t, i18n } = useTranslation();
    const user = getUserCredentials()

   
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng)
    }


    const loginLogoutLink = isAuthenticated() ? <button onClick={props.handleLogout}>{t('auth.logout')}</button> : <Link to="/login">{t('auth.pageTitle')}</Link>


    return (
        <nav>
            <ul>
                <li><Link to="/">{t('nav.main-page')}</Link></li>
                <li><Link to="/couriers">{t('nav.couriers')}</Link></li>
                <li><Link to="/orders">{t('nav.orders')}</Link></li>
                <li><Link to="/customers">{t('nav.customers')}</Link></li>
                {isAuthenticated() &&
            <td>
                <ul className="list-actions">
                    <li>
                    <p>{t('cour.fields.logged')}:<b>{user && (user.firstName +' '+user.lastName)}</b></p>
                    </li> 
                </ul>
            </td>
        }
                <li className='lang'>{loginLogoutLink}</li>
            </ul>
            <button type="button" onClick={() => changeLanguage('pl')}>PL</button>
            <button type="button" onClick={() => changeLanguage('en')}>EN</button>
        </nav>  

    
    )

}

export default Navigation