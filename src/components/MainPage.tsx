import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Autocomplete, Button, TextField, Typography } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './Main.module.scss';
import { getCities, getTransportTypes, getUser } from '../root/rootSlice';
import { getCitiesAction, getSearchOptionsAction, getTransportTypeAction } from '../root/sagas/plannerSagasActions';
import { SearchData } from './types/SearchData';
import { TransportType } from './types/TransportType';
import { City } from './types/City';
import { getDepartureCity, getArrivalCity, getTransportType, setDepartureCity, setArrivalCity, setTransportType, getDepartureDate, getArrivalDate, setArrivalDate, setDepartureDate, setSeatsNumber, getSeatsNumber } from '../root/searchSlice';
import dayjs from 'dayjs';

export const positiveInteger = new RegExp('^[1-9][0-9]*$');

function MainPage() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [errorText, setErrorText] = useState("");

    useEffect(() => {
        dispatch(getTransportTypeAction());
        dispatch(getCitiesAction());
        dispatch(setDepartureDate(new Date()));
        dispatch(setArrivalDate(new Date()));
    }, [dispatch, getCitiesAction, getTransportTypeAction])

    const user = useSelector(getUser);
    const transportTypes = useSelector(getTransportTypes) as TransportType[] | undefined | null;
    const cities = useSelector(getCities) as City[] | undefined | null;
    const isAuthorized = useMemo(() => user !== null && user !== undefined, [user]);

    const departureCity = useSelector(getDepartureCity);
    const arrivalCity = useSelector(getArrivalCity);
    const transportType = useSelector(getTransportType);
    const departureDate = useSelector(getDepartureDate);
    const arrivalDate = useSelector(getArrivalDate);
    const seatsNumber = useSelector(getSeatsNumber);

    const toAdmin = useCallback(() => navigate(`/Admin`), [])
    const toAuthorization = useCallback(() => navigate(`/Authorization`), [])
    const toRegistration = useCallback(() => navigate(`/Registration`), [])
    const toAccount = useCallback(() => navigate(`/Account`), [])
    const toReservations = useCallback(() => navigate(`/Reservations`), [])
    const toSearch = useCallback(() => {
        if (!departureCity) {
            setErrorText("Укажите город отправления");
            return;
        }
        if (!arrivalCity) {
            setErrorText("Укажите планируемый город");
            return;
        }
        if (!transportType) {
            setErrorText("Укажите планируемый транспорт");
            return;
        }
        if (!departureDate) {
            setErrorText("Укажите дату начала поездки");
            return;
        }
        if (!arrivalDate) {
            setErrorText("Укажите дату окончания поездки");
            return;
        }
        if (!seatsNumber || +seatsNumber <= 0) {
            setErrorText("Укажите количество пассажиров");
            return;
        }
        if (new Date(departureDate) > new Date(arrivalDate)) {
            setErrorText("Дата начала поездки не может быть раньше даты окончания");
            return;
        }
        setErrorText("");
        dispatch(getSearchOptionsAction({
            transportTypeID: transportType?.id,
            departureCityCode: departureCity?.fiasCode,
            arrivalCityCode: arrivalCity?.fiasCode,
            departureDate: departureDate ? departureDate.toISOString() : new Date().toISOString(),
            arrivalDate: arrivalDate ? arrivalDate.toISOString() : new Date().toISOString(),
            seatsNumber: seatsNumber
        } as SearchData));
        navigate(`/Search`)
    }, [dispatch, navigate, getSearchOptionsAction, transportType, departureCity, arrivalCity, departureDate, arrivalDate, seatsNumber])

    const today = useMemo(() => new Date(), []);

    const handleChangeSeatsNumber = (event: any) => {
        const val = event.target.value;
        if (val.match(/[^0-9]/)) {
            return event.preventDefault();
        }
        dispatch(setSeatsNumber(+val))
    };

    const handleChangeDepartureDate = (event: any) => {
        const date = new Date(event.target?.value);
        if (!date || date < today) {
            dispatch(setDepartureDate(today));
            return event.preventDefault();
        }
    };

    const handleChangeArrivalDate = (event: any) => {
        const date = new Date(event.target?.value);
        if (!date || date <= today) {
            dispatch(setArrivalDate(today));
            return event.preventDefault();
        }
    };

    return (
        <div>
            <div className={styles.Account} >
                {user?.isAdmin && <Button onClick={toAdmin} className={styles.AccountButton}>К администрированию</Button>}
                {isAuthorized && <Button onClick={toReservations} className={styles.AccountButton}>Мои заказы</Button>}
                {isAuthorized && <Button onClick={toAccount} className={styles.AccountButton}>Личный кабинет</Button>}
                {!isAuthorized && <Button onClick={toRegistration} className={styles.AccountButton}>Зарегистрироватся</Button>}
                {!isAuthorized && <Button onClick={toAuthorization} className={styles.AccountButton}>Войти</Button>}
            </div>
            <header className={styles.FullScreen}>
                <div className={styles.Details} >
                    <div>
                        <Autocomplete
                            options={cities ?? []}
                            onChange={(event: any, value: City | null) => dispatch(setDepartureCity(value ?? undefined))}
                            getOptionLabel={(option) => option?.name ?? ""}
                            getOptionKey={(option) => option?.fiasCode ?? ""}
                            defaultValue={departureCity ?? undefined}
                            renderInput={(params) =>
                                <TextField {...params} className={styles.TextField} label="Город отправления" variant="filled" />
                            }
                        />
                        <Autocomplete
                            options={cities ?? []}
                            onChange={(event: any, value: City | null) => dispatch(setArrivalCity(value ?? undefined))}
                            getOptionLabel={(option) => option?.name ?? ""}
                            getOptionKey={(option) => option?.fiasCode ?? ""}
                            defaultValue={arrivalCity ?? undefined}
                            renderInput={(params) => <TextField {...params} className={styles.TextField} label="Планируемый город" variant="filled" />}
                        />
                    </div>
                    <div>
                        <Autocomplete
                            options={transportTypes ?? []}
                            onChange={(event: any, value: TransportType | null | undefined) => dispatch(setTransportType(value ?? undefined))}
                            getOptionLabel={(option) => option?.name ?? ""}
                            defaultValue={transportType ?? undefined}
                            renderInput={(params) =>
                                <TextField {...params} className={styles.TextField} label="Планируемый транспорт" variant="filled" />
                            }
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker className={styles.DatePicker} value={dayjs(departureDate ?? today)}
                                onChange={(e) => dispatch(setDepartureDate(e?.toDate()))}
                                minDate={dayjs(today)} defaultValue={dayjs(departureDate ?? today)} format="DD.MM.YYYY" label="Дата начала поездки"
                                slotProps={{ textField: { variant: "filled", onBlur: handleChangeDepartureDate } }} />
                            <DatePicker className={styles.DatePicker} value={dayjs(arrivalDate ?? today)}
                                onChange={(e) => dispatch(setArrivalDate(e?.toDate()))}
                                minDate={dayjs(today)} defaultValue={dayjs(arrivalDate ?? today)} format="DD.MM.YYYY" label="Дата окончания поездки"
                                slotProps={{ textField: { variant: "filled", onBlur: handleChangeArrivalDate } }} />
                        </LocalizationProvider>
                        <TextField value={seatsNumber} className={styles.TextField}
                            onChange={handleChangeSeatsNumber} label="Количество пассажиров" variant="filled" />
                    </div>
                    <Typography className={styles.ErrorLabel} variant="h5" >{errorText}</Typography>
                    <Button className={styles.PrimaryButton} onClick={toSearch}>НАЙТИ</Button>
                </div>
            </header>
        </div>
    );
}

export default MainPage;
