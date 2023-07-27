const initialState = {
  emailDetails: null,
  loading: false,
  error: null,
};

const emailDetailsReducer = (state = initialState, action) => {
  
  switch (action.type) {
 
    case 'FETCH_EMAIL_DETAILS_SUCCESS':
      // return { ...state, data: action.payload, loading: false, error: null };

      return {
        ...state,
        projectDetails: action.payload,
        loading: false,
        error: null,
      };
    case 'FETCH_EMAIL_DETAILS_FAILURE':
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

export default emailDetailsReducer;
