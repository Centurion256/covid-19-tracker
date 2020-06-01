import { CHANGE_LOCATION, UPDATE_COUNTRIES, UPDATE_QUERY, SET_ERROR } from '../actions/';

const initialCountryState = {
    countries: [],
    global: {}
}

export const countryReducer = (state = initialCountryState, { type, payload }) => {
    switch (type) {

        case UPDATE_COUNTRIES:
            return {
                ...state,
                countries: [...state.countries, ...payload.countries],
                global: { ...payload.global }
            };

        default:
            return state;
    }
}

const initialInputState = {
    inputField: "",
    error: false
}

export const inputReducer = (state = initialInputState, { type, payload }) => {
    switch (type) {
        case UPDATE_QUERY:
            return {
                ...state,
                ...payload
            };
        case SET_ERROR:
            return {
                ...state,
                ...payload
            };
        default:
            return state;
    }
};

const initialNavigationState = {
    location: "/"
};

export const navigationReducer = (state = initialNavigationState, { type, payload }) => {
    switch (type) {
        case CHANGE_LOCATION:
            return {
                ...state,
                ...payload
            };

        default:
            return state;
    }
};

