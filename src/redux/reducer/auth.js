import { 
    SIGNUP_FAIL,
    SIGNIN_FAIL,
    SIGNIN_SUCCESS,
    SIGNUP_SUCCESS, 
    SIGNIN, 
    LOADDASHBOARD, 
    SIGNOUT,
    SIGNUP,
    LOADAUTH, 
    CLOSE_ALERT} from '../../constants/auth';

const initialState = {
    authMsg:"",
    user:{},
    err:"",
    isLoading:false,
    isSuccess:"",
    show:false,
    auth:"",
    screenLoading:true
}

const auth = (state=initialState,action) => { 
    switch (action.type) {
        case SIGNIN:
            return{
                ...state,
                isLoading:true,
                user:action.payload
            }
        case SIGNIN_SUCCESS:
            return{
                ...state,
                authMsg:"Signin Success",
                user:action.payload,
                show:true,
                isSuccess:true,
                isLoading:false,
                auth:true
            } 
            
        case SIGNIN_FAIL:
            return{
                ...state,
                authMsg:"Failed!Incorrect email or password",
                err:action.payload,
                show:true,
                isSuccess:false,
                isLoading:false,
                auth:false,
            } 
        case SIGNUP:
            return{
                ...state,
                user:action.payload,
                isLoading:true,
            }
        case SIGNUP_SUCCESS:
            return{
                ...state,
                authMsg:"Signup success",
                show:true,
                isSuccess:true,
                isLoading:false,
                auth:true,
            } 
            
        case SIGNUP_FAIL:
            return{
                ...state,
                authMsg:"Something went wrong!",
                err:action.payload,
                show:true,
                isSuccess:false,
                isLoading:false,
                auth:false,
            } 
        case LOADAUTH:
            return{
                ...state,
                auth:false,
                screenLoading:false,
            }
        case LOADDASHBOARD:
            return{
                ...state,
                auth:true,
                screenLoading:false,
                user:{role:1}
            }
        case CLOSE_ALERT:
            return{
                ...state,
                show:false
            }
        case SIGNOUT:{
            return{
                ...state,
                auth:false
            }
        }
        default:
            return {
                ...state
            }
            
    }
}

export default auth;