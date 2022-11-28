import {call, put} from "@redux-saga/core/effects";
import {addRestaurant, getRestaurant} from "../../../firestore";
import { addResFailure, addResSuccess, getResFailure, getResSuccess } from "../../action/restaurant";

export function* addResSaga(action){
    try{
        const response = yield call(addRestaurant,action.payload);
        yield put(addResSuccess(response));
    }
    catch(error){
        yield put(addResFailure(error));
    }
}

export function* getResSaga(){
    try{
        const data = yield call(getRestaurant);
        yield put(getResSuccess(data));
    }
    catch(error){
        yield put(getResFailure(error));
    }
}