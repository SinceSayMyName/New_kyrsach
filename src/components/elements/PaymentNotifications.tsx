import { Button, getSelectUtilityClasses, Typography } from '@mui/material';
import styles from './PaymentNotifications.module.scss';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotifications } from '../../root/rootSlice';
import { TransportReservation } from '../types/TransportReservation';
import { confirmPaymentAction, getNotificationsAction } from '../../root/sagas/plannerSagasActions';

function PaymentNotifications() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getNotificationsAction());
    }, [dispatch, getNotificationsAction])

    const notifications = useSelector(getNotifications) as TransportReservation[] | null;

    const confirm = useCallback((reservationID: number) => {
        dispatch(confirmPaymentAction(reservationID));
    }, [dispatch, confirmPaymentAction]);

    return (
        <div className={styles.FullScreen}>
            <div className={styles.InnerComponent}>
                {notifications?.map((notification: TransportReservation) => {
                    let price = 0;
                    notification.transportOptions.forEach(x => price += notification.withLuggage ? x.priceWithLuggage : x.price);
                    return <div className={styles.Notification}>
                        <Typography variant='h5' className={styles.Typography}>Заказ №{notification.id}, сумма к оплате: {price}</Typography>
                        <Button className={styles.PrimaryButton} onClick={() => confirm(notification.id)}>Подтвердить</Button>
                    </div>
                })}
            </div>
        </div>
    );
}

export default PaymentNotifications;
