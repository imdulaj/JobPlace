import React, { useEffect } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { DataGrid, GridToolbar, gridClasses } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { jobLoadAction } from '../../redux/actions/jobAction';

export const DashJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(jobLoadAction());
  }, [dispatch]);

  const { jobs, loading } = useSelector((state) => state.loadJobs);
  console.log(jobs);
  
  const data = Array.isArray(jobs) && jobs.length > 0 ? jobs : [];

  const deleteJobById = (e, id) => {
    console.log(id);
    // Implement delete logic here
  };

  const columns = [
    {
      field: '_id',
      headerName: 'Job ID',
      width: 150,
      editable: true,
    },
    {
      field: 'title',
      headerName: 'Job name',
      width: 150,
    },
    // {
    //   field: 'jobType',
    //   headerName: 'Category',
    //   width: 150,
    //   valueGetter: (params) => {
    //     console.log(params); // Debugging log
    //     return params?.row?.jobType?.jobtypeName || 'N/A';
    //   },
    // },
    // {
    //   field: 'user',
    //   headerName: 'User',
    //   width: 150,
    //   valueGetter: (params) => {
    //     console.log(params); // Debugging log
    //     return params?.row?.user?.firstName || 'N/A';
    //   },
    // },
    {
      field: 'available',
      headerName: 'Available',
      width: 150,
      renderCell: (params) => {
        console.log(params); // Debugging log
        return params?.row?.available ? "Yes" : "No";
      },
    },
    {
      field: 'salary',
      headerName: 'Salary',
      type: 'number',
      width: 150,
      renderCell: (params) => {
        console.log(params); // Debugging log
        return `$${params?.row?.salary || '0'}`;
      },
    },
    {
      field: 'Action',
      width: 200,
      renderCell: (params) => {
        if (!params?.row) return null;
        return (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '170px' }}>
            <Button variant="contained">
              <Link style={{ color: 'white', textDecoration: 'none' }} to={`/admin/edit/user/${params.row._id}`}>
                Edit
              </Link>
            </Button>
            <Button onClick={(e) => deleteJobById(e, params.row._id)} variant="contained" color="error">
              Delete
            </Button>
          </Box>
        );
      },
    },
  ];
  

  return (
    <Box>
      <Typography variant="h4" sx={{ color: 'white', pb: 3 }}>
        Jobs list
      </Typography>
      <Box sx={{ pb: 2, display: 'flex', justifyContent: 'right' }}>
        <Link to={'/create/job'}>
        <Button variant="contained" color="success" startIcon={<AddIcon />}>
          Create job
        </Button>
        </Link>
      </Box>
      <Paper sx={{ bgcolor: 'secondary.midNightBlue' }}>
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            sx={{
              '& .MuiTablePagination-displayedRows': {
                color: 'black'
              },
              color: 'black',
              [`& .${gridClasses.row}`]: {
                bgcolor: (theme) => theme.palette.secondary.main,
              },
              button: {
                color: "#ffffff",
              }
            }}
            getRowId={(row) => row._id}
            rows={data}
            columns={columns}
            pageSize={3}
            rowsPerPageOptions={[3]}
            checkboxSelection
            slots={{ toolbar: GridToolbar }}
          />
        </Box>
      </Paper>
    </Box>
  );
};
