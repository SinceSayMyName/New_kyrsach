import styles from './TravelOptionComponent.module.scss';
import React, { useCallback, useMemo } from 'react';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectOptionAction } from '../../root/sagas/plannerSagasActions';
import { TravelOption } from '../types/TravelOption';
import { getCities } from '../../root/rootSlice';
import { getSeatsNumber, setLuggageRequired, setSelectedOptions } from '../../root/searchSlice';

function GetFormattedDate(initialDate: Date) {
    var date = new Date(initialDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return (day < 10 ? "0" : "") + day.toString() + "." + (month < 10 ? "0" : "") + month.toString();
}

function GetFormattedTime(initialDate: Date) {
    var date = new Date(initialDate);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return (hours < 10 ? "0" : "") + hours.toString() + ":" + (minutes < 10 ? "0" : "") + minutes.toString();
}

function GetDuration(start: Date, end: Date) {
    var arrivalDate = new Date(end);
    var departureDate = new Date(start);
    const inMilliseconds = arrivalDate.valueOf() - departureDate.valueOf();
    const inMinutes = Math.round(inMilliseconds / 1000 / 60);
    const hours = Math.floor(inMinutes / 60);
    const minutes = inMinutes - hours * 60;
    return hours + " ч. " + minutes + " мин.";
}

function TravelOptionComponent(props: TravelOption) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const startOption = useMemo(() => props.transportOptions?.length > 0 ? props.transportOptions[0] : undefined, [props])
    const endOption = useMemo(() => props.transportOptions?.length > 0 ? props.transportOptions[props.transportOptions.length - 1] : undefined, [props])

    const cities = useSelector(getCities);
    const seatsNumber = useSelector(getSeatsNumber);

    const choose = useCallback((price: number, withLuggage: boolean) => {
        dispatch(setSelectedOptions(props.transportOptions));
        dispatch(setLuggageRequired(withLuggage));
        navigate(`/Payment/` + price);
    }, [dispatch, navigate, selectOptionAction, props]);

    const dapartureDate = useMemo(() => startOption ? GetFormattedDate(startOption.departureDate) : undefined, [startOption]);
    const dapartureTime = useMemo(() => startOption ? GetFormattedTime(startOption.departureDate) : undefined, [startOption]);
    const arrivalDate = useMemo(() => endOption ? GetFormattedDate(endOption.arrivalDate) : undefined, [endOption]);
    const arrivalTime = useMemo(() => endOption ? GetFormattedTime(endOption.arrivalDate) : undefined, [endOption]);

    const duration = useMemo(() => (endOption && startOption) ? GetDuration(startOption.departureDate, endOption.arrivalDate) : undefined, [startOption, endOption]);

    const priceWithLuggageTag = useMemo(() => "С багажом", []);
    const priceWithoutLuggageTag = useMemo(() => "Без багажа", []);

    const priceWithLuggage = useMemo(() => {
        let price = 0;
        for (let i = 0; i < props.transportOptions?.length; i++) {
            price += props.transportOptions[i].priceWithLuggage;
        }
        return (seatsNumber ? seatsNumber : 1) * price;
    }, [seatsNumber, props]);

    const priceWithoutLuggage = useMemo(() => {
        let price = 0;
        for (let i = 0; i < props.transportOptions?.length; i++) {
            price += props.transportOptions[i].price;
        }
        return (seatsNumber ? seatsNumber : 1) * price;
    }, [seatsNumber, props]);

    const companiesString = useMemo(() => props.transportOptions?.map(x => x.company?.name).join(", "), [props]);

    const transfers = useMemo(() => {
        let transfers = [];
        for (let i = 1; i < props.transportOptions?.length; i++) {
            const duration = GetDuration(props.transportOptions[i - 1].arrivalDate, props.transportOptions[i].departureDate);
            const city = cities?.find(x => x.fiasCode === props.transportOptions[i].departureCityCode)?.name;
            transfers.push("Пересадка " + duration + ", " + city)
        }
        return transfers.join(", ");
    }, [props]);


    return (
        <div className={styles.Option}>
            <div className={styles.InfoColumn}>
                <Typography className={styles.Companies} variant="h5">{companiesString}</Typography>
                <div className={styles.TimeRow}>
                    <div className={styles.DateColumn}>
                        <Typography className={styles.Date} variant="h5">{cities?.find(x => x.fiasCode === startOption?.departureCityCode)?.name}</Typography>
                        <Typography className={styles.Date} variant="h5">{dapartureDate}</Typography>
                        <Typography className={styles.Time} variant="h4">{dapartureTime}</Typography>
                    </div>
                    <div className={styles.Separator} />
                    <Typography className={styles.Duration} variant="h6">{duration}</Typography>
                    <div className={styles.Separator} />
                    <div className={styles.DateColumn}>
                        <Typography className={styles.Date} variant="h5">{cities?.find(x => x.fiasCode === endOption?.arrivalCityCode)?.name}</Typography>
                        <Typography className={styles.Date} variant="h5">{arrivalDate}</Typography>
                        <Typography className={styles.Time} variant="h4">{arrivalTime}</Typography>
                    </div>
                </div>
                <Typography className={styles.Transfer} variant="h6">{transfers}</Typography>
            </div>
            <div className={styles.PriceColumn}>
                <div className={styles.PricesRow}>
                    <div className={styles.OnePriceColumn}>
                        <Typography className={styles.PriceTag} variant="h5">{priceWithLuggageTag}</Typography>
                        <Typography className={styles.Price} variant="h5">{priceWithLuggage} р</Typography>
                        {!props.paid && <Button className={styles.ChooseButton} variant='text' onClick={() => choose(priceWithLuggage, true)}>Купить</Button>}
                    </div>
                    <div className={styles.OnePriceColumn}>
                        <Typography className={styles.PriceTag} variant="h5">{priceWithoutLuggageTag}</Typography>
                        <Typography className={styles.Price} variant="h5">{priceWithoutLuggage} р</Typography>
                        {!props.paid && <Button className={styles.ChooseButton} variant='text' onClick={() => choose(priceWithoutLuggage, false)}>Купить</Button>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TravelOptionComponent;
