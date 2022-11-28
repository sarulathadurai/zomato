import{
    GET_ORDER_SUCCESS,
    GET_ORDER,
    GET_ORDER_FAILURE,
    ADD_ORDER,
    ADD_ORDER_SUCCESS,
    ADD_ORDER_FAIL,
    CREATE_ORDER,
    CLOSE_ALERT
}from "../../constants/order"

export function getOrder(){
    return{
        type:GET_ORDER
    }
}
export function getOrderSuccess(payload){
    return{
        type:GET_ORDER_SUCCESS,
        payload
    }
}

export function getOrderFailure(payload){
    return{
        type:GET_ORDER_FAILURE,
        payload
    }
}

export function closeAlert(){
    return{
        type:CLOSE_ALERT
    }
}

export function createOrder(payload){
    return{
        type:CREATE_ORDER,
        payload
    }
}

export function addOrder(payload){
    return{
        type:ADD_ORDER,
        payload
    }
}

export function addOrderSuccess(payload){
    return{
        type:ADD_ORDER_SUCCESS,
        payload
    }
}

export function addOrderFailure(payload){
    return{
        type:ADD_ORDER_FAIL,
        payload
    }
}