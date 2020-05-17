import {takeLatest, takeEvery} from 'redux-saga/effects';
import models from "../store/models";

export default function* rootSaga() {
    for(let i=0; i < Object.keys(models).length; i++) {
        const model = models[Object.keys(models)[i]];
        // CRUD Listeners
        yield takeLatest(model.types.create, model.sagas.create);
        yield takeLatest(model.types.read, model.sagas.read);
        yield takeLatest(model.types.update, model.sagas.update);
        yield takeLatest(model.types.delete, model.sagas.deleted);
    }
}



