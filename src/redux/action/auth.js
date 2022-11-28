import { 
    LOADAUTH,
    LOADDASHBOARD,
    SIGNIN, 
    SIGNIN_FAIL, 
    SIGNIN_SUCCESS, 
    SIGNOUT, 
    SIGNUP, 
    SIGNUP_FAIL, 
    SIGNUP_SUCCESS,
    CLOSE_ALERT
} from "../../constants/auth";

export function signIn(payload){
    return{
        type: SIGNIN,
        payload
    };
}

export function signinSuccess(payload){
    return{
        type:SIGNIN_SUCCESS,
        payload
    }
}

export function signinFailure(payload){
    return{
        type:SIGNIN_FAIL,
        payload
    }
}

export function signUp(payload){
    return{
        type:SIGNUP,
        payload
    }
}

export function signupSuccess(payload){
    return{
        type:SIGNUP_SUCCESS,
        payload
    }
}

export function signupFailure(payload){
    return{
        type:SIGNUP_FAIL,
        payload
    }
}

export function loadAuth(){
    return{
        type:LOADAUTH
    }
}

export function loadDashboard(){
    return{
        type:LOADDASHBOARD
    }
}

export function signOut(){
    return{
        type:SIGNOUT
    }
}

export function closeAlert(){
    return{
        type:CLOSE_ALERT
    }
}