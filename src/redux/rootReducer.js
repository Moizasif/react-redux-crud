import { combineReducers } from 'redux';
import contactReducer from './reducer';


//We are accessing all reducers using data key

const rootReducer = combineReducers({
    data: contactReducer
})

export default rootReducer;