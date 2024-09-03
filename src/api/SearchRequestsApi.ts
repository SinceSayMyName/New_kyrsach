import axios from 'axios';
import { SearchData } from '../components/types/SearchData';
import { TransportOptionReturn } from '../components/types/TransportOptionReturn';
import { TransportReservation } from '../components/types/TransportReservation';

export const GetSearchOptionsApi = (searchData: SearchData) => {
    return axios.post<TransportOptionReturn>(getEndpointUrl(`GetSearchOptions`), searchData);
};

export const SelectOptionApi = (userID: number, optionID: number, passengerCount: number, luggageRequired: boolean, userEmail: string) => {
    return axios.post<TransportReservation>(getEndpointUrl(`SelectOption?userID=${userID}&optionID=${optionID}&passengerCount=${passengerCount}&luggageRequired=${luggageRequired}&userEmail=${userEmail}`));
};

export const ConfirmOptionPaymentApi = (reservationID: number) => {
    return axios.post<TransportReservation>(getEndpointUrl(`SelectOption?reservationID=${reservationID}`));
};

const getEndpointUrl = (url?: string) => {
    return `http://localhost:5234/Search/${url || ''}`;
};