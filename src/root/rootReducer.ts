import { combineReducers } from 'redux';
import { initialRootState } from './rootSliceModel';
import rootSlice from './rootSlice';
import searchSlice from './searchSlice';
import { initialSearchState } from './searchSliceModel';

/*
 * initialState of the app
 */
export const initialState = {
    state: initialRootState,
    search: initialSearchState
}

/*
 * This is the root state of the app
 * It contains every substate of the app
 */
export type RootStoreType = typeof initialState;

/*
 * Root reducer of the app
 * Returned reducer will be of type Reducer<State>
 */
export const createRootReducer = () => combineReducers({
    state: rootSlice,
    search: searchSlice
});

export default createRootReducer;