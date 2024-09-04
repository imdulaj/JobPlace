
import axios from "axios";
import { JOB_CREATE_FAIL, JOB_CREATE_REQUEST, JOB_CREATE_SUCCESS, JOB_LOAD_FAIL, JOB_LOAD_REQUEST, JOB_LOAD_SINGLE_FAIL, JOB_LOAD_SINGLE_REQUEST, JOB_LOAD_SINGLE_SUCCESS, JOB_LOAD_SUCCESS } from "../constants/jobconstant"
import {toast} from 'react-toastify';


export const jobLoadAction =(pageNumber, keyword = '', cat= '', location ='') => async(dispatch) => {
    dispatch({type: JOB_LOAD_REQUEST});
    try {
        const {data} = await axios.get(`/auth/jobs/show/?pageNumber=${pageNumber}&keyword=${keyword}&cat=${cat}&location=${location}`);
        console.log("Data fetched", data);
        dispatch({
            type : JOB_LOAD_SUCCESS,
            payload: data
        });
    } catch (error) {
        console.error("Error fetching jobs:",error.response?.data?.error || error.message);
        dispatch({
            type : JOB_LOAD_FAIL,
            payload: error.response?.data?.error || error.message
        })
    }
}

export const jobLoadSingleAction =(id) => async(dispatch) => {
    dispatch({type: JOB_LOAD_SINGLE_REQUEST});
    try {
        const {data} = await axios.get(`/auth/job/${id}`);
        console.log("Data fetched", data);
        dispatch({
            type : JOB_LOAD_SINGLE_SUCCESS,
            payload: data
        });
    } catch (error) {
        console.error("Error fetching jobs:",error.response?.data?.error || error.message);
        dispatch({
            type : JOB_LOAD_SINGLE_FAIL,
            payload: error.response?.data?.error || error.message
        })
    }
}



export const createJobAction = (job) => async (dispatch) => {
    dispatch({ type: JOB_CREATE_REQUEST });
    try {
      const { data } = await axios.post('/auth/job/create', job);
      dispatch({
        type: JOB_CREATE_SUCCESS,
        payload: data,
      });
      toast.success("Job created successfully!");
    } catch (error) {
      console.error("Error creating job:", error.response?.data?.error || error.message);
      dispatch({
        type: JOB_CREATE_FAIL,
        payload: error.response?.data?.error || error.message,
      });
      toast.error(error.response?.data?.error || error.message);
    }
  };





// import axios from "axios";
// import { JOB_LOAD_FAIL, JOB_LOAD_REQUEST, JOB_LOAD_SUCCESS } from "../constants/jobconstant"



// export const jobLoadAction =(pageNumber, keyword = '', cat= '', location ='') => async(dispatch) => {
//     dispatch({type: JOB_LOAD_REQUEST});
//     try {
//         const {data} = await axios.get(`/auth/jobs/show/?pageNumber=${pageNumber}&keyword=${keyword}&cat=${cat}&location=${location}`);
//         console.log("Data fetched", data);
//         dispatch({
//             type : JOB_LOAD_SUCCESS,
//             payload: data
//         });
//     } catch (error) {
//         console.error("Error fetching jobs:",error.response?.data?.error || error.message);
//         dispatch({
//             type : JOB_LOAD_FAIL,
//             payload: error.response?.data?.error || error.message
//         })
//     }
// }