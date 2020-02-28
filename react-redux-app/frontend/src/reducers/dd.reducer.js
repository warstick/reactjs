import STATES_EVENTS from '../utils/events/dd';

const {LOAD_STATES, SELECT_CITY} = STATES_EVENTS;
const initialState = {
    states: []
};

const states = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_STATES:
            return {
                ...state,
                states: action.states
            };
        case SELECT_CITY:
            return {
                ...state,
                selectedCity: action.selectedCity
            };
        default:
            return state;
    }
};

export default states;
