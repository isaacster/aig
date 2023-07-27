// projectDetailsReducer.js
const initialState = {
  projectDetails: null,
  loading: false,
  error: null,
};

const projectDetailsReducer = (state = initialState, action) => {
  
  switch (action.type) {
 
    case 'FETCH_PROJECT_DETAILS_SUCCESS':
      // return { ...state, data: action.payload, loading: false, error: null };

      return {
        ...state,
        projectDetails: action.payload,
        loading: false,
        error: null,
      };
    case 'FETCH_PROJECT_DETAILS_FAILURE':
      return {
        ...state,
        projectDetails: null,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default projectDetailsReducer;
