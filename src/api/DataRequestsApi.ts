import axios from 'axios';
import { TransportType } from '../components/types/TransportType';
import { City } from '../components/types/City';
import { TransportOption } from '../components/types/TransportOption';
import { Company } from '../components/types/Company';
import { Transport } from '../components/types/Transport';
import { TransportReservation } from '../components/types/TransportReservation';

export const GetTransportTypesApi = () => {
    return axios.get<TransportType[]>(getEndpointUrl(`GetTransportTypes`));
};

export const GetCitiesApi = () => {
    return axios.get<City[]>(getEndpointUrl(`GetCities`));
};

export const GetCompaniesApi = () => {
    return axios.get<Company[]>(getEndpointUrl(`GetCompanies`));
};

export const GetTransportsApi = () => {
    return axios.get<Transport[]>(getEndpointUrl(`GetTransports`));
};

export const GetNotificationsApi = () => {
    return axios.get<TransportReservation[]>(getEndpointUrl(`GetNotifications`));
};

export const ConfirmPaymentApi = (reservationID: number) => {
    return axios.post<TransportReservation[]>(getEndpointUrl(`ConfirmPayment?reservationID=${reservationID}`));
};

export const GetAllOptionsApi = () => {
    return axios.get<TransportOption[]>(getEndpointUrl(`GetAllOptions`));
};

export const AddOrUpdateOptionApi = (option: TransportOption) => {
    return axios.post(getEndpointUrl(`AddOrUpdateOption`), option);
};

export const DeleteOptionApi = (optionID: number) => {
    return axios.post(getEndpointUrl(`DeleteOption?optionID=${optionID}`));
};

const getEndpointUrl = (url?: string) => {
    return `http://localhost:5234/Data/${url || ''}`;
};