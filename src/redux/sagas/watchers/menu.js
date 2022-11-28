import { takeLatest,takeEvery } from "@redux-saga/core/effects";
import { ADD_MENU, GET_MENU } from "../../../constants/menu";
import { addMenuSaga, getMenuSaga } from "../handlers/menu";

export function* watchAddMenu(){
    yield takeLatest(ADD_MENU,addMenuSaga);
}

export function* watchGetMenu(){
    yield takeLatest(GET_MENU,getMenuSaga);
}