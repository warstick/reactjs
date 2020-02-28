import API_EVENTS from '../utils/events/api';

const { GET_API_INITIATE, GET_API_RECIEVE, GET_API_ERROR } = API_EVENTS;

const api = (state = {}, action) => {
    switch (action.type) {
        case GET_API_INITIATE: return {
            ...state,
            loading: true
        };
        case GET_API_RECIEVE: return {
            ...state,
            response: action.data,
            loading: false
        };
        case GET_API_ERROR: return {
            ...state,
            error: action.error,
            loading: false
        };
        default:
            return state; 
    }
};

export default api;
