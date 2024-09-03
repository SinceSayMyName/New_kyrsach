import styles from './Reservations.module.scss';
import React, { useMemo } from 'react';
import AppHeader from './elements/AppHeader';
import { TransportReservation } from './types/TransportReservation';
import { useSelector } from 'react-redux';
import { getUserReservations } from '../root/rootSlice';
import TravelOptionComponent from './elements/TravelOptionComponent';
import { Typography } from '@mui/material';
import { TransportOption } from './types/TransportOption';

function ReservationsPage() {

    const headerText = useMemo(() => "Мои заказы", [])
    const reservations = useSelector(getUserReservations);

    const sortedReservations = useMemo(() => {
        const temp = reservations ? [...reservations] : [];
        return temp.sort((x, y) => x.id > y.id ? -1 : x.id < y.id ? 1 : 0);
    }, [reservations])

    return (
        <div className={styles.FullScreen}>
            <div className={styles.InnerComponent}>
                <AppHeader text={headerText} />
                <div className={styles.Scroll}>
                    {sortedReservations?.map((reservation: TransportReservation) => {
                        return <div>
                            <div className={styles.OptionHeader}>
                                <Typography className={styles.Typography} variant="h4">Заказ №{reservation.id}</Typography>
                                <div>
                                    <Typography className={reservation.paid ? styles.AcceptedText : styles.ErrorText} variant="h5">
                                        {reservation.paid ? "Оплата подтверждена" : "Ожидайте подтверждения оплаты"}
                                    </Typography>
                                </div>
                            </div>
                            {reservation?.transportOptions.map((option: TransportOption) => {
                                return <TravelOptionComponent transportOptions={[option]} paid={true} />
                            })
                            }
                        </div>
                    })}
                </div>
            </div>
        </div>
    );
}

export default ReservationsPage;




/* const options = [{
    departure: new Date(Date.now()),
    arrival: new Date(Date.now()),
    priceWithLuggage: 60585,
    priceWithoutLuggage: 60586,
    transfers: ["Трансфер 1", "Трансфер 2"],
    companies: ["Компания 1", "Компания 2", "Компания 3"]
},
{
    departure: new Date(Date.now()),
    arrival: new Date(Date.now()),
    priceWithLuggage: 60585,
    priceWithoutLuggage: 60586,
    transfers: ["Трансфер 1", "Трансфер 2"],
    companies: ["Компания 1", "Компания 2", "Компания 3"]
},
{
    departure: new Date(Date.now()),
    arrival: new Date(Date.now()),
    priceWithLuggage: 60585,
    priceWithoutLuggage: 60586,
    transfers: ["Трансфер 1", "Трансфер 2"],
    companies: ["Компания 1", "Компания 2", "Компания 3"]
},
{
    departure: new Date(Date.now()),
    arrival: new Date(Date.now()),
    priceWithLuggage: 60585,
    priceWithoutLuggage: 60586,
    transfers: ["Трансфер 1", "Трансфер 2"],
    companies: ["Компания 1", "Компания 2", "Компания 3"]
},
{
    departure: new Date(Date.now()),
    arrival: new Date(Date.now()),
    priceWithLuggage: 60585,
    priceWithoutLuggage: 60586,
    transfers: ["Трансфер 1", "Трансфер 2"],
    companies: ["Компания 1", "Компания 2", "Компания 3"]
},
{
    departure: new Date(Date.now()),
    arrival: new Date(Date.now()),
    priceWithLuggage: 60585,
    priceWithoutLuggage: 60586,
    transfers: ["Трансфер 1", "Трансфер 2"],
    companies: ["Компания 1", "Компания 2", "Компания 3"]
},
{
    departure: new Date(Date.now()),
    arrival: new Date(Date.now()),
    priceWithLuggage: 60585,
    priceWithoutLuggage: 60586,
    transfers: ["Трансфер 1", "Трансфер 2"],
    companies: ["Компания 1", "Компания 2", "Компания 3"]
},
{
    departure: new Date(Date.now()),
    arrival: new Date(Date.now()),
    priceWithLuggage: 60585,
    priceWithoutLuggage: 60586,
    transfers: ["Трансфер 1", "Трансфер 2"],
    companies: ["Компания 1", "Компания 2", "Компания 3"]
},
{
    departure: new Date(Date.now()),
    arrival: new Date(Date.now()),
    priceWithLuggage: 60585,
    priceWithoutLuggage: 60586,
    transfers: ["Трансфер 1", "Трансфер 2"],
    companies: ["Компания 1", "Компания 2", "Компания 3"]
},
{
    departure: new Date(Date.now()),
    arrival: new Date(Date.now()),
    priceWithLuggage: 60585,
    priceWithoutLuggage: 60586,
    transfers: ["Трансфер 1", "Трансфер 2"],
    companies: ["Компания 1", "Компания 2", "Компания 3"]
},
{
    departure: new Date(Date.now()),
    arrival: new Date(Date.now()),
    priceWithLuggage: 60585,
    priceWithoutLuggage: 60586,
    transfers: ["Трансфер 1", "Трансфер 2"],
    companies: ["Компания 1", "Компания 2", "Компания 3"]
},
{
    departure: new Date(Date.now()),
    arrival: new Date(Date.now()),
    priceWithLuggage: 60585,
    priceWithoutLuggage: 60586,
    transfers: ["Трансфер 1", "Трансфер 2"],
    companies: ["Компания 1", "Компания 2", "Компания 3"]
}] as Option[]; */