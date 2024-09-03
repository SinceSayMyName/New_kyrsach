import { Button } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './Admin.module.scss';
import AppHeader from './elements/AppHeader';
import EditTransportOptions from './elements/EditTransportOptions';
import PaymentNotifications from './elements/PaymentNotifications';
import { useDispatch } from 'react-redux';
import { getTransportTypeAction, getTransportsAction, getCompaniesAction, getAllOptionsAction, getCitiesAction } from '../root/sagas/plannerSagasActions';

function AdminPage() {
    const dispatch = useDispatch();
    const headerText = useMemo(() => "Администрирование сайта", []);

    useEffect(() => {
        dispatch(getTransportsAction());
        dispatch(getCompaniesAction());
        dispatch(getAllOptionsAction());
        dispatch(getTransportTypeAction());
        dispatch(getCitiesAction());
    }, [])

    const [isEditTransportOptions, setIsEditTransportOptions] = useState(true);
    const [isPaymentNotification, setIsPaymentNotification] = useState(false);

    const changeToEditTransportOptions = useCallback(() => {
        setIsEditTransportOptions(true);
        setIsPaymentNotification(false);
    }, [setIsEditTransportOptions, setIsPaymentNotification]);

    const changeToPaymentNotification = useCallback(() => {
        setIsEditTransportOptions(false);
        setIsPaymentNotification(true);
    }, [setIsEditTransportOptions, setIsPaymentNotification]);

    return (
        <div className={styles.FullScreen}>
            <AppHeader text='Администрирование' />
            <div className={styles.Tabs} >
                <Button className={styles.SecondaryButton} variant='text' onClick={changeToEditTransportOptions}>Рейсы</Button>
                <Button className={styles.SecondaryButton} variant='text' onClick={changeToPaymentNotification}>Уведомления об оплате</Button>
            </div>
            <div>
                {isEditTransportOptions && <EditTransportOptions />}
                {isPaymentNotification && <PaymentNotifications />}
            </div>
        </div>
    );
}

export default AdminPage;
