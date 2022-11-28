import { 
    ADD_RES,
    GET_RES,
    ADD_RES_SUCCESS,
    GET_RES_SUCCESS,
    ADD_RES_FAIL,
    GET_RES_FAIL,
    UPLOAD_RES_IMAGE, 
    SET_RES_IMAGE,
    UPLOAD_RES_IMAGE_SUCCESS,
    CLOSE_ALERT,
    SET_ADDRESS
    } from "../../constants/restaurant";

const initialState = {
    error:"",
    response:"",
    restaurant:{},
    msg:"",
    show:false,
    isSuccess:"",
    uploading:"upload",
    image:null,
    isLoading:false,
    dashLoading:false,
    restaurants:[],
    mapAddress:""
} 

const restaurant = (state = initialState,action) => {
    switch (action.type) {
        case ADD_RES:
            return{
                ...state,
                restaurant:action.payload,
                isLoading:true
            }
        case ADD_RES_SUCCESS:
            return {
                ...state,
                msg:"Restaurant added successfully",
                response:action.payload,
                show:true,
                isSuccess:true,
                isLoading:false,
                uploading:"upload",
                image:null
            }            
        case ADD_RES_FAIL:
            return{
                ...state,
                msg:"Something went wrong!Please try again",
                show:true,
                isSuccess:false,
                isLoading:false,
                uploading:"upload",
                error:action.payload,
                image:null
            }
        case SET_RES_IMAGE:
            return{
                ...state,
                image:action.payload
            }
        case UPLOAD_RES_IMAGE:
            return{
                ...state,
                uploading:true,
            }
        case UPLOAD_RES_IMAGE_SUCCESS:
            return{
                ...state,
                uploading:false,
            }
        case GET_RES:
            return{
                ...state,
                dashLoading:true
            }
        case GET_RES_SUCCESS:
            return{
                ...state,
                restaurants:action.payload,
                dashLoading:false
            }
        case GET_RES_FAIL:
            return{
                ...state,
                msg:"oops!Failed to fetch data",
                dashLoading:false
            }
        case SET_ADDRESS:
            return{
                ...state,
                mapAddress:action.payload
            }
        case CLOSE_ALERT:
            return{
                ...state,
                show:false
            }
        
        default:
            return{
                ...state
            }
    }
} 

export default restaurant;