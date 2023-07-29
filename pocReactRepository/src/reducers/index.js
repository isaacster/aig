// src/reducers/index.js
import { combineReducers } from 'redux';
import emailReducer from './emailReducer';
import emailDetailsReducer from './emailDetailsReducer'

// Import your individual reducers here and combine them using combineReducers
const rootReducer = combineReducers({   
    data: emailReducer,
    emailDetails: emailDetailsReducer,
});

export default rootReducer;
