import axios from "axios";
import { JOB_TYPE_LOAD_FAIL, JOB_TYPE_LOAD_REQUEST, JOB_TYPE_LOAD_SUCCESS } from "../constants/jobTypeconstant";


export const jobTypeLoadAction =() => async(dispatch) => {
        dispatch({type: JOB_TYPE_LOAD_REQUEST});
        try {
            const {data} = await axios.get('/auth/type/jobs');
            console.log("Data fetched", data);
            dispatch({
                type : JOB_TYPE_LOAD_SUCCESS,
                payload: data
            });
        } catch (error) {
            console.error("Error fetching job types:",error.response?.data?.error || error.message);
            dispatch({
                type : JOB_TYPE_LOAD_FAIL,
                payload: error.response?.data?.error || error.message
            })
        }
    }