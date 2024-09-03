import { City } from "../components/types/City";
import { Company } from "../components/types/Company";
import { Transport } from "../components/types/Transport";
import { TransportOption } from "../components/types/TransportOption";
import { TransportOptionReturn } from "../components/types/TransportOptionReturn";
import { TransportReservation } from "../components/types/TransportReservation";
import { TransportType } from "../components/types/TransportType";
import { User } from "../components/types/User";

interface RootState {
    transportOptions: TransportOptionReturn | undefined;
    transportTypes: TransportType[] | undefined;
    notifications: TransportReservation[] | undefined;
    allOptions: TransportOption[] | undefined;
    cities: City[] | undefined;
    companies: Company[] | undefined;
    transports: Transport[] | undefined;
    userReservations: TransportReservation[] | undefined;
    user: User | undefined | null;
    departureCityCode: string | undefined;
    arrivalCityCode: string | undefined;
    departureDate: Date | undefined;
    arrivalDate: Date | undefined;
    durationSortAscending: boolean | undefined;
    priceSortAscending: boolean | undefined;
}

export const initialRootState: RootState = {
    transportOptions: undefined,
    transportTypes: undefined,
    notifications: undefined,
    allOptions: undefined,
    cities: undefined,
    companies: undefined,
    transports: undefined,
    userReservations: undefined,
    user: undefined,
    departureCityCode: undefined,
    arrivalCityCode: undefined,
    departureDate: undefined,
    arrivalDate: undefined,
    durationSortAscending: undefined,
    priceSortAscending: true
};

export type RootStateType = typeof initialRootState;