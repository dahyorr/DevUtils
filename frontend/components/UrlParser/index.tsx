"use client"
import { Box, InputAdornment, TextField, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import PageHeader from '../PageHeader'
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import dynamic from 'next/dynamic'

type Props = {}

type ParsedURL = {
  protocol: string
  host: string
  port: string
  query: string
  queryObject: { [key: string]: string }
  path: string
}

const defaultValue: ParsedURL = {
  protocol: "",
  host: "",
  port: "",
  query: "",
  queryObject: {},
  path: ''
}

const ReactJsonView = dynamic(() => import('@microlink/react-json-view'), { ssr: false })

const validateUrl = (url: string) => {
  try {
    const urlObj = new URL(url)
    return urlObj
  } catch (error) {
    return false
  }
}

const parseUrl = (url: string): { urlValid: boolean; parsedURL: ParsedURL } => {
  const urlObj = validateUrl(url)
  if (!urlObj) {
    return { urlValid: false, parsedURL: defaultValue }
  }
  return {
    urlValid: true,
    parsedURL: {
      protocol: urlObj.protocol,
      host: urlObj.host,
      port: urlObj.port,
      query: urlObj.search,
      path: urlObj.pathname,
      queryObject: Object.fromEntries(urlObj.searchParams)
    }
  }
}

const initialUrl = "https://devutils.dayo.dev/parsers/url-parser?query=hello-world"

const UrlParser = ({ }: Props) => {
  const [url, setUrl] = useState<string>(initialUrl)
  const [{ urlValid, parsedURL }, setParsed] = useState<{ urlValid: boolean; parsedURL: ParsedURL }>(() => parseUrl(initialUrl))

  const theme = useTheme()
  const themeMode = theme.palette.mode

  const onUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value
    setUrl(newUrl)
    setParsed(parseUrl(newUrl))
  }

  return (
    <Box >
      <PageHeader>
        <Typography variant="h4" >URL Parser</Typography>
      </PageHeader>

      <Box display="flex" gap="2rem" flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
        <TextField
          label="URL"
          variant="outlined"
          fullWidth
          value={url}
          onChange={onUrlChange}
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">
                {urlValid ? <CheckIcon color='success' /> : <CloseIcon color="error" />}
              </InputAdornment>,
            },
          }}
        />

        <TextField
          label="Protocol"
          variant="outlined"
          fullWidth
          value={parsedURL.protocol}
          disabled
        />

        <TextField
          label="Host"
          variant="outlined"
          fullWidth
          value={parsedURL.host}
          disabled
        />

        {parsedURL.port && (<TextField
          label="Port"
          variant="outlined"
          fullWidth
          value={parsedURL.port}
          disabled
        />)}

        <TextField
          label="Path"
          variant="outlined"
          fullWidth
          value={parsedURL.path}
          disabled
        />

        <TextField
          label="Query"
          variant="outlined"
          fullWidth
          value={parsedURL.query}
          disabled

        />

        {/* <TextField
          label="Query Object"
          variant="outlined"
          fullWidth
          value={JSON.stringify(parsedURL.queryObject)}
          disabled
        /> */}

        <Box sx={{
          width: '100%',
          height: '100%',
          border: "1px solid",
          borderRadius: "5px",
          px: '1rem',
          py: '0.5rem',
        }}>
          <ReactJsonView
            name={false}
            theme={themeMode === 'light' ? "rjv-default" : "ocean"} src={parsedURL.queryObject}
            collapsed={false}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default UrlParser