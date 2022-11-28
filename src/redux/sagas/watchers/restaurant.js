import { takeLatest } from "@redux-saga/core/effects";
import { ADD_RES, GET_RES } from "../../../constants/restaurant";
import { addResSaga, getResSaga } from "../handlers/restaurant";


export function* watchAddRes(){
    yield takeLatest(ADD_RES,addResSaga);
}

export function* watchGetRes(){
    yield takeLatest(GET_RES,getResSaga);
}