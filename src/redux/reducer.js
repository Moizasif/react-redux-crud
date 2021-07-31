import * as types from './actionTypes';


const initialState = {
    contacts: [],
    contact: {}
}

const contactReducer = (state=initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default contactReducer;