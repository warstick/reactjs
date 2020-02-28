import apiReducer from './api.reducer';
import counterReducer from './counter.reducer';
import {combineReducers} from 'redux'

const combinedReducer = combineReducers({
    apiReducer,
    counterReducer
});

export default combinedReducer;
