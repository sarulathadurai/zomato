import { call,put } from "@redux-saga/core/effects";
import { addOrder, getOrders  } from "../../../firestore";
import { addOrderFailure, addOrderSuccess, getOrderFailure, getOrderSuccess } from "../../action/order";

export function* getOrderSaga(){
    try{
        let data = yield call(getOrders);
        console.log("order success:",data);
        yield put(getOrderSuccess(data))
    }
    catch(errors){
        console.log("errors:",errors);
        yield put(getOrderFailure(error));
    }
}

export function* addOrderSaga(){
    try{
        let data = yield call(addOrder);
        yield put(addOrderSuccess(data));
    }
    catch(errors){
        yield put(addOrderFailure(errors))
    }
}