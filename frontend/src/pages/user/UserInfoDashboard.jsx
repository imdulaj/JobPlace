import React from 'react';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';

export const UserInfoDashboard = () => {
    const {user} = useSelector(state => state.userProfile);
    const {palette} = useTheme();

    console.log(user);

  return (
    <>
    
    <Box sx={{maxWidth: '50%', margin:"auto", pt:10}}>
        <Card sx={{minWidth:275, bgcolor:palette.secondary.midNightBlue}}>
            <CardContent>
                <Typography sx={{fontSize:16}} color="#fafafa" gutterBottom>
                    Personal Info
                </Typography>
            
            <hr style={{marginBottom: "30px"}}/>
            <Typography variant='h5' component="div" sx={{color:"#fafafa"}}>
                First Name: {user && user.firstName}
            </Typography>
            <Typography variant='h5' component="div" sx={{color:"#fafafa"}}>
                Last Name: {user && user.lastName}
            </Typography>
            <Typography variant='h5' component="div" sx={{color:"#fafafa"}}>
                E-mail: {user && user.email}
            </Typography>
            <Typography sx={{mb:1.5, color:"gray", pt:2}} color="text.secondary">
                Status: {user && user.role === 0 ? "Regular user" : "Admin"}
            </Typography>
            </CardContent>
        </Card>

    </Box>

    </>
  )
}
