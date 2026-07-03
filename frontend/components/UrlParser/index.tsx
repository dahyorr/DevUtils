"use client"
import { Box, InputAdornment, TextField, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
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

const UrlParser = ({ }: Props) => {
  const [urlValid, setUrlValid] = useState<boolean>(false)
  const [url, setUrl] = useState<string>("https://devutils.dayo.dev/parsers/url-parser?query=hello-world")
  const [parsedURL, setParsedURL] = useState<ParsedURL>(defaultValue)

  const theme = useTheme()
  const themeMode = theme.palette.mode

  const onUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value)
  }

  const validateUrl = (url: string) => {
    try {
      const urlObj = new URL(url)
      return urlObj
    } catch (error) {
      return false
    }
  }

  useEffect(() => {
    // check if url is valid
    const urlObj = validateUrl(url)
    if (urlObj) {
      setUrlValid(true)
      // split url into parts
      const protocol = urlObj.protocol
      const host = urlObj.host
      const port = urlObj.port
      const query = urlObj.search
      const path = urlObj.pathname
      const queryObject = Object.fromEntries(urlObj.searchParams)
      setParsedURL({
        protocol,
        host,
        port,
        query,
        path,
        queryObject
      })
    }

    else {
      setUrlValid(false)
      setParsedURL(defaultValue)
    }
  }, [url])

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