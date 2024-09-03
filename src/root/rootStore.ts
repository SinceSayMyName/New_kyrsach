import { configureStore } from '@reduxjs/toolkit';
import { Store } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { createRootReducer } from './rootReducer';
import rootSaga from './rootSaga';

/*
 * We're giving State interface to create store
 * store is type of State defined in our reducers
 */

const devMode = process.env.NODE_ENV === 'development';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// create root reducer
const reducer = createRootReducer();

export const store: Store = configureStore(
    {
        reducer,
        devTools: devMode,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware(
            {
                thunk: false,
                serializableCheck: false
            })
            .concat(sagaMiddleware)
    });

// then run the saga
sagaMiddleware.run(rootSaga);
