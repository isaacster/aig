// src/reducers/index.js
import { combineReducers } from 'redux';
import emailReducer from './emailReducer';

// Import your individual reducers here and combine them using combineReducers
const rootReducer = combineReducers({   
    data: emailReducer,   
});

export default rootReducer;
