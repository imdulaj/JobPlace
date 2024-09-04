import React, { useEffect } from 'react';
import { Box, Button,  Paper, Typography } from '@mui/material';
import { DataGrid ,GridToolbar,gridClasses} from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { allUserAction,deleteUserAction } from '../../redux/actions/userAction';


export const DashUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allUserAction());
  }, [dispatch]);

  const { users } = useSelector((state) => state.allUsers);
  console.log(users);
  const data = users && users.length > 0 ? users : [];

  const deleteUserById = (id) => {
    // Confirm before deleting
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      dispatch(deleteUserAction(id)); 
    }
  };

  const columns = [
    {
      field: '_id',
      headerName: 'User ID',
      width: 150,
      editable: true,
    },
    {
      field: 'email',
      headerName: 'E-mail',
      width: 150,
    },
    {
      field: 'role',
      headerName: 'User status',
      width: 150,
      renderCell: (params) => (
        params.row.role === 1 ? "Admin" : "Regular user"
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Creation Date',
      width: 150,
      renderCell: (params) => {
        return moment(params.row.createdAt).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      field: 'Action',
      width: 200,
      renderCell: (values) => {
        return (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '170px' }}>
            <Button variant="contained">
              <Link style={{ color: 'white', textDecoration: 'none' }} to={`/admin/edit/user/${values.row._id}`}>
                Edit
              </Link>
            </Button>
            <Button onClick={(e) => deleteUserById(e, values.row._id)} variant="contained" color="error">
              Delete
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <>
      <Box>
        <Typography variant="h4" sx={{ color: 'white', pb: 3 }}>
          All Users
        </Typography>
        <Box sx={{ pb: 2, display: 'flex', justifyContent: 'right' }}>
         <Link to={'/admin/createUser'}> <Button variant="contained" color="success" startIcon={<AddIcon />}>
            Create user
          </Button></Link>
        </Box>
        <Paper sx={{ bgcolor: 'secondary.midNightBlue' }}>
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
            sx={{
              '& .MuiTablePagination-displayedRows': {
                color: 'black'
              },
              color:'black',
              [`& .${gridClasses.row}`]: {
                bgcolor: (theme) => theme.palette.secondary.main
              },
              button: {
                color: "#ffffff"
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
    </>
  );
};
