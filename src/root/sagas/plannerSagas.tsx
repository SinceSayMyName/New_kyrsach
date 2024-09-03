import { getSearchOptionsAction, getTransportTypeAction, authorizeUserAction, getUserReservationsAction, selectOptionAction, updateUserAction, getCitiesAction, deleteOptionAction, getAllOptionsAction, getCompaniesAction, getTransportsAction, addOrUpdateOptionAction, getNotificationsAction, confirmPaymentAction } from "./plannerSagasActions";
import { addUserReservation, getUser, setAllOptions, setCities, setCompanies, setNotifications, setTransportOptions, setTransports, setTransportTypes, setUser, setUserReservations } from "../rootSlice";
import { call, takeEvery, put, select } from "typed-redux-saga/macro";
import { AddOrUpdateOptionApi, ConfirmPaymentApi, DeleteOptionApi, GetAllOptionsApi, GetCitiesApi, GetCompaniesApi, GetNotificationsApi, GetTransportsApi, GetTransportTypesApi } from "../../api/DataRequestsApi";
import { GetSearchOptionsApi, SelectOptionApi } from "../../api/SearchRequestsApi";
import { SearchData } from "../../components/types/SearchData";
import { PayloadAction } from "@reduxjs/toolkit";
import { GetUserApi, GetUserReservationsApi, UpdateUserApi } from "../../api/UserRequestsApi";
import { User } from "../../components/types/User";
import { TransportOption } from "../../components/types/TransportOption";


const trackerSagas = [
    takeEvery(getAllOptionsAction, getAllOptions),
    takeEvery(getNotificationsAction, getNotifications),
    takeEvery(confirmPaymentAction, confirmPayment),
    takeEvery(addOrUpdateOptionAction, addOrUpdateOption),
    takeEvery(deleteOptionAction, deleteOption),
    takeEvery(getCitiesAction, getCities),
    takeEvery(getCompaniesAction, getCompanies),
    takeEvery(getTransportsAction, getTransports),
    takeEvery(getTransportTypeAction, getTransportTypes),
    takeEvery(getSearchOptionsAction, getSearchOptions),
    takeEvery(selectOptionAction, selectOption),
    takeEvery(authorizeUserAction, authorizeUser),
    takeEvery(updateUserAction, updateUser),
    takeEvery(getUserReservationsAction, getUserReservations)
];


function* getNotifications() {
    const response = yield* call(GetNotificationsApi);
    yield* put(setNotifications(response.data));
}

function* confirmPayment({ payload: id }: PayloadAction<number>) {
    const response = yield* call(ConfirmPaymentApi, id);
    yield* put(setNotifications(response.data));
}

function* getAllOptions() {
    const response = yield* call(GetAllOptionsApi);
    yield* put(setAllOptions(response.data));
}

function* addOrUpdateOption({ payload: option }: PayloadAction<TransportOption>) {
    const response = yield* call(AddOrUpdateOptionApi, option);
    yield* put(setAllOptions(response.data));
}

function* deleteOption({ payload: id }: PayloadAction<number>) {
    const response = yield* call(DeleteOptionApi, id);
    yield* put(setAllOptions(response.data));
}

function* getCompanies() {
    const response = yield* call(GetCompaniesApi);
    yield* put(setCompanies(response.data));
}

function* getTransports() {
    const response = yield* call(GetTransportsApi);
    yield* put(setTransports(response.data));
}

function* getCities() {
    const response = yield* call(GetCitiesApi);
    const cities = response.data;
    cities.sort((x, y) => x.name > y.name ? 1 : x.name < y.name ? -1 : 0);
    yield* put(setCities(cities));
}

function* getTransportTypes() {
    const response = yield* call(GetTransportTypesApi);
    yield* put(setTransportTypes(response.data));
}

function* getSearchOptions({ payload: searchData }: PayloadAction<SearchData>) {
    const response = yield* call(GetSearchOptionsApi, searchData);
    yield* put(setTransportOptions(response.data));
}

function* authorizeUser({ payload: credentials }: PayloadAction<{ login: string, password: string }>) {
    const response = yield* call(GetUserApi, credentials.login, credentials.password);
    if (response.data.id) {
        yield* put(setUser(response.data));
    } else {
        yield* put(setUser(null));
    }
}

function* updateUser({ payload: user }: PayloadAction<User>) {
    const response = yield* call(UpdateUserApi, user);
    yield* put(setUser(response.data));
}

function* getUserReservations() {
    const user = yield* select(getUser);
    if (user) {
        const response = yield* call(GetUserReservationsApi, user.id);
        yield* put(setUserReservations(response.data));
    }
}

function* selectOption({ payload: optionData }: PayloadAction<{ id: number, passengerCount: number, luggageRequired: boolean, userEmail: string }>) {
    const user = yield* select(getUser);
    if (user) {
        const response = yield* call(SelectOptionApi, user.id ?? -1, optionData.id, optionData.passengerCount, optionData.luggageRequired, optionData.userEmail);
        yield* put(addUserReservation(response.data));
    }
}

export default trackerSagas;