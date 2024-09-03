import { all } from 'redux-saga/effects';
import plannerSagas from './sagas/plannerSagas';

export default function* rootSaga(): Generator {
    yield all([
        ...plannerSagas
    ]);
}
