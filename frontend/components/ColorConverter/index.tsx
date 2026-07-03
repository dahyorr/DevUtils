"use client"
import { Box, Button, IconButton, InputAdornment, Paper, Stack, TextField, Typography, TypographyProps } from '@mui/material'
import React, { useState } from 'react'
import PageHeader from '../PageHeader'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useSnackbar } from 'notistack';
import chroma from 'chroma-js';

type Props = {}

// const colorFormats = [
//   'hex',
//   "rgba",
//   "hsl",
// ]
const colorTitleProps: TypographyProps = {
  variant: "h6",
  fontSize: "0.75rem"
}
const colorValueProps: TypographyProps = {
  fontSize: "0.85rem"
}

const ColorConverter = (props: Props) => {

  const [inputColor, setInputColor] = useState<string>('')
  const [colorObj, setColorObj] = useState<{
    hex: string,
    rgba: string,
    hsl: string
  } | undefined>()
  const { enqueueSnackbar } = useSnackbar()

  const generateColorValues = () => {
    try {
      const color = chroma(inputColor)
      const obj = {
        hsl: color.css('hsl'),
        hex: color.hex(),
        rgba: color.css(),
      }
      setColorObj(obj)
    }
    catch (e) {
      enqueueSnackbar('Invalid Color', { variant: 'error' })
      setColorObj(undefined)
    }

  }

  const onCopyColor = (color: string) => {
    navigator.clipboard.writeText(color)
    enqueueSnackbar('Copied to clipboard', { variant: 'success' })
  }

  return (
    <>
      <PageHeader>
        <Typography variant="h4" >Color Converter</Typography>
      </PageHeader>

      <Stack alignItems={'center'} maxWidth={'md'} mx={'auto'} spacing="2rem">
        <TextField
          id="color"
          label="Color"
          value={inputColor}
          onChange={(e) => setInputColor(e.target.value)}
          placeholder='Enter color in hex, rgba, hsl'
          fullWidth
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">
                <Button variant='contained' onClick={generateColorValues}>
                  <ArrowRightAltIcon />
                </Button>
              </InputAdornment>,
            },
          }}
        />

        {colorObj && (<Paper sx={{
          maxWidth: "28rem",
          width: "100%",
          borderRadius: "0.5rem",
          backgroundColor: 'transparent'
        }} >
          <Stack direction={'row'} height={'9rem'} maxHeight={'9rem'} width={"100%"} overflow={'hidden'}>
            <Box
              id="color-preview"
              minWidth={"9rem"}
              width={'9rem'}
              height={"100%"}
              bgcolor={colorObj.hex}
              position={'relative'}
              zIndex={'auto'}
              sx={{
                "&::before": {
                  content: '""',
                  height: "100%",
                  width: "100%",
                  position: "absolute",
                  bgcolor: 'white',
                  zIndex: -1,
                  inset: 0,
                  backgroundPosition: "0px 0px, 0px 10px, 10px -10px, -10px 0px",
                  backgroundSize: "20px 20px",
                  backgroundImage: "linear-gradient(45deg, rgb(238, 238, 238) 25%, transparent 25%), linear-gradient(-45deg, rgb(238, 238, 238) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgb(238, 238, 238) 75%), linear-gradient(-45deg, transparent 75%, rgb(238, 238, 238) 75%) !important"
                }
              }} />

            <Stack px={'0.5rem'} py="0.25rem" spacing={0} overflow={'auto'}>
              <Box>
                <Typography {...colorTitleProps}>HEX</Typography>
                <Stack direction={'row'} alignItems={'center'} spacing="1rem">
                  <Typography {...colorValueProps}> {colorObj?.hex}</Typography>
                  <IconButton size="small" onClick={() => onCopyColor(colorObj?.hex)}>
                    <ContentCopyIcon fontSize='inherit' />
                  </IconButton>
                </Stack>
              </Box>
              <Box>
                <Typography {...colorTitleProps}>HSL</Typography>
                <Stack direction={'row'} alignItems={'center'} spacing="1rem">
                  <Typography {...colorValueProps}> {colorObj?.hsl}</Typography>
                  <IconButton size="small" onClick={() => onCopyColor(colorObj?.hsl)}>
                    <ContentCopyIcon fontSize='inherit' />
                  </IconButton>
                </Stack>
              </Box>

              <Box>
                <Typography {...colorTitleProps}>RGBA</Typography>
                <Stack direction={'row'} alignItems={'center'} spacing="1rem">
                  <Typography {...colorValueProps}>{colorObj?.rgba}</Typography>
                  <IconButton size="small" onClick={() => onCopyColor(colorObj?.rgba)}>
                    <ContentCopyIcon fontSize='inherit' />
                  </IconButton>
                </Stack>
              </Box>

            </Stack>

          </Stack>
        </Paper>)}
      </Stack>
    </>
  )
}

export default ColorConverter