import { JOB_TYPE_LOAD_FAIL, JOB_TYPE_LOAD_REQUEST, JOB_TYPE_LOAD_RESET, JOB_TYPE_LOAD_SUCCESS } from "../constants/jobTypeconstant";


export const loadJobTypeReducer = (state={jobType:[]}, action) => {
    switch (action.type) {
        case JOB_TYPE_LOAD_REQUEST:
            return { ...state, loading: true, error: null };
        case JOB_TYPE_LOAD_SUCCESS:
            return {
                loading: false,
                jobType: action.payload.jobT
    
            }
    
        case JOB_TYPE_LOAD_FAIL:
            return {
                loading: false,
                error: action.payload
                    
            }
    
        case JOB_TYPE_LOAD_RESET:
            return {}
        default:
            return state;
    }
    }