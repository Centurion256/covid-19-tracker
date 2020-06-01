import {UPDATE_COUNTRIES, UPDATE_QUERY, CHANGE_LOCATION, SET_ERROR} from './';

export const updateCountryData = (payload) => ({
    type: UPDATE_COUNTRIES,
    payload: {...payload}
})

export const updateInputField = (payload) => ({
    type: UPDATE_QUERY,
    payload: { value: payload }
})

export const updateLocation = (payload) => ({
    type: CHANGE_LOCATION,
    payload: { location : payload }
})

export const updateError = (payload) => ({
    type: SET_ERROR,
    payload: { error : payload }
})