import myDjsonSampleata from './data.json';
import axios from 'axios';

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

export const fetchProjectDetails = (projectId) => async (dispatch) => {
  try {
    //Getting the data from json for testing purposes only !
    //const response = await fetch(`/api/projects/${projectId}`);

     
    const projectsData = myDjsonSampleata;

    const filtered = projectsData.projects.filter(proj => {
      return proj.id === projectId;
    });

 
    dispatch({ type: 'FETCH_PROJECT_DETAILS_SUCCESS', payload: filtered[0] });
  } catch (error) {
    dispatch({ type: 'FETCH_PROJECT_DETAILS_FAILURE', error: 'Failed to fetch project details.' });
  }
};
