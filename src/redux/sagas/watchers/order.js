import { takeLatest } from "@redux-saga/core/effects";
import { ADD_ORDER, GET_ORDER } from "../../../constants/order";
import { addOrderSaga, getOrderSaga } from "../handlers/order";

export function* watchGetOrder(){
    yield takeLatest(GET_ORDER,getOrderSaga);
}

export function* watchAddOrder(){
    yield takeLatest(ADD_ORDER,addOrderSaga);
}