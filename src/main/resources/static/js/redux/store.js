import rootReducer from 'redux/reducers/rootReducer'
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";

export default createStore(rootReducer, applyMiddleware(thunk));