import { combineReducers } from "redux";
import auth from "./auth";
import menu from "./menu";
import order from "./order";
import restaurant from "./restaurant";

const rootReducer = combineReducers({
    auth,
    menu,
    restaurant,
    order
})

export default rootReducer;