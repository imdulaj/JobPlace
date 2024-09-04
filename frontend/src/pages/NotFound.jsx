import React from 'react'
import NavBar from '../components/NavBar'
import { Box } from '@mui/material'
import Footer from '../components/Footer'

export default function NotFound() {
  return (
    <>
      <NavBar />
      <Box sx={{height:'81vh', display: "flex", alignItems:"center", justifyContent:'center'}}>
        <h1>Page not found</h1>

      </Box>
      <Footer />
    </>
  )
}
