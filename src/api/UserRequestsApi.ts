import axios from 'axios';
import { User } from '../components/types/User';
import { TransportReservation } from '../components/types/TransportReservation';


export const GetUserApi = (login: string, password: string) => {
    return axios.get<User>(getEndpointUrl(`GetUser?login=${login}&password=${password}`));
};

export const UpdateUserApi = (user: User) => {
    return axios.post<User>(getEndpointUrl(`UpdateUser`), user);
};

export const GetUserReservationsApi = (userID?: number) => {
    return axios.get<TransportReservation[]>(getEndpointUrl(`GetUserReservations?userID=${userID}`));
};


const getEndpointUrl = (url?: string) => {
    return `http://localhost:5234/User/${url || ''}`;
};