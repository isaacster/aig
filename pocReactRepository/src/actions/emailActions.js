import myDjsonSampleata from './data.json';
import axios from 'axios';

export const UPDATE_EMAIL_SUCCESS = 'UPDATE_EMAIL_SUCCESS';
export const UPDATE_EMAIL_FAILURE = 'UPDATE_EMAIL_FAILURE';

// Action creator to fetch data from the API
export const fetchData = () => {
  return async (dispatch) => {
    try {
      // Dispatch a loading action to indicate that data is being fetched
      dispatch({ type: 'FETCH_DATA_LOADING' });

      // Fetch data from the API
      const response = myDjsonSampleata;

      // Dispatch a success action with the received data
      dispatch({ type: 'FETCH_DATA_SUCCESS', payload: response });
    } catch (error) {
      // Dispatch a failure action if the API call fails
      dispatch({ type: 'FETCH_DATA_FAILURE', payload: error.message });
    }
  };
};
