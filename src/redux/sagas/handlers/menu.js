import { call,put } from "@redux-saga/core/effects";
import { getMenu,addMenu } from "../../../firestore";
import { addMenuFailure, addMenuSuccess, getMenuFailure, getMenuSuccess } from "../../action/menu";

export function* addMenuSaga(action){
    try{
        const response = yield call(addMenu,action.payload);
        yield put(addMenuSuccess(response));
    }
    catch(error){
        yield put(addMenuFailure(error))
    }
}

export function* getMenuSaga(action){
    try{
        const data = yield call(getMenu,action.payload);
        console.log(data);
        yield put(getMenuSuccess(data));
    }
    catch(error){
        console.log(error);
        yield put(getMenuFailure(error))
    }
}