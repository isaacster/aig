import myDjsonSampleata from './data.json';
import axios from 'axios';


export const UPDATE_EMAIL_SUCCESS = 'UPDATE_EMAIL_SUCCESS';
export const UPDATE_EMAIL_FAILURE = 'UPDATE_EMAIL_FAILURE';

//This can be used used to update email for resending it MAYBE in case we need it... 
export const updateEmail = (id, updatedData) => {
  return (dispatch) => {
    axios
      .put(`/api/emails/${id}`, updatedData) // Assuming your API endpoint is /api/emails/:id and accepts PUT requests
      .then((response) => {
        // Dispatch the success action if the update was successful
        dispatch({
          type: UPDATE_EMAIL_SUCCESS,
          payload: { id, updatedData },
        });
      })
      .catch((error) => {
        // Dispatch the failure action if there was an error
        dispatch({
          type: UPDATE_EMAIL_FAILURE,
          payload: { id, error },
        });
      });
  };
};




// Action creator to fetch data from the API
export const fetchData = () => {
  return async (dispatch) => {
    try {
      // Dispatch a loading action to indicate that data is being fetched
      dispatch({ type: 'FETCH_DATA_LOADING' });

 ;
      // Fetch data from the API
      const response = myDjsonSampleata;
      
      //JSON.stringify(myDjsonSampleata);
      
      //await axios.get('your-api-endpoint');

      // Dispatch a success action with the received data
      dispatch({ type: 'FETCH_DATA_SUCCESS', payload: response });
    } catch (error) {
      // Dispatch a failure action if the API call fails
      dispatch({ type: 'FETCH_DATA_FAILURE', payload: error.message });
    }
  };
};

export const fetchEmailDetails = (emailId) => async (dispatch) => {
  try {
    //Getting the data from json for testing purposes only !
    //const response = await fetch(`/api/projects/${projectId}`);

     
    const projectsData = myDjsonSampleata;

    const filtered = projectsData.projects.filter(proj => {
      return proj.id === emailId;
    });

 
    dispatch({ type: 'FETCH_EMAIL_DETAILS_SUCCESS', payload: filtered[0] });
  } catch (error) {
    dispatch({ type: 'FETCH_EMAIL_DETAILS_FAILURE', error: 'Failed to fetch email details.' });
  }
};
