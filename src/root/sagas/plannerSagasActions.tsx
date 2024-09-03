import { createAction } from "@reduxjs/toolkit";
import { SearchData } from "../../components/types/SearchData";
import { User } from "../../components/types/User";
import { TransportOption } from "../../components/types/TransportOption";

export const getAllOptionsAction = createAction("GetAllOptions");
export const getNotificationsAction = createAction("getNotifications");
export const confirmPaymentAction = createAction<number>("confirmPayment");
export const addOrUpdateOptionAction = createAction<TransportOption>("AddOrUpdateOption");
export const deleteOptionAction = createAction<number | undefined>("DeleteOption");
export const getCitiesAction = createAction("getCities");
export const getCompaniesAction = createAction("getCompanies");
export const getTransportsAction = createAction("getTransports");
export const getTransportTypeAction = createAction("getTransportType");
export const getSearchOptionsAction = createAction<SearchData>("getSearchOptions");
export const selectOptionAction = createAction<{ id?: number, passengerCount: number, luggageRequired: boolean, userEmail: string }>("selectOption");
export const authorizeUserAction = createAction<{ login: string, password: string }>("authorizeUser");
export const updateUserAction = createAction<User>("updateUser");
export const getUserReservationsAction = createAction("getUserReservations");