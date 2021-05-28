import { SET_SPINNER, REMOVE_SPINNER } from '../actions/types'

const initialState = {
    display: 'none'
}

const spinner = function (state = initialState, action) {
    const { type } = action;

    switch (type) {
        case SET_SPINNER:
            return { display: '' };
        case REMOVE_SPINNER:
            return { display: 'none' };
        default:
            return state;
    }
}

export default spinner;