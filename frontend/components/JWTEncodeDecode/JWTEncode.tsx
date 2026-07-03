"use client "
import { Box, Button, IconButton, InputAdornment, MenuItem, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { JWTEncodeSettings } from './JWTSettings';
import { SignJWT } from 'jose';
import { useSnackbar } from 'notistack';

type Props = {
  allowedAlg: string[]
}

const JWTEncode = ({allowedAlg}: Props) => {
  const {enqueueSnackbar} = useSnackbar()
  const [settings, setSettings] = useState<JWTEncodeSettings>({
    algorithm: 'HS256',
    signingKey: '',
    payload: '',
  })
  const [jwt, setJWT] = useState('')

  const onGenerate = async () => {
    // generate jwt token
    //validate payload is a valid json
    let payload : any
    try {
      payload = JSON.parse(settings.payload)
    } catch (error) {
      enqueueSnackbar('Invalid JSON payload', {variant: 'error'})
      return
    }
    if(!payload){
      enqueueSnackbar('Invalid JSON payload', {variant: 'error'})
      return
    }
    if(!allowedAlg.includes(settings.algorithm)){
      enqueueSnackbar('Invalid Algorithm', {variant: 'error'})
      return
    }
    const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: settings.algorithm })
    .setIssuedAt()
    .setIssuer('https://devutils.dayo.dev')
    // .setAudience()
    // .setExpirationTime('2h')
    .sign(new TextEncoder().encode(settings.signingKey))
    setJWT(token)
  }

  const onCopy = () => {
    // copy jwt token to clipboard
    navigator.clipboard.writeText(jwt)
    enqueueSnackbar('Copied to clipboard', {variant: 'success'})
  }

  const onUpdateSettings = (key : keyof JWTEncodeSettings, value: string) => {
    setSettings({
      ...settings,
      [key]: value
    })
  }

  const allowGenerate = settings.algorithm && settings.signingKey && settings.payload
  return (
    <Stack spacing={2} alignItems={'center'}>
      <TextField
        id="algorithm"
        label="Algorithm"
        value={settings.algorithm}
        onChange={(e) => onUpdateSettings("algorithm",e.target.value)}
        select
        fullWidth
      >
        {allowedAlg.map(a => (<MenuItem key={a} value={a}>{a}</MenuItem>))}
      </TextField>

      <Stack direction='row' spacing={0} width={'100%'}>
        <TextField
          id="Signing-Key"
          label="Signing Key"
          value={settings.signingKey}
          onChange={(e) => onUpdateSettings('signingKey',e.target.value)}
          multiline
          maxRows={5}
          minRows={5}
          fullWidth
        />
        <TextField
          id="payload"
          label="Payload"
          value={settings.payload}
          onChange={(e) => onUpdateSettings('payload',e.target.value)}
          fullWidth
          multiline
          maxRows={5}
          minRows={5}
        />
      </Stack>

      <Button
        variant={'contained'}
        onClick={onGenerate}
        disabled={!allowGenerate}
      >
        Generate
      </Button>

      <TextField
        id="jwt"
        label="Token"
        multiline
        disabled
        maxRows={5}
        minRows={5}
        fullWidth
        value={jwt}
        slotProps={{
          input: {
            endAdornment: <InputAdornment position="end">
              <IconButton disabled={!jwt} onClick={onCopy}>
                <ContentCopyIcon />
              </IconButton>
            </InputAdornment>,
          },
        }}
      />

    </Stack>
  )
}

export default JWTEncode