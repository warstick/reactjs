import DD_EVENTS from '../utils/events/dd';

const states = [
    'CA',
    'OR',
    'NC',
    'TX'
];

const loadStates = () => ({
    type: DD_EVENTS.LOAD_STATES,
    states
});

const selectCity = (selectedCity) => ({
    type: DD_EVENTS.SELECT_CITY,
    selectedCity
});

export default {
    loadStates,
    selectCity
};
