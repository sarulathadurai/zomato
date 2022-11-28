import { 
    GET_ORDER_SUCCESS, 
    ADD_ORDER_FAIL,
    ADD_ORDER_SUCCESS, 
    CREATE_ORDER, 
    GET_ORDER, 
    GET_ORDER_FAILURE,
    CLOSE_ALERT, 
    ADD_ORDER
} from "../../constants/order";

const initialState = {
    msg:"",
    pastOrders:[],
    orders:[],
    isLoading:false,
    error:"",
    show:false,
    isSuccess:"",
    isLoading:false
}


const order = (state = initialState,action) => {
    switch (action.type) {
        case ADD_ORDER:
            return{
                ...state,
                isLoading:true
            }
        case ADD_ORDER_SUCCESS:
            return{
                ...state,
                msg:"Order created successfully",
                orders:[],
                isSuccess:true
            }
        case ADD_ORDER_FAIL:
            return{
                ...state,
                msg:"Something went wrong!",
                isSuccess:false
            }
        case GET_ORDER:
            return{
                ...state,
                isLoading:true
            }    
        case GET_ORDER_SUCCESS:
            console.log("order success:",action.payload);
            return{
                ...state,
                pastOrders:action.payload,
                isLoading:false,
                isSuccess:true,
            }
        case GET_ORDER_FAILURE:
            return{
                ...state,
                error:action.payload,
                isLoading:false,
                isSuccess:false,
            }
        case CREATE_ORDER:
            return{
                ...state,
                orders:[...action.payload]
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

export default order;