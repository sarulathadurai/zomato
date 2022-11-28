import { takeLatest } from "@redux-saga/core/effects";
import { SIGNIN, SIGNOUT, SIGNUP } from "../../../constants/auth";
import { signIn, signOut, signUp } from "../handlers/auth";

export function* watchSignIn(){
    yield takeLatest(SIGNIN,signIn);
}

export function* watchSignUp(){
    yield takeLatest(SIGNUP,signUp);
}

export function* watchSignOut(){
    yield takeLatest(SIGNOUT,signOut);
}