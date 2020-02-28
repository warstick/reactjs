import axios from 'axios';
import API_EVENTS from '../utils/events/api';

const initiateAPICall = (state) => ({
    type: API_EVENTS.GET_API_INITIATE,
    selectedState: state
});

const onDataRecieve = (res) => ({
    type: API_EVENTS.GET_API_RECIEVE,
    data: res.data.data
});

const onError = (error) => ({
    type: API_EVENTS.GET_API_ERROR,
    error
});

// making backend calls here...
const loadCitiesByState = async (state, dispatch) => {
    try {
        dispatch(initiateAPICall(state));
        if (state) {
            const response = await axios.get(`http://localhost:8000/getStates/${state}`);

            dispatch(onDataRecieve(response));
        }
        else {
            throw new Error('You didn\'t select State. please select State.');
        }
    }
    catch (err) {
        dispatch(onError(err));
    }
}

export default {
    initiateAPICall,
    onDataRecieve,
    onError,
    loadCitiesByState
};
