import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootStoreType } from './rootReducer';
import { initialRootState } from './rootSliceModel';
import { User } from "../components/types/User";
import { TransportType } from "../components/types/TransportType";
import { TransportReservation } from "../components/types/TransportReservation";
import { City } from "../components/types/City";
import { TransportOptionReturn } from "../components/types/TransportOptionReturn";
import { TransportOption } from "../components/types/TransportOption";
import { Company } from "../components/types/Company";
import { Transport } from "../components/types/Transport";


const rootSlice = createSlice({
    name: "currentRootState",
    initialState: initialRootState,
    reducers: {
        setTransportOptions: (state, action: PayloadAction<TransportOptionReturn | undefined>) => {
            state.transportOptions = action.payload;
        },
        setCities: (state, action: PayloadAction<City[] | undefined>) => {
            state.cities = action.payload;
        },
        setCompanies: (state, action: PayloadAction<Company[] | undefined>) => {
            state.companies = action.payload;
        },
        setTransports: (state, action: PayloadAction<Transport[] | undefined>) => {
            state.transports = action.payload;
        },
        setAllOptions: (state, action: PayloadAction<TransportOption[] | undefined>) => {
            state.allOptions = action.payload;
        },
        setNotifications: (state, action: PayloadAction<TransportReservation[] | undefined>) => {
            state.notifications = action.payload;
        },
        setTransportTypes: (state, action: PayloadAction<TransportType[] | undefined>) => {
            state.transportTypes = action.payload;
        },
        setUserReservations: (state, action: PayloadAction<TransportReservation[] | undefined>) => {
            state.userReservations = action.payload;
        },
        addUserReservation: (state, action: PayloadAction<TransportReservation>) => {
            state.userReservations?.push(action.payload);
        },
        setUser: (state, action: PayloadAction<User | undefined | null>) => {
            state.user = action.payload;
        },
        setUserDelayNotificationOn: (state, action: PayloadAction<boolean>) => {
            if (state.user) {
                state.user.delayNotification = action.payload;
            }
        },
        setDurationSortAscending: (state, action: PayloadAction<boolean>) => {
            state.durationSortAscending = action.payload;
            state.priceSortAscending = undefined;
        },
        setPriceSortAscending: (state, action: PayloadAction<boolean>) => {
            state.durationSortAscending = undefined;
            state.priceSortAscending = action.payload;
        }
    }
});

export const getTransportOptions = (store: RootStoreType) => store.state.transportOptions;
export const getAllOptions = (store: RootStoreType) => store.state.allOptions;
export const getNotifications = (store: RootStoreType) => store.state.notifications;
export const getTransportTypes = (store: RootStoreType) => store.state.transportTypes;
export const getCities = (store: RootStoreType) => store.state.cities;
export const getCompanies = (store: RootStoreType) => store.state.companies;
export const getTransports = (store: RootStoreType) => store.state.transports;
export const getUserReservations = (store: RootStoreType) => store.state.userReservations;
export const getUser = (store: RootStoreType) => store.state.user;
export const getDurationSortAscending = (store: RootStoreType) => store.state.durationSortAscending;
export const getPriceSortAscending = (store: RootStoreType) => store.state.priceSortAscending;

export const {
    setTransportOptions,
    setTransportTypes,
    setAllOptions,
    setNotifications,
    setCities,
    setCompanies,
    setTransports,
    setUserReservations,
    addUserReservation,
    setUser,
    setUserDelayNotificationOn,
    setDurationSortAscending,
    setPriceSortAscending
} = rootSlice.actions;

export default rootSlice.reducer;