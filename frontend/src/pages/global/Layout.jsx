import React from 'react';
import {Box} from '@mui/material';
import {HeaderTop} from './HeaderTop';
import {SidebarA} from './SidebarA';

export const Layout = (Component) => ({ ...props }) =>  {
  return (
    <>
    <div style={{display: 'flex', minHeight:'100vh'}}>
        <SidebarA />
        <Box sx={{width: "100%", bgcolor: "#002952"}}>
            <HeaderTop />
            <Box sx={{p:3}}>
                <Component {...props} />
            </Box>

        </Box>

    </div>
    </>
  )
}
