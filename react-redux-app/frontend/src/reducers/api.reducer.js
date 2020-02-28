import API_EVENTS from '../utils/events/api';

const { GET_API_INITIATE, GET_API_RECIEVE, GET_API_ERROR } = API_EVENTS;
const initialState = {
    cities: [],
    loaded: false,
    selectedState: '',
    error: null
};

const api = (state = initialState, action) => {
    switch (action.type) {
        case GET_API_INITIATE: return {
            ...state,
            selectedState: action.selectedState,
            cities: [],
            loaded: false,
            error: null
        };
        case GET_API_RECIEVE: return {
            ...state,
            cities: action.data,
            loaded: true,
            error: null
        };
        case GET_API_ERROR: return {
            ...state,
            cities: [],
            error: action.error,
            loaded: false
        };
        default:
            return state; 
    }
};

export default api;
