// src/reducers/index.js
import { combineReducers } from 'redux';
import projectReducer from './projectReducer';
import projectDetailsReducer from './projectDetailsReducer'

// Import your individual reducers here and combine them using combineReducers
const rootReducer = combineReducers({
    // Example:
    data: projectReducer,
    projectDetails: projectDetailsReducer,
});

export default rootReducer;
