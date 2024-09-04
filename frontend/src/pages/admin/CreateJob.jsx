import React from "react";
import { Avatar, Box, Button, TextField } from '@mui/material';
import WorkOutlineOutlined from '@mui/icons-material/WorkOutlineOutlined';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createJobAction } from '../../redux/actions/jobAction';
import { useNavigate } from "react-router-dom";

// Validation Schema for Job Creation
const validationSchema = yup.object({
  title: yup
    .string('Enter job title')
    .max(50, 'Title should be 50 characters or less')
    .required('Job title is required'),
  description: yup
    .string('Enter job description')
    .required('Job description is required'),
  salary: yup
    .string('Enter salary')
    .required('Salary is required'),
  location: yup
    .string('Enter job location'),
  jobtype: yup
    .string('Enter job type ID')
    .required('Job type ID is required'), // Must be a valid ObjectId
  user: yup
    .string('Enter user ID')
    .required('User ID is required') // Must be a valid ObjectId
});

export default function CreateJob() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { success, loading, error } = useSelector(state => state.createjob || {});

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      salary: '',
      location: '',
      jobtype: '',
      user: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      dispatch(createJobAction(values)).then(() => {
        if (success) {
          navigate('/admin/jobs'); // Redirect to jobs page after successful creation
        }
      }).catch(err => {
        console.error('Error creating job:', err);
      });
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
              <WorkOutlineOutlined />
            </Avatar>
            <TextField
              sx={{ mb: 2 }}
              fullWidth
              id="title"
              name="title"
              label="Job Title"
              InputLabelProps={{ shrink: true }}
              placeholder="Job Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
              sx={{ mb: 2 }}
              fullWidth
              id="description"
              name="description"
              label="Job Description"
              InputLabelProps={{ shrink: true }}
              placeholder="Job Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
            />
            <TextField
              sx={{ mb: 2 }}
              fullWidth
              id="salary"
              name="salary"
              label="Salary"
              InputLabelProps={{ shrink: true }}
              placeholder="Salary"
              value={formik.values.salary}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.salary && Boolean(formik.errors.salary)}
              helperText={formik.touched.salary && formik.errors.salary}
            />
            <TextField
              sx={{ mb: 2 }}
              fullWidth
              id="location"
              name="location"
              label="Location"
              InputLabelProps={{ shrink: true }}
              placeholder="Location"
              value={formik.values.location}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.location && Boolean(formik.errors.location)}
              helperText={formik.touched.location && formik.errors.location}
            />
            <TextField
              sx={{ mb: 2 }}
              fullWidth
              id="jobtype"
              name="jobtype"
              label="Job Type ID"
              InputLabelProps={{ shrink: true }}
              placeholder="Job Type ID"
              value={formik.values.jobtype}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.jobtype && Boolean(formik.errors.jobtype)}
              helperText={formik.touched.jobtype && formik.errors.jobtype}
            />
            <TextField
              sx={{ mb: 2 }}
              fullWidth
              id="user"
              name="user"
              label="User ID"
              InputLabelProps={{ shrink: true }}
              placeholder="User ID"
              value={formik.values.user}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.user && Boolean(formik.errors.user)}
              helperText={formik.touched.user && formik.errors.user}
            />
            <Button fullWidth variant="contained" type="submit" disabled={loading}>
              Create Job
            </Button>
            {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
          </Box>
        </Box>
      </Box>
    </>
  );
}
