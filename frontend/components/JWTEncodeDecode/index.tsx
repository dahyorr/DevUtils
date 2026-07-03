"use client"
import { Box, Stack, Switch, Tab, Tabs, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import PageHeader from '../PageHeader'
import JWTEncode from './JWTEncode'
import JWTDecode from './JWTDecode'


const allowedAlg = [
  'HS256',
  'HS384',
  'HS512',
  // 'RS256', jwk
  // 'RS384',
  // 'RS512',
  // 'ES256',
  // 'ES384',
  // 'ES512',
  // 'PS256',
  // 'PS384',
  // 'PS512',
]

const JWTEncodeDecode = () => {
  const [mode, setMode] = useState<'encode' | "decode">("decode")

  const onModeChange = (e: React.SyntheticEvent, value: 'encode' | "decode") => {
    setMode(value)
  }
  return (
    <Box>
      <PageHeader>
        <Box display="flex" justifyContent={'space-between'}>
          <Typography variant="h4" >JWT Encode/Decode</Typography>

          <Box>
            <Tabs value={mode} onChange={onModeChange} aria-label="basic tabs example">
              <Tab label="Decode" defaultChecked value="decode" />
              <Tab label="Encode" value={'encode'} />
            </Tabs>
          </Box>
        </Box>
      </PageHeader>

      {mode === "encode" ? (<JWTEncode allowedAlg={allowedAlg} />) : (<JWTDecode allowedAlg={allowedAlg}/>)}

    </Box>

  )
}

export default JWTEncodeDecode