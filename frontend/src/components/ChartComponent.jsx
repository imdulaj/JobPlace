import React from 'react'
import {Card, CardContent, useTheme} from '@mui/material'

export const ChartComponent = ({children}) => {
    const {palette} = useTheme();
  return (
    <>
    <Card sx={{bgcolor:palette.secondary.midNightBlue, width:"100%"}}>
        <CardContent>
            {children}
        </CardContent>

    </Card>
    </>
  )
}
