import apiReducer from './api.reducer';
import ddReducer from './dd.reducer';
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    cities: apiReducer,
    dd: ddReducer
});

export default rootReducer;
