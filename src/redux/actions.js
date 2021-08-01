import * as types from './actionTypes';
import db from '../firebase';



const getContacts = (contacts) => ({
    type: types.GET_CONTACTS,
    payload: contacts,
})

const addContact = () => ({
    type: types.ADD_CONTACT
})


export const getContactsInitiate = () => {
    return function(dispatch){
        db.collection("contacts").onSnapshot((querySnapshot) => {
            const contacts = [];
            querySnapshot.forEach((doc) => {
                contacts.push({...doc.data(), id:doc.id})
            })
            dispatch(getContacts(contacts));
        })
    }
}

export const addContactInitiate = (contact) => {
    //Using dispatch beacause we are using redux thunk
    return function(dispatch) {
     db.collection("contacts").doc().set(contact);
     dispatch(addContact());
    }
}