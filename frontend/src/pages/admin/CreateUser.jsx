import React, { useEffect } from "react";
import { Avatar, Box, Button, TextField } from '@mui/material';
import LockClockOutlined from '@mui/icons-material/LockClockOutlined';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { userSignUpAction } from '../../redux/actions/userAction';
import { useNavigate } from "react-router-dom";

// Validation Schema for Signup
const validationSchema = yup.object({
  firstName: yup
    .string('Enter your first name')
    .required('First name is required'),
  lastName: yup
    .string('Enter your last name')
    .required('Last name is required'),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
  role: yup
    .number('Enter a valid role number')
    .typeError('Role must be a number')
    .required('Role is required')
    .positive('Role must be a positive number')
    .integer('Role must be an integer')
});

export default function CreateUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(state => state.signup); // Ensure correct state is being selected

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/users'); // Navigate upon successful signup
    }
  }, [isAuthenticated, navigate]); // Add isAuthenticated as a dependency to the useEffect hook

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      dispatch(userSignUpAction(values)); // Dispatch signup action
      actions.resetForm(); // Reset form after submission
    }
  });

  return (
    <>

      <Box
        sx={{
          backgroundColor: "white",
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
              sx={{ mb: 2}}
              fullWidth
              id="firstName"
              name="firstName"
              label="First Name"
              InputLabelProps={{ shrink: true }}
              placeholder="First Name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              sx={{ mb: 2 }}
              fullWidth
              id="lastName"
              name="lastName"
              label="Last Name"
              InputLabelProps={{ shrink: true }}
              placeholder="Last Name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
            <TextField
              sx={{ mb: 2 }}
              fullWidth
              id="email"
              name="email"
              label="Email"
              InputLabelProps={{ shrink: true }}
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              sx={{ mb: 2 }}
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              InputLabelProps={{ shrink: true }}
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              sx={{ mb: 2 }}
              fullWidth
              id="role"
              name="role"
              label="Role"
              type="number"
              InputLabelProps={{ shrink: true }}
              placeholder="Role"
              value={formik.values.role}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.role && Boolean(formik.errors.role)}
              helperText={formik.touched.role && formik.errors.role}
            />
            <Button fullWidth variant="contained" type="submit">
              Create
            </Button>
          </Box>
        </Box>
      </Box>
     
    </>
  );
}
