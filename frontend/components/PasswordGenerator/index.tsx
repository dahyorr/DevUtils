"use client"
import { Button, IconButton, InputAdornment, Stack, Tab, Tabs, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import PageHeader from '../PageHeader'
import { useSnackbar } from 'notistack'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PasswordGeneratorSettings, { PasswordGeneratorSettingsType } from './PasswordGeneratorSettings'

type Props = {}


const PasswordGenerator = (props: Props) => {
  const [settings, setSettings] = useState<PasswordGeneratorSettingsType>({
    length: 12,
    includeLowercase: true,
    includeUppercase: true,
    includeNumbers: true,
    includeSymbols: false,
    type: 'random'
  })
  const [password, setPassword] = useState('')
  const { enqueueSnackbar } = useSnackbar()

  const onTypeChange = (e: React.SyntheticEvent, value: 'random' | 'human' | 'number') => {
    setSettings({ ...settings, type: value })
  }

  const onGenerateRandom = () => {
    let charset = ''
    if (settings.includeLowercase) {
      charset += 'abcdefghijklmnopqrstuvwxyz'
    }
    if (settings.includeUppercase) {
      charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    }
    if (settings.includeNumbers) {
      charset += '0123456789'
    }
    if (settings.includeSymbols) {
      charset += '!@#$%^&*()_+-=[]{}|;:,.<>?'
    }

    let password = ''
    for (let i = 0; i < settings.length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    setPassword(password)
  }

  const onGenerateHuman = () => {

  }

  const onCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    enqueueSnackbar('Copied to clipboard', { variant: 'success' })
  }

  const onGeneratePassword = () => {
    switch (settings.type) {
      case 'random':
        onGenerateRandom()
        break
      case 'human':
        break
      case 'number':
        break
    }
  }

  return (
    <>
      <PageHeader>
        <Typography variant="h4" >Password Generator</Typography>
      </PageHeader>

      <Stack spacing={4} alignItems={'center'}>

        <Tabs value={settings.type} onChange={onTypeChange} aria-label="basic tabs example">
          <Tab label="Random" defaultChecked value="random" />
          {/* <Tab label="I'm Human" value={'human'} /> */}
          {/* <Tab label="Number" value={'number'} /> */}
        </Tabs>

        <TextField
          // label="text"
          type="string"
          value={password}
          fullWidth
          slotProps={{
            input: {
              inputProps:{
                style: { textAlign: 'center'}
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="copy to clipboard"
                    onClick={() => onCopy(password)}
                    edge="end"
                  >
                    <ContentCopyIcon />
                  </IconButton>
                </InputAdornment>
              )
            }
          }}
        />

        <PasswordGeneratorSettings
          settings={settings}
          onSettingsChange={setSettings}
        />

        <Button
          onClick={onGeneratePassword}
          variant="contained"
        >Generate Password</Button>
      </Stack>
    </>
  )
}

export default PasswordGenerator