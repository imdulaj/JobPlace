
import {
  JOB_CREATE_FAIL,
  JOB_CREATE_REQUEST,
    JOB_CREATE_RESET,
    JOB_CREATE_SUCCESS,
    JOB_LOAD_FAIL,
    JOB_LOAD_REQUEST,
    JOB_LOAD_RESET,
    JOB_LOAD_SINGLE_FAIL,
    JOB_LOAD_SINGLE_REQUEST,
    JOB_LOAD_SINGLE_RESET,
    JOB_LOAD_SINGLE_SUCCESS,
    JOB_LOAD_SUCCESS,
  } from "../constants/jobconstant";
  
  const initialState = {
    loading: false,
    success: false,
    jobs: [],
    page: 1,
    pages: 1,
    count: 0,
    setUniqueLocation: [],
    error: null,
  };
  
  export const loadJobReducer = (state = initialState, action) => {
    switch (action.type) {
      case JOB_LOAD_REQUEST:
        return { ...state, loading: true, error: null };
        
      case JOB_LOAD_SUCCESS:
        return {
          ...state,
          loading: false,
          success: action.payload.success,
          page: action.payload.page,
          pages: action.payload.pages,
          count: action.payload.count,
          setUniqueLocation: action.payload.setUniqueLocation,
          jobs: action.payload.jobs,
        };
  
      case JOB_LOAD_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case JOB_LOAD_RESET:
        return initialState;
  
      default:
        return state;
    }
  };
  

  //single job reducer

  export const loadJobSingleReducer = (state = {job: {}}, action) => {
    switch (action.type) {
      case JOB_LOAD_SINGLE_REQUEST:
        return { ...state, loading: true, error: null };
        
      case JOB_LOAD_SINGLE_SUCCESS:
        return {
          ...state,
          loading: false,
          success: action.payload.success,
          singleJob: action.payload.job,
        };
  
      case JOB_LOAD_SINGLE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case JOB_LOAD_SINGLE_RESET:
        return initialState;
  
      default:
        return state;
    }
  };



  export const jobCreateReducer = (state = initialState, action) => {
    switch (action.type) {
      case JOB_CREATE_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
  
      case JOB_CREATE_SUCCESS:
        return {
          ...state,
          loading: false,
          success: true,
          job: action.payload,
        };
  
      case JOB_CREATE_FAIL:
        return {
          ...state,
          loading: false,
          success: false,
          error: action.payload,
        };
  
      case JOB_CREATE_RESET:
        return initialState;
  
      default:
        return state;
    }
  };





// import { JOB_LOAD_FAIL, JOB_LOAD_REQUEST, JOB_LOAD_RESET, JOB_LOAD_SUCCESS } from "../constants/jobconstant"


// export const loadJobReducer = (state={jobs:[]}, action) => {
// switch (action.type) {
//     case JOB_LOAD_REQUEST:
//         return {loading:true}
//     case JOB_LOAD_SUCCESS:
//         return {
//             loading: false,
//             success: action.payload.success,
//             page: action.payload.page,
//             pages: action.payload.pages,
//             count: action.payload.count,
//             setUniqueLocation: action.payload.setUniqueLocation,
//             jobs: action.payload.jobs

//         }

//     case JOB_LOAD_FAIL:
//         return {
//             loading: false,
//             error: action.payload
                
//         }

//     case JOB_LOAD_RESET:
//         return {}
//     default:
//         return state;
// }
// }