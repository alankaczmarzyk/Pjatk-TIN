import React from 'react';
import CustomerListTableRow from './CustomerListTableRow'
import { useTranslation } from 'react-i18next';


function CustomerListTable(props) {
    const customers = props.custList
    const { t, i18n } = useTranslation();
    return (
        <table className="table-list" >
            <thead>
                <tr>
                    <th>{t('cust.fields.firstName')}</th>
                    <th>{t('cust.fields.lastName')}</th>
                    <th>{t('cust.fields.city')}</th>
                    <th>{t('list.actions.title')}</th>
                </tr>
            </thead>
            <tbody>
                {customers.map(cust =>
                    <CustomerListTableRow custData={cust} key={cust._id} />
                )}
            </tbody>
        </table >
    )
}

export default CustomerListTable