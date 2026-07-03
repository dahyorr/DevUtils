import { Container } from '@mui/material'
import React from 'react'

const DefaultContainerLayout = ({children}: any) => {
  return (
    <Container sx={{height:"100%"}} maxWidth="xl">
      {children}
    </Container>
  )
}

export default DefaultContainerLayout