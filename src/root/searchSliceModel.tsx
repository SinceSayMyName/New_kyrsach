import { City } from "../components/types/City";
import { TransportOption } from "../components/types/TransportOption";
import { TransportType } from "../components/types/TransportType";

interface SearchState {
    departureCity: City | undefined,
    arrivalCity: City | undefined,
    departureDate: Date | undefined,
    arrivalDate: Date | undefined,
    transportType: TransportType | undefined,
    seatsNumber: number | undefined,
    selectedOptions: TransportOption[] | undefined,
    luggageRequired: boolean | undefined,
}

export const initialSearchState: SearchState = {
    departureCity: undefined,
    arrivalCity: undefined,
    departureDate: undefined,
    arrivalDate: undefined,
    transportType: undefined,
    seatsNumber: undefined,
    selectedOptions: undefined,
    luggageRequired: undefined
};

export type SearchStateType = typeof initialSearchState;