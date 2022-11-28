import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducer";
import createSagaMiddleware from "@redux-saga/core";
import { rootSaga } from "./sagas/watchers";
import thunk from 'redux-thunk';

export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware(); 
    const middleware = [sagaMiddleware,thunk];   
    const store = createStore(rootReducer,applyMiddleware(...middleware));
    sagaMiddleware.run(rootSaga);
    return store;
}
