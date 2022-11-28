import { 
    ADD_RES_SUCCESS, 
    ADD_RES, 
    ADD_RES_FAIL, 
    SET_RES_IMAGE, 
    UPLOAD_RES_IMAGE, 
    UPLOAD_RES_IMAGE_SUCCESS, 
    GET_RES, 
    GET_RES_SUCCESS, 
    GET_RES_FAIL, 
    CLOSE_ALERT,
    SET_ADDRESS
} from "../../constants/restaurant";

export function addRes(payload){
    return{
        type:ADD_RES,
        payload
    }
}

export function addResSuccess(payload){
    return{
        type:ADD_RES_SUCCESS,
        payload
    }
}

export function addResFailure(payload){
    return{
        type:ADD_RES_FAIL,
        payload 
    }
}

export function getRes(){
    return{
        type:GET_RES
    }
}

export function getResSuccess(payload){
    return{
        type:GET_RES_SUCCESS,
        payload
    }
}

export function getResFailure(payload){
    return{
        type:GET_RES_FAIL,
        payload
    }
}

export function setImage(payload){
    console.log('Res:',payload)
    return{
        type:SET_RES_IMAGE,
        payload
    }
}

export function uploadImage(){
    return{
        type:UPLOAD_RES_IMAGE,
    }
}

export function uploadImageSuccess(){
    return{
        type:UPLOAD_RES_IMAGE_SUCCESS,
    }
}

export function closeAlert(){
    return{
        type:CLOSE_ALERT
    }
}

export function setAddress(payload){
    return{
        type:SET_ADDRESS,
        payload
    }
}