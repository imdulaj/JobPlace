import React from 'react';
import {Card, CardContent, Typography, useTheme,IconButton} from '@mui/material';

export const StatComponent = ({value, icon, description,money}) => {
    const {palette} = useTheme();
  return (
    <>
    <Card sx={{bgcolor: palette.secondary.midNightBlue, width:"100%"}}>
        <CardContent>
            <IconButton sx={{bgcolor:palette.primary.main, mb:2}}>
                {icon}

            </IconButton>
            <Typography variant="h4" sx={{color:"#fafafa", mb:'3px', fontWeight:700}}>
                {money !== '' ? money + value : value}

            </Typography>
            <IconButton variant="body2" sx={{color:palette.primary.main, mb:0}}>
                {description}

            </IconButton>
        </CardContent>

    </Card>
    </>

    
  )
}
