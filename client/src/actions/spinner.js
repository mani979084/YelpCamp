import { SET_SPINNER, REMOVE_SPINNER } from './types'

export const setSpinner = () => dispatch => {
    dispatch({
        type: SET_SPINNER
    })
}
export const removeSpinner = () => dispatch => {
    dispatch({
        type: REMOVE_SPINNER
    })
}


