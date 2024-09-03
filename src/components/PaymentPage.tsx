import styles from './Payment.module.scss';
import React, { useCallback, useMemo } from 'react';
import { Button, Snackbar, TextField, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import AppHeader from './elements/AppHeader';
import { useDispatch, useSelector } from 'react-redux';
import { getArrivalCity, getDepartureCity, getTransportType, getSeatsNumber, getSelectedOptions, getLuggageRequired } from '../root/searchSlice';
import { selectOptionAction } from '../root/sagas/plannerSagasActions';

function PaymentPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [email, setEmail] = React.useState("");

    const arrivalCity = useSelector(getArrivalCity);
    const departureCity = useSelector(getDepartureCity);
    const transportType = useSelector(getTransportType);
    const seatsNumber = useSelector(getSeatsNumber);
    const selectedOptions = useSelector(getSelectedOptions);
    const passengerCount = useSelector(getSeatsNumber);
    const luggageRequired = useSelector(getLuggageRequired);

    const headerText = useMemo(() => arrivalCity?.name + " - " + departureCity?.name + ", " + transportType?.name + ", " + seatsNumber?.toString() + " чел.", [])
    const { amountToPay } = useParams();

    const confim = useCallback(() => {
        if (!selectedOptions) return;
        for (let i = 0; i < selectedOptions.length; i++) {
            dispatch(selectOptionAction({ id: selectedOptions[i].id, passengerCount: passengerCount ?? 0, luggageRequired: luggageRequired ?? false, userEmail: email }));
        }
        setSnackbarOpen(true);
    }, [selectedOptions, selectOptionAction, dispatch, setSnackbarOpen, email, setEmail]);

    const back = useCallback(() => {
        navigate(`/Search`);
    }, [navigate]);

    return (
        <div className={styles.FullScreen}>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={snackbarOpen}
                message="Благодарим за покупку! Ожидайте подтверждения оплаты в личном кабинете."
                onClose={() => setSnackbarOpen(false)}
            />
            <AppHeader text={headerText} />
            <div className={styles.Window}>
                <Typography className={styles.Typography} variant="h5">Для оплаты билета необходимо перевести по номеру телефона:</Typography>
                <Typography className={styles.Typography} variant="h5">+7 922 337-37-10</Typography>
                <div className={styles.Separator} />
                <Typography className={styles.Typography} variant="h5">Сумма к оплате: {amountToPay}</Typography>
                <div className={styles.OptionRow}>
                    <Typography className={styles.Label} variant="h5">Введите e-mail для отправки билета и чека:</Typography>
                    <TextField className={styles.TextField} onChange={e => setEmail(e.target.value)} value={email} />
                </div>
                <Button className={styles.PrimaryButton} onClick={back}>Назад</Button>
                <Button className={styles.PrimaryButton} onClick={confim}>Подтвердить оплату</Button>
            </div>
        </div>
    );
}

export default PaymentPage;




