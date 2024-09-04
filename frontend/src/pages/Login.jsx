import React, { useEffect } from "react";
import {Avatar,Box, Button,TextField} from '@mui/material';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import LockClockOutlined from '@mui/icons-material/LockClockOutlined';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {userSignInAction} from '../redux/actions/userAction';
import { useNavigate } from "react-router-dom";


const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string('Enter your password')
      .min(6, 'minimum 6 characters length')
      .required('Password is required'),
  });


  export default function Login()  {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isAuthenticated,userInfo} = useSelector(state => state.signIn);
    useEffect(() => {
      if(isAuthenticated){
        if(userInfo.role === 1){
          navigate('/admin/dashboard');
        }else{
          navigate('/user/dashboard')
        }
      }
        
    },[isAuthenticated])

    const formik = useFormik({
        initialValues:{
            email: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            //alert(JSON.stringify(values, null, 2));
            dispatch(userSignInAction(values));
            actions.resetForm();
        }
    })

  return (

  

    <>
    <NavBar />
      <Box
        sx={{
          height: "81vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          onSubmit={formik.handleSubmit}
          component="form"
          className="form_style border-style"
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main", mb: 3 }}>
              <LockClockOutlined />
            </Avatar>
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="email"
              name="email"
              label="Email"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button fullWidth variant="contained" type="submit">Log In</Button>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
};
