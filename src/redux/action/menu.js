import {
    ADD_MENU_SUCCESS,
    ADD_MENU_FAIL,
    ADD_MENU,
    SET_IMAGE,
    UPLOAD_IMAGE,
    UPLOAD_IMAGE_SUCCESS,
    CLOSE_ALERT,
    GET_MENU,
    GET_MENU_SUCCESS,
    GET_MENU_FAIL,
    GET_COUNT
} from "../../constants/menu";

export function addMenu(payload){
    return{
        type:ADD_MENU,
        payload
    }
}

export function addMenuSuccess(payload){
    return{
        type:ADD_MENU_SUCCESS,
        payload
    }
}

export function addMenuFailure(payload){
    return{
        type:ADD_MENU_FAIL,
        payload
    }
}


export function setMenuImage(payload){
    console.log('menu:',payload)
    return{
        type:SET_IMAGE,
        payload
    }
}

export function uploadImage(){
    console.log('menu upload:',payload)
    return{
        type:UPLOAD_IMAGE,
    }
}

export function uploadImageSuccess(){
    return{
        type:UPLOAD_IMAGE_SUCCESS,
    }
}

export function closeAlert(){
    console.log("close Alert");
    return{
        type:CLOSE_ALERT
    }
}

export function getMenu(payload){
    return{
        type:GET_MENU,
        payload
    }
}

export function getMenuSuccess(payload){
    return{
        type:GET_MENU_SUCCESS,
        payload
    }
}

export function getMenuFailure(payload){
    return{
        type:GET_MENU_FAIL,
        payload
    }
}

export function getCount(payload){
    return{
        type:GET_COUNT,
        payload
    }
}