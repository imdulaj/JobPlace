import axios from "axios";
import { ALL_USER_LOAD_FAIL, ALL_USER_LOAD_REQUEST, ALL_USER_LOAD_SUCCESS, USER_APPLY_JOB_FAIL, USER_APPLY_JOB_REQUEST, USER_APPLY_JOB_SUCCESS, USER_DELETE_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_LOAD_FAIL, USER_LOAD_REQUEST, USER_LOAD_SUCCESS, USER_LOGOUT_FAIL, USER_LOGOUT_REQUEST, USER_LOGOUT_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS } from "../constants/userconstant";
import {toast} from 'react-toastify';


export const userSignUpAction = (user) => async (dispatch) => {
  dispatch({ type: USER_SIGNUP_REQUEST });
  try {
    const { data } = await axios.post('/auth/signup', user);
    localStorage.setItem('userInfo', JSON.stringify(data));
    console.log("Data fetched", data);
    dispatch({
      type: USER_SIGNUP_SUCCESS,
      payload: data
    });
    toast.success("Signup Successful!");
  } catch (error) {
    console.error("Error during signup:", error.response?.data?.error || error.message);
    dispatch({
      type: USER_SIGNUP_FAIL,
      payload: error.response?.data?.error || error.message
    });
    toast.error(error.response?.data?.error || error.message);
  }
}




export const userSignInAction =(user) => async(dispatch) => {
    dispatch({type: USER_SIGNIN_REQUEST});
    try {
        const {data} = await axios.post('/auth/signin', user);
        localStorage.setItem('userInfo',JSON.stringify(data));
        console.log("Data fetched", data);
        dispatch({
            type : USER_SIGNIN_SUCCESS,
            payload: data
        });
        toast.success("Login Successfully!");
    } catch (error) {
        console.error("Error fetching login:",error.response?.data?.error || error.message);
        dispatch({
            type : USER_SIGNIN_FAIL,
            payload: error.response?.data?.error || error.message
        });
        toast.error(error.response.data.error);
    }
}


export const userLogOutAction =() => async(dispatch) => {
    dispatch({type: USER_LOGOUT_REQUEST});
    try {
        const {data} = await axios.get('/auth/logout');
        localStorage.removeItem('userInfo');
        console.log("Data fetched", data);
        dispatch({
            type : USER_LOGOUT_SUCCESS,
            payload: data
        });
        toast.success("Log out Successfully!");
    } catch (error) {
        console.error("Error fetching logout:",error.response?.data?.error || error.message);
        dispatch({
            type : USER_LOGOUT_FAIL,
            payload: error.response?.data?.error || error.message
        });
        toast.error(error.response.data.error);
    }
}


export const userProfileAction =() => async(dispatch) => {
    dispatch({type: USER_LOAD_REQUEST});
    try {
        const {data} = await axios.get('/auth/me');
        localStorage.removeItem('userInfo');
        console.log("Data fetched", data);
        dispatch({
            type : USER_LOAD_SUCCESS,
            payload: data
        });
        
    } catch (error) {
        console.error("Error fetching me:",error.response?.data?.error || error.message);
        dispatch({
            type : USER_LOAD_FAIL,
            payload: error.response?.data?.error || error.message
        });
        
    }
}


export const userApplyJobAction =(job) => async(dispatch) => {
    dispatch({type: USER_APPLY_JOB_REQUEST});
    try {
        const {data} = await axios.post('/auth/user/jobhistory', job);
        console.log("Data fetched", data);
        dispatch({
            type : USER_APPLY_JOB_SUCCESS,
            payload: data
        });
        toast.success("Apply Successfully For This Job!");
    } catch (error) {
        console.error("Error fetching login:",error.response?.data?.error || error.message);
        dispatch({
            type : USER_APPLY_JOB_FAIL,
            payload: error.response?.data?.error || error.message
        });
        toast.error(error.response.data.error);
    }
}





export const allUserAction =() => async(dispatch) => {
    dispatch({type: ALL_USER_LOAD_REQUEST});
    try {
        const {data} = await axios.get('/auth/allusers');
        console.log(" users Data fetched", data);
        dispatch({
            type : ALL_USER_LOAD_SUCCESS,
            payload: data
        });
        
    } catch (error) {
        console.error("Error fetching me:",error.response?.data?.error || error.message);
        dispatch({
            type : ALL_USER_LOAD_FAIL,
            payload: error.response?.data?.error || error.message
        });
        
    }
}


export const deleteUserAction = (id) => async (dispatch) => {
    dispatch({ type: USER_DELETE_REQUEST });

    try {
        // Make sure the URL is correct and the id is being passed correctly
        await axios.delete(`/auth/admin/user/delete/${id}`);
        
        dispatch({
            type: USER_DELETE_SUCCESS,
            payload: id
        });

        toast.success("User deleted successfully!");
    } catch (error) {
        // Log error to console
        console.error("Error deleting user:", error.response?.data?.error || error.message);

        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.response?.data?.error || error.message
        });

        // Show error message to user
        toast.error(error.response?.data?.error || error.message);
    }
};


