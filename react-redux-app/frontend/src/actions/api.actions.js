import API_EVENTS from '../utils/events/api';

const getInfo = () => ({
    type: API_EVENTS.GET_API_INITIATE
});

const onDataRecieve = (data) => ({
    type: API_EVENTS.GET_API_RECIEVE,
    data
});

const onError = (error) => ({
    type: API_EVENTS.GET_API_ERROR,
    error
})

export default {
    getInfo,
    onDataRecieve,
    onError
};
