// src/store.js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers'; 
import ProjectDetailsReducer from './reducers/projectDetailsReducer';
import ProjectReducer from './reducers/projectReducer';
import thunkMiddleware from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
