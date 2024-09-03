import styles from './Search.module.scss';
import React, { useCallback, useMemo, useState } from 'react';
import AppHeader from './elements/AppHeader';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getDurationSortAscending, getPriceSortAscending, getTransportOptions, setDurationSortAscending, setPriceSortAscending } from '../root/rootSlice';
import { getArrivalCity, getDepartureCity, getSeatsNumber, getTransportType } from '../root/searchSlice';
import { TransportOption } from './types/TransportOption';
import TravelOptionComponent from './elements/TravelOptionComponent';

function SearchPage() {
    const dispatch = useDispatch();

    const arrivalCity = useSelector(getArrivalCity);
    const departureCity = useSelector(getDepartureCity);
    const transportType = useSelector(getTransportType);
    const seatsNumber = useSelector(getSeatsNumber);

    const headerText = useMemo(() => departureCity?.name + " - " + arrivalCity?.name + ", " + transportType?.name + ", " + seatsNumber?.toString() + " чел.", [])
    const options = useSelector(getTransportOptions);

    const durationSortAscending = useSelector(getDurationSortAscending);
    const durationSortText = useMemo(() => "Продолжительность " + (durationSortAscending !== undefined ? (durationSortAscending ? "^" : "˅") : " "), [durationSortAscending]);
    const changeDurationSort = useCallback(() => dispatch(setDurationSortAscending(durationSortAscending === undefined ? true : !durationSortAscending)), [durationSortAscending]);

    const priceSortAscending = useSelector(getPriceSortAscending);
    const priceSortText = useMemo(() => "Цена " + (priceSortAscending !== undefined ? (priceSortAscending ? "^" : "˅") : " "), [priceSortAscending]);
    const changePriceSort = useCallback(() => dispatch(setPriceSortAscending(priceSortAscending === undefined ? true : !priceSortAscending)), [priceSortAscending]);

    const [directionForward, setDirectionForward] = useState(true);
    const changeDirectionText = useMemo(() => directionForward ? departureCity?.name + " -> " + arrivalCity?.name : arrivalCity?.name + " -> " + departureCity?.name, [arrivalCity, arrivalCity, directionForward]);
    const changeDirection = useCallback(() => setDirectionForward(!directionForward), [directionForward, setDirectionForward]);

    const sortedOptions = useMemo(() => {
        if (!options) return;

        const tempOptions = directionForward ? [...options.transportOptionTo] : [...options.transportOptionFrom];

        if (durationSortAscending != undefined) {
            tempOptions.sort((option1, option2) => {
                const firstOption1 = new Date(option1[0].departureDate).valueOf();
                const firstOption2 = new Date(option2[0].departureDate).valueOf();
                const lastOption1 = new Date(option1[option1.length - 1].arrivalDate).valueOf();
                const lastOption2 = new Date(option2[option2.length - 1].arrivalDate).valueOf();

                const duration1 = lastOption1 - firstOption1;
                const duration2 = lastOption2 - firstOption2;

                return (duration1 > duration2) ? (durationSortAscending ? 1 : -1) :
                    (duration2 > duration1) ? (durationSortAscending ? -1 : 1) :
                        0
            });
        }

        if (priceSortAscending != undefined) {
            tempOptions.sort((option1, option2) => {

                let priceOption1 = 0;
                let priceOption2 = 0;

                for (let i = 0; i < option1.length; i++) {
                    priceOption1 += option1[i].priceWithLuggage;
                }
                for (let i = 0; i < option2.length; i++) {
                    priceOption2 += option2[i].priceWithLuggage;
                }

                return (priceOption1 > priceOption2) ? (priceSortAscending ? 1 : -1) :
                    (priceOption2 > priceOption1) ? (priceSortAscending ? -1 : 1) :
                        0
            });
        }

        return tempOptions;
    }, [options, durationSortAscending, priceSortAscending, directionForward]);

    return (
        <div className={styles.FullScreen}>
            <div className={styles.InnerComponent}>
                <AppHeader text={headerText} />
                <Button className={styles.SecondaryButton} variant='text' onClick={changeDurationSort}>{durationSortText}</Button>
                <Button className={styles.SecondaryButton} variant='text' onClick={changePriceSort}>{priceSortText}</Button>
                <Button className={styles.SecondaryButton} variant='text' onClick={changeDirection}>{changeDirectionText}</Button>
                <div className={styles.Scroll}>
                    {sortedOptions?.map((option: TransportOption[]) => {
                        return <TravelOptionComponent transportOptions={option} paid={false} />
                    })}
                </div>
            </div>
        </div>
    );
}

export default SearchPage;