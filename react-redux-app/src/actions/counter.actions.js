import COUNTER_EVENTS from '../utils/events/counter';

const increment = () => ({
    type: COUNTER_EVENTS.INCREMENT_COUNT
});

const decrement = () => ({
    type: COUNTER_EVENTS.DECREMENT_COUNT
});

const reset = () => ({
    type: COUNTER_EVENTS.RESET_COUNT
});

export default {
    increment,
    decrement,
    reset
};
