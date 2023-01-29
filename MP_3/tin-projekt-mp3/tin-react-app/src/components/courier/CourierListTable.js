import React from 'react';
import CourierListTableRow from './CourierListTableRow'
import { useTranslation } from 'react-i18next';

function CourierListTable(props) {
    const couriers = props.courList
    const { t, i18n } = useTranslation();
    return (
        <table className="table-list" >
            <thead>
                <tr>
                    <th>{t('cour.fields.firstName')}</th>
                    <th>{t('cour.fields.lastName')}</th>
                    <th>{t('cour.fields.role')}</th>
                    <th>{t('list.actions.title')}</th>
                </tr>
            </thead>
            <tbody>
                {couriers.map(cour =>
                    <CourierListTableRow courData={cour} key={cour._id} deleteCourier={props.deleteCourier} />
                )}
            </tbody>
        </table >
    )
}

export default CourierListTable