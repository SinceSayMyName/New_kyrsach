import { Autocomplete, Button, IconButton, TextField, Typography } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import styles from './EditTransportOptions.module.scss';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { getTransportTypes, getCities, getAllOptions, getCompanies, getTransports } from '../../root/rootSlice';
import { City } from '../types/City';
import { TransportType } from '../types/TransportType';
import { TransportOption } from '../types/TransportOption';
import TravelOptionComponent from './TravelOptionComponent';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import { Company } from '../types/Company';
import { Transport } from '../types/Transport';
import { addOrUpdateOptionAction, deleteOptionAction } from '../../root/sagas/plannerSagasActions';

function EditTransportOptions() {

    const dispatch = useDispatch();

    const [departureCity, setDepartureCity] = useState<City | null>(null);
    const [arrivalCity, setArrivalCity] = useState<City | null>(null);
    const [transportType, setTransportType] = useState<TransportType | null>(null);
    const [departureDate, setDepartureDate] = useState<Date | null>(new Date());
    const [arrivalDate, setArrivalDate] = useState<Date | null>(new Date());
    const [company, setCompany] = useState<Company | null>(null);
    const [transport, setTransport] = useState<Transport | null>(null);
    const [price, setPrice] = useState<number | null>(null);
    const [priceWithLuggage, setPriceWithLuggage] = useState<number | null>(null);

    const [editId, setEditId] = useState<number | null | undefined>(null);

    const transportTypes = useSelector(getTransportTypes) as TransportType[] | null;
    const cities = useSelector(getCities) as City[] | null;
    const companies = useSelector(getCompanies) as Company[] | null;
    const transports = useSelector(getTransports) as Transport[] | null;

    const options = useSelector(getAllOptions) as TransportOption[] | undefined;

    const editOption = useCallback((option: TransportOption) => {
        setDepartureCity(cities?.find(x => x.fiasCode == option.departureCityCode) ?? null);
        setArrivalCity(cities?.find(x => x.fiasCode == option.arrivalCityCode) ?? null);
        setCompany(option.company);
        setPrice(option.price);
        setPriceWithLuggage(option.priceWithLuggage);
        setArrivalDate(option.arrivalDate);
        setDepartureDate(option.departureDate);
        setEditId(option.id);
        setTransport(option.transport);
    }, [cities, companies, transports, setDepartureCity, setArrivalCity, setCompany, setArrivalDate, setDepartureDate, setEditId, setTransport, setTransportType])

    const deleteOption = useCallback((id?: number) => {
        dispatch(deleteOptionAction(id));
    }, [cities])

    const saveOptionButtonText = useMemo(() => editId !== null ? "Обновить" : "Добавить", [editId]);
    const saveOption = useCallback(() => {
        const option = {
            id: editId,
            arrivalCityCode: arrivalCity?.fiasCode,
            departureCityCode: departureCity?.fiasCode,
            arrivalDate: arrivalDate,
            departureDate: departureDate,
            company: company,
            transport: transport,
            price: price,
            priceWithLuggage: priceWithLuggage
        } as TransportOption;
        dispatch(addOrUpdateOptionAction(option));
    }, [editId, arrivalCity, departureCity, arrivalDate, departureDate, company, transport, price, priceWithLuggage, dispatch, addOrUpdateOptionAction])

    const updateDepartureDate = useCallback((value: dayjs.Dayjs | null) => {
        if (!departureDate || !value) return;
        const time = dayjs(departureDate);
        const newDate = value.toDate();
        newDate.setHours(time.get("hours"));
        newDate.setMinutes(time.get("minutes"));
        newDate.setSeconds(time.get("seconds"));
        setDepartureDate(newDate);
    }, [departureDate, setDepartureDate]);

    const updateDepartureTime = useCallback((value: dayjs.Dayjs | null) => {
        if (!departureDate || !value) return;
        const time = dayjs(value.toDate());
        const newDate = new Date(departureDate);
        newDate.setHours(time.get("hours"));
        newDate.setMinutes(time.get("minutes"));
        newDate.setSeconds(time.get("seconds"));
        setDepartureDate(newDate);
    }, [departureDate, setDepartureDate]);

    const updateArrivalDate = useCallback((value: dayjs.Dayjs | null) => {
        if (!arrivalDate || !value) return;
        const time = dayjs(new Date(arrivalDate));
        const newDate = value.toDate();
        newDate.setHours(time.get("hours"));
        newDate.setMinutes(time.get("minutes"));
        newDate.setSeconds(time.get("seconds"));
        setArrivalDate(newDate);
    }, [arrivalDate, setArrivalDate]);

    const updateArrivalTime = useCallback((value: dayjs.Dayjs | null) => {
        if (!arrivalDate || !value) return;
        const time = dayjs(value.toDate());
        const newDate = new Date(arrivalDate);
        newDate.setHours(time.get("hours"));
        newDate.setMinutes(time.get("minutes"));
        newDate.setSeconds(time.get("seconds"));
        setArrivalDate(newDate);
    }, [arrivalDate, setArrivalDate]);



    return (
        <div className={styles.Separator}>

            <div className={styles.OptionEdit}>
                {editId !== null && <div className={styles.RowData}>
                    <Typography className={styles.Typography} variant="h5" >Рейс №{editId}</Typography>
                    <IconButton onClick={() => setEditId(null)} className={styles.CloseIcon}><ClearIcon /></IconButton>
                </div>}
                <div className={styles.RowData}>
                    <Autocomplete
                        className={styles.Autocomplete}
                        options={cities ?? []}
                        onChange={(event: any, value: City | null | undefined) => setDepartureCity(value ?? null)}
                        getOptionLabel={(option) => option?.name ?? ""}
                        defaultValue={departureCity ?? null}
                        value={departureCity}
                        isOptionEqualToValue={(option: City, value: City) => option?.fiasCode === value?.fiasCode}
                        renderInput={(params) =>
                            <TextField {...params} className={styles.TextField} label="Город отправления" variant="filled" />
                        }
                    />
                    <Autocomplete
                        className={styles.Autocomplete}
                        options={cities ?? []}
                        onChange={(event: any, value: City | null | undefined) => setArrivalCity(value ?? null)}
                        getOptionLabel={(option) => option?.name ?? ""}
                        defaultValue={arrivalCity ?? null}
                        value={arrivalCity}
                        isOptionEqualToValue={(option: City, value: City) => option?.fiasCode === value?.fiasCode}
                        renderInput={(params) =>
                            <TextField {...params} className={styles.TextField} label="Город прибытия" variant="filled" />
                        }
                    />
                </div>

                <div className={styles.RowData}>
                    <Autocomplete
                        className={styles.Autocomplete}
                        options={companies ?? []}
                        onChange={(event: any, value: Company | null | undefined) => setCompany(value ?? null)}
                        getOptionLabel={(option) => option?.name ?? ""}
                        defaultValue={company ?? null}
                        value={company}
                        isOptionEqualToValue={(option: Company, value: Company) => option?.id === value?.id}
                        renderInput={(params) =>
                            <TextField {...params} className={styles.TextField} label="Компания-перевозчик" variant="filled" />
                        }
                    />
                    <Typography className={styles.Typography} variant="h6" >ИЛИ</Typography>
                    <div className={styles.RowData}>
                        <TextField defaultValue={company?.name ?? undefined}
                            className={styles.TextField} label="Название компании" variant="filled"
                            onChange={e => setCompany({ name: e.target.value } as Company)} />
                    </div>
                </div>

                <Autocomplete
                    className={styles.Autocomplete}
                    options={transports ?? []}
                    onChange={(event: any, value: Transport | null | undefined) => setTransport(value ?? null)}
                    getOptionLabel={(option) => option?.name + ", " + transportTypes?.find(x => x.id === option.typeId)?.name + ", " + option.seatsCount + " мест" ?? ""}
                    defaultValue={transport ?? null}
                    value={transport}
                    isOptionEqualToValue={(option: Transport, value: Transport) => option?.id === value?.id}
                    renderInput={(params) =>
                        <TextField {...params} className={styles.TextField} label="Транспорт" variant="filled" />
                    }
                />
                <Typography className={styles.Typography} variant="h6" >ИЛИ</Typography>
                <div className={styles.RowData}>
                    <TextField defaultValue={transport?.name ?? undefined} className={styles.TextField} label="Название транспорта" variant="filled"
                        onChange={e => setTransport({ name: e.target.value, seatsCount: transport?.seatsCount, typeId: transport?.typeId } as Transport)} />
                    <TextField defaultValue={transport?.seatsCount ?? undefined} className={styles.TextField} type='number' label="Количество мест" variant="filled"
                        onChange={e => setTransport({ name: transport?.name, seatsCount: e.target.value, typeId: transport?.typeId } as Transport)} />
                    <Autocomplete
                        className={styles.Autocomplete}
                        options={transportTypes ?? []}
                        onChange={(event: any, value: TransportType | null | undefined) => setTransport({ name: transport?.name, seatsCount: transport?.seatsCount, typeId: value?.id } as Transport)}
                        getOptionLabel={(option) => option?.name ?? ""}
                        defaultValue={transportType ?? null}
                        isOptionEqualToValue={(option: TransportType, value: TransportType) => option?.id === value?.id}
                        renderInput={(params) =>
                            <TextField {...params} className={styles.TextField} label="Тип транспорта" variant="filled" />
                        }
                    />
                </div>
                <div className={styles.RowData}>
                    <TextField defaultValue={price ?? 0} className={styles.TextField} type='number' label="Стоимость" variant="filled"
                        onChange={e => setPrice(+e.target.value)}
                        value={price} />
                    <TextField defaultValue={priceWithLuggage ?? 0} className={styles.TextField} type='number' label="Стоимость с багажом" variant="filled"
                        onChange={e => setPriceWithLuggage(+e.target.value)}
                        value={priceWithLuggage} />
                </div>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className={styles.RowData}>
                        <DatePicker value={dayjs(departureDate)} defaultValue={dayjs(departureDate) ?? undefined}
                            className={styles.DatePicker} format="DD.MM.YYYY" label="Дата отправелния"
                            slotProps={{ textField: { variant: "filled" } }} onChange={e => updateDepartureDate(e)} />
                        <DatePicker value={dayjs(arrivalDate)} defaultValue={dayjs(arrivalDate) ?? undefined}
                            className={styles.DatePicker} format="DD.MM.YYYY" label="Дата прибытия"
                            slotProps={{ textField: { variant: "filled" } }} onChange={e => updateArrivalDate(e)} />
                    </div>
                    <div className={styles.RowData}>
                        <TimePicker value={dayjs(departureDate)} defaultValue={dayjs(departureDate) ?? undefined}
                            className={styles.DatePicker} label="Время отправелния" slotProps={{ textField: { variant: "filled" } }}
                            format="hh:mm" onChange={e => updateDepartureTime(e)} />
                        <TimePicker value={dayjs(arrivalDate)} defaultValue={dayjs(arrivalDate) ?? undefined}
                            className={styles.DatePicker} label="Время прибытия" slotProps={{ textField: { variant: "filled" } }}
                            format="hh:mm" onChange={e => updateArrivalTime(e)} />
                    </div>
                </LocalizationProvider>
                <div className={styles.RowData}>
                    <Button className={styles.PrimaryButton} onClick={saveOption}>{saveOptionButtonText}</Button>
                </div>
            </div>

            <div className={styles.OptionsList}>
                {options?.map((option: TransportOption) => {
                    return (
                        <div className={styles.OptionRow}>
                            <TravelOptionComponent transportOptions={[option]} paid={true} />
                            <div className={styles.ButtonsColumn}>
                                <IconButton onClick={() => editOption(option)}><EditIcon /></IconButton>
                                <IconButton onClick={() => deleteOption(option.id)}><DeleteIcon /></IconButton>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div >
    );
}

export default EditTransportOptions;