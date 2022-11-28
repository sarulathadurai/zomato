import {
    ADD_MENU,
    ADD_MENU_FAIL,
    ADD_MENU_SUCCESS,
    GET_COUNT,
    GET_MENU_SUCCESS,
    GET_MENU,
    SET_IMAGE,
    UPLOAD_IMAGE,
    UPLOAD_IMAGE_SUCCESS,
    CLOSE_ALERT,
    GET_MENU_FAIL
} from "../../constants/menu";

const initialState = {
    msg:"",
    menuList:[],
    menu:{},
    response:"",
    show:false,
    isSuccess:"",
    uploading:"upload",
    image:null,
    isLoading:false,
    menuLoad:false,
    error:""
}

const menu = (state=initialState,action) => {
    switch (action.type) {
        case ADD_MENU:
            return{
                ...state,
                menu:action.payload,
                isLoading:true
            }
        case ADD_MENU_SUCCESS:
            return{
                ...state,
                msg:"Menu added successfully!",
                response:action.payload,
                show:true,
                isSuccess:true,
                isLoading:false,
                uploading:"upload",
                image:null
            }
            
        case ADD_MENU_FAIL:
            return{
                ...state,
                msg:"Something went wrong!",
                show:true,
                isSuccess:false,
                isLoading:false,
                uploading:"upload",
                error:action.payload,
                image:null
            }
        
        case SET_IMAGE:
            console.log("menu red",action.payload);
            return{
                ...state,
                image:action.payload
            }
        case UPLOAD_IMAGE:
            return{
                ...state,
                uploading:true,
            }
        case UPLOAD_IMAGE_SUCCESS:
            return{
                ...state,
                uploading:false,
        }
        case GET_MENU:
            return{
                ...state,
                menuLoad:true
            }
        case GET_MENU_SUCCESS:
            return{
                ...state,
                menuList:action.payload,
                menuLoad:false
            }
        case GET_MENU_FAIL:
            return{
                ...state,
                menuLoad:false,
                error:action.payload
            }
        case GET_COUNT:
            return{
                ...state,
                menuList:action.payload,
            }  
        case CLOSE_ALERT:
            console.log(state);
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

export default menu;