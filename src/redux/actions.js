import * as types from './actionTypes';
import db from '../firebase';

const addContact = () => ({
    type: types.ADD_CONTACT
})

export const addContactInitiate = (contact) => {
    //Using dispatch beacause we are using redux thunk
    return function(dispatch) {
     db.collection("contacts").doc().set(contact);
     dispatch(addContact());
    }
}