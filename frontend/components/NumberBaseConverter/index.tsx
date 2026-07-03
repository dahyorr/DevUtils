"use client"
import React, { useEffect, useState } from 'react'
import PageHeader from '../PageHeader'
import { IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import { useSnackbar } from 'notistack'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
// import { invoke } from '@tauri-apps/api/core';

type Props = {}

type BaseValue = {
  decimal: string
  binary: string
  octal: string
  hexadecimal: string
}

const NumberBaseConverter = (props: Props) => {
  const [error, setError] = useState<string | undefined>()
  const [baseValue, setBaseValue] = useState<BaseValue>({
    decimal: '',
    binary: '',
    octal: '',
    hexadecimal: ''
  })
  const { enqueueSnackbar } = useSnackbar()

  const onInputUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    let err = false
    setError(undefined)
    let decimalValue = 0
    // validate value
    const trimmedValue = value.trim()
    if (!trimmedValue) {
      setBaseValue({
        decimal: '',
        binary: '',
        octal: '',
        hexadecimal: ''
      })
      return
    }
    if (name === 'decimal') {
      if (!/^\d+$/.test(trimmedValue)) {
        err = true
        setError('Invalid Decimal Number')
      }
      else {
        decimalValue = parseInt(trimmedValue)
      }
    }
    else if (name === 'binary') {
      if (!/^[01]+$/.test(trimmedValue)) {
        err = true
        setError('Invalid Binary Number')
      }
      else {
        decimalValue = parseInt(trimmedValue, 2)
      }
    }
    else if (name === 'octal') {
      if (!/^[0-7]+$/.test(trimmedValue)) {
        err = true
        setError('Invalid Octal Number')
      }
      else {
        decimalValue = parseInt(trimmedValue, 8)
      }
    }
    else if (name === 'hexadecimal') {
      if (!/^[0-9A-Fa-f]+$/.test(trimmedValue)) {
        err = true
        setError('Invalid Hexadecimal Number');
      }
      else {
        decimalValue = parseInt(trimmedValue, 16)
      }
    }

    console.log({
      decimal: decimalValue.toString(),
      binary: decimalValue.toString(2),
      octal: decimalValue.toString(8),
      hexadecimal: decimalValue.toString(16)
    })
    if (err) {
      setBaseValue({
        ...baseValue,
        [name]: trimmedValue
      })
    }
    else {
      setBaseValue({
        decimal: decimalValue.toString(),
        binary: decimalValue.toString(2),
        octal: decimalValue.toString(8),
        hexadecimal: decimalValue.toString(16)
      })
    }
  }

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: 'error' })
    }
  }, [error])

  const onCopy = (value: string) => {
    if (!value) return
    navigator.clipboard.writeText(value)
    enqueueSnackbar('Copied to clipboard', { variant: 'success' })
  }

  return (
    <>
      <PageHeader>
        <Typography variant="h4" >Number Base Converter</Typography>
      </PageHeader>

      <Stack spacing={2} alignItems={'center'}>
        <TextField
          id="hexadecimal"
          name="hexadecimal"
          label="Hexadecimal"
          fullWidth
          value={baseValue.hexadecimal}
          onChange={onInputUpdate}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="copy to clipboard"
                    onClick={() => onCopy(baseValue.hexadecimal)}
                    edge="end"
                  >
                    <ContentCopyIcon />
                  </IconButton>
                </InputAdornment>
              )
            }
          }}
        // variant="outlined"
        />
        <TextField
          id="decimal"
          name="decimal"
          label="Decimal"
          fullWidth
          value={baseValue.decimal}
          onChange={onInputUpdate}
          // variant="outlined"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="copy to clipboard"
                    onClick={() => onCopy(baseValue.decimal)}
                    edge="end"
                  >
                    <ContentCopyIcon />
                  </IconButton>
                </InputAdornment>
              )
            }
          }}
        />
        <TextField
          id="octal"
          name="octal"
          label="Octal"
          fullWidth
          value={baseValue.octal}
          onChange={onInputUpdate}
          // variant="outlined"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="copy to clipboard"
                    onClick={() => onCopy(baseValue.octal)}
                    edge="end"
                  >
                    <ContentCopyIcon />
                  </IconButton>
                </InputAdornment>
              )
            }
          }}
        />
        <TextField
          id="binary"
          name="binary"
          label="Binary"
          fullWidth
          value={baseValue.binary}
          onChange={onInputUpdate}
          // variant="outlined"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="copy to clipboard"
                    onClick={() => onCopy(baseValue.binary)}
                    edge="end"
                  >
                    <ContentCopyIcon />
                  </IconButton>
                </InputAdornment>
              )
            }
          }}
        />
      </Stack>
    </>
  )
}

export default NumberBaseConverter