import {all} from "@redux-saga/core/effects";
import { watchSignIn, watchSignOut, watchSignUp } from "./auth";
import { watchAddMenu, watchGetMenu } from "./menu";
import { watchAddOrder, watchGetOrder } from "./order";
import { watchAddRes, watchGetRes } from "./restaurant";

export function* rootSaga() {
    yield all([
        watchAddRes(),
        watchAddOrder(),
        watchAddMenu(),
        watchSignIn(),
        watchSignOut(),
        watchSignUp(),
        watchGetRes(),
        watchGetMenu(),
        watchGetOrder(),
    ])
}