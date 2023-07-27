const initialState = {
    data: null,
    loading: false,
    error: null,
  };
  
  const emailReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_DATA_LOADING':
        return { ...state, loading: true, error: null };
      case 'FETCH_DATA_SUCCESS':
        return { ...state, data: action.payload, loading: false, error: null };
      case 'FETCH_DATA_FAILURE':
        return { ...state, error: action.payload, loading: false };
      default:
        return state;
    }
  };
  
  export default emailReducer;