import { call,put } from "@redux-saga/core/effects";
import { signinFailure, signinSuccess, signupFailure, signupSuccess } from "../../action/auth";
import {signin, signout, signup} from "../../../firestore";

export function* signIn(action){
    try{
        const data = yield call(signin,action.payload);
        yield put(signinSuccess(data._data));
    }
    catch(error){
        console.log(error)
        yield put(signinFailure(error));
    }
}

export function* signUp(action){
    try{
        const data = yield call(signup,action.payload);
        yield put(signupSuccess(data._data));
    }
    catch(error){
        yield put(signupFailure(error));
    }
}

export function* signOut(){
    try{
        yield call(signout);
    }
    catch(error){
        console.log(error);
    }
}