import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TransportType } from "../components/types/TransportType";
import { City } from "../components/types/City";
import { initialSearchState } from "./searchSliceModel";
import { RootStoreType } from "./rootReducer";
import { TransportOption } from "../components/types/TransportOption";


const searchSlice = createSlice({
    name: "currentSearchState",
    initialState: initialSearchState,
    reducers: {
        setDepartureCity: (state, action: PayloadAction<City | undefined>) => {
            state.departureCity = action.payload;
        },
        setArrivalCity: (state, action: PayloadAction<City | undefined>) => {
            state.arrivalCity = action.payload;
        },
        setDepartureDate: (state, action: PayloadAction<Date | undefined>) => {
            state.departureDate = action.payload;
        },
        setArrivalDate: (state, action: PayloadAction<Date | undefined>) => {
            state.arrivalDate = action.payload;
        },
        setTransportType: (state, action: PayloadAction<TransportType | undefined>) => {
            state.transportType = action.payload;
        },
        setSeatsNumber: (state, action: PayloadAction<number | undefined>) => {
            state.seatsNumber = action.payload;
        },
        setSelectedOptions: (state, action: PayloadAction<TransportOption[] | undefined>) => {
            state.selectedOptions = action.payload;
        },
        setLuggageRequired: (state, action: PayloadAction<boolean | undefined>) => {
            state.luggageRequired = action.payload;
        },
    }
});

export const getDepartureCity = (store: RootStoreType) => store.search.departureCity;
export const getArrivalCity = (store: RootStoreType) => store.search.arrivalCity;
export const getDepartureDate = (store: RootStoreType) => store.search.departureDate;
export const getArrivalDate = (store: RootStoreType) => store.search.arrivalDate;
export const getTransportType = (store: RootStoreType) => store.search.transportType;
export const getSeatsNumber = (store: RootStoreType) => store.search.seatsNumber;
export const getSelectedOptions = (store: RootStoreType) => store.search.selectedOptions;
export const getLuggageRequired = (store: RootStoreType) => store.search.luggageRequired;


export const {
    setDepartureCity,
    setArrivalCity,
    setDepartureDate,
    setArrivalDate,
    setTransportType,
    setSeatsNumber,
    setSelectedOptions,
    setLuggageRequired
} = searchSlice.actions;

export default searchSlice.reducer;